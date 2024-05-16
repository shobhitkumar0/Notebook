const express =require('express')
const router =express.Router()
const Notes = require('../models/Notes');
const fetchUser= require('../middleware/fetchUser')
const { body, validationResult } = require('express-validator');


//Route 1: Get All Notes using GET:"/api/notes/getuser". Login Required
router.get('/fetchallnotes',fetchUser, async(req,res)=>{
    const notes=await Notes.find({user:req.user.id});
    res.json(notes)
})
//Route 2: Add A new  Notes using POST:"/api/notes/addnote". Login Required
router.post('/addnote',fetchUser, [
    // Validation middleware for request body fields
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid Description').isLength({ min: 5 }),
], async(req,res)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // If validation errors exist, return a 400 Bad Request response with error details
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title: req.body.title,
            description: req.body.description,
            tag:req.body.tag,
            user:req.user.id,
            date: new Date()
          });
          
          // Save the note document to the database
          const savedNote=await note.save()
          res.json(savedNote)
            
    } catch (error) {
        // Handle any unexpected errors (e.g., database connection issues)
        console.error(error.message);
        res.status(500).send( 'Internal Server Error');
    }
})
//Route 3: Update A new  Notes using POST:"/api/notes/addnote". Login Required

router.put('/update/:id',fetchUser,async(req,res)=>{
    title=req.body.title,
    description=req.body.description,
    tag=req.body.tag;
    try{
    //create a newNote object
    const newNote={};
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};

    let note=await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not found")}
    
    if(note.user.toString()!==req.user.id)
    {return res.status(401).send("Not Allowed")};

    note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note});
    }catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}) 
module.exports=router