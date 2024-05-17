// Import necessary modules and models
const express = require('express');
const fetchUser= require('../middleware/fetchUser')
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
var JWT=require('jsonwebtoken');
const JWT_SECRET ="sourya"
// Route handler for creating a new user
router.post('/createuser', [
    // Validation middleware for request body fields
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be at least five characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        // Validate request body against defined rules
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let success=false;
            // If validation errors exist, return a 400 Bad Request response with error details
            return res.status(400).json({success, errors: errors.array() });
        }

        // Check if a user with the same email already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            let success=false;
            return res.status(500).json({ success,errors: "Sorry, a user with this email exists" });
        }
        //generating a hash password
        const salt= await bcrypt.genSalt(10);
        const secPass= await bcrypt.hash(req.body.password, salt);
        // Create a new user using data from the request body
        user = await User.create({
            name: req.body.name,
            password: secPass,  
            email: req.body.email,
        });

        // Successfully created user, respond with the user id and with jwt token
        const data={
            user:{
                id:user.id
            }
        }
        const authToken=JWT.sign(data,JWT_SECRET);
        console.log(data);
        let success=true;
        res.json({success,authToken});
    } catch (error) {
        let success=false;
        // Handle any unexpected errors (e.g., database connection issues)
        console.error(error.message);
        res.status(500).send( success,'Internal Server Error');
    }
});

//Authenticate a user. :Post "/auth/auth/login".No Login required
// Define a route handler for POST requests to /login
router.post('/login', [
    // Validation middleware for request body fields
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must not be blank').exists(),
], async (req, res) => {
    // Get the validation result from the request object
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let success=false;
        // If validation errors exist, return a 400 Bad Request response with error details
        return res.status(400).json({success, errors: errors.array() });
    }
    // Destructure the email and password from the request body
    const email = req.body.email; const password = req.body.password;
    try {
        // Find the user with the given email in the database
        let user=await User.findOne({email});
        if(!user){
            let success=false;
            // If no user is found, return a 400 Bad Request response with an error message
            return res.status(400).json({success,errors:"Please try to login with correct credentials"})
        }
        // Compare the given password with the hashed password stored in the database
        const passwordCompare=await bcrypt.compare(password,user.password);
        if(!passwordCompare){let success=false;
            // If the passwords do not match, return a 400 Bad Request response with an error message
            return res.status(400).json({success,errors:"Please try to login with correct credentials"})
        }
        // Create a payload object with the user id
        const data={
            user:{
                id:user.id
            }
        }
        // Sign a JSON Web Token (JWT) with the payload and a secret key
        const authToken= JWT.sign(data,JWT_SECRET);
        // console.log(jwtData);
        let success= true;
        // Return a 200 OK response with the JWT as a JSON object
        res.json({success,authToken});
    } catch (error) {
        // If any other error occurs, log it to the console and return a 500 Internal Server Error response
        console.error(error.message);
        let success=false;
        res.status(500).send({ success,errors:'Internal Server Error'});
    }

})
// Route 3: Get logged in user Deatails using Post:"api/auth/getuser".Login Required
router.post('/getuser',fetchUser, async (req, res) => {
try {
    userId=req.user.id;
    const user =await User.findById(userId)
    res.send(user)
} catch (error) {
    console.error(error.message);
    let success=false;
    res.status(500).send({success,errors:'Internal Server Error'} );
    
}
});
// Export the router
module.exports = router;
