import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Login = (props) => {
    const[credentials,setCredentials]=useState({email:"",password:""})
    const navigate = useNavigate();
    const  handleSubmit=async (e)=>{
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password}),
          });
          const json = await response.json()
          if (json.success){
            console.log(json);console.log("navigate to home page is clicked")
            localStorage.setItem('token',json.authToken);
            navigate("/home");
            props.showAlert("Logged In Successfully","success")
            //redirect
          }
          else{
            props.showAlert("Invalid Details","danger")
          }
          
    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
      }
      return (
    <>
    <form  onSubmit={handleSubmit}>
      <h3>Login </h3>
    <div className="form-group">
      <label htmlFor="email">Email address</label>
      <input type="email" className="form-control" id="email" value={credentials.email} name="email" aria-describedby="emailHelp" onChange={onChange} placeholder="Enter email"/>
      
    </div>
    <div className="form-group">
      <label htmlFor="password">Password</label>
      <input type="password"  className="form-control" id="password" value={credentials.password} name="password" onChange={onChange} placeholder="Password"/>
    </div>
    
    <button type="submit"  className="btn btn-primary mt-3" >Submit</button>
  </form>
  </>
  )
}

export default Login