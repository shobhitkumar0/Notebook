import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials,setCredentials]=useState({name:"",email:"",password:""})
  
  const navigate = useNavigate();
  const  handleSubmit=async (e)=>{
    e.preventDefault();
    const {name,email,password}=credentials;
    console.log(credentials);
    const response = await fetch('http://localhost:5000/api/auth/createuser', {
      
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify({name,email,password}),
      });
     
      const json = await response.json()
      console.log(json);
      if(json.success){
        
        localStorage.setItem('token',json.authtoken);
      
        navigate("/home");
        props.showAlert("Account Created Successfully","success")

      }
        else{
          props.showAlert("Invalid Credential","danger")
        }
        //redirect
      
}
const onChange=(e)=>{
  setCredentials({...credentials,[e.target.name]:e.target.value})
}
  return (
    <div className="container">
    <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="name">Name</label>
    <input type="name" className="form-control" id="name" name="name"  onChange={onChange}/>
  </div>    
  <div className="form-group">
    <label htmlFor="email">Email Address</label>
    <input type="email" className="form-control" id="email" name="email" onChange={onChange}/>
  </div>
  <div className="form-group">
    <label htmlFor="password" className='form-label'>Password</label>
    <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
  </div>
  <div className="form-group">
    <label htmlFor="cpassword" className='form-label'>Confirm Password</label>
    <input type="password" className="form-control" id="cpassword"  name="cpassword" onChange={onChange} minLength={5} required />
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
  )
}

export default Signup