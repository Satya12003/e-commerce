import React from "react"
import {useEffect} from 'react'
import { NavLink } from "react-router-dom"
import {useForm} from 'react-hook-form'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
function Login(){
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
  const onFormSubmit = async(userobj) => {
      console.log(userobj);
   

      await axios.post("http://localhost:3001/login", userobj,{
          headers:{'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
        }
      }
       ).then((response)=>{
           console.log(response);
      }).catch((err)=> console.log(err))
    
  }
    return(
        <div>
             <form onSubmit={handleSubmit(onFormSubmit)}>

<h3>Log in</h3>

<div className="form-group mb-3">
    <label>Username</label>
    <input type="text" className="form-control" placeholder="Enter username" {...register('email',{required:true})}/>
</div>

<div className="form-group mb-3">
    <label>Password</label>
    <input type="password" className="form-control" placeholder="Enter password" {...register('password',{required:true})}/>
</div>

<div className="form-group mb-3">
   
</div>




<div className="form-group mb-3">
    <div className="custom-control custom-checkbox">
        <input type="checkbox" className="custom-control-input me-2" id="customCheck1" />
        <label className="custom-control-label ml-1" htmlFor="customCheck1">Remember me</label>
    </div>
</div>

<button type="submit" className="btn btn-dark btn-lg btn-block w-100">Sign in</button>
<p className="forgot-password text-right">
    Aldready an User?? <NavLink to={'/sign-up'}>SignUp</NavLink>
</p>
</form>
        </div>
    )
}

export default Login