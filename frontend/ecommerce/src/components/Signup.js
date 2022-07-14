import React from "react";
import {useForm} from 'react-hook-form'
import {NavLink} from 'react-router-dom'
import axios from 'axios';

function SignUp(){
    let {register,handleSubmit,formState:{errors}}=useForm()

    let onFormSubmit=async (userobj)=>{
    console.log(userobj);

    //Add a type from the form itself
    userobj['type']="buyer";

    await axios.post("http://localhost:3001/", userobj,{
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
            <form  onSubmit={handleSubmit(onFormSubmit)}>
                <h3>Register</h3>

                <div className="form-group mb-3">
                    <label className="fw-bold">Username</label>
                    <input type="text" className="form-control" placeholder="Name" {...register('name',{required:true})}/>
                    {errors.firstname && (<p className="text-danger">* Firstname is required</p>)}
                </div>

                <div className="form-group mb-3">
                    <label className="fw-bold">Enter your Email </label>
                    <input type="email" className="form-control" placeholder="Enter Email" {...register('email',{required:true})}/>
                    {errors.username && (<p className="text-danger">* Username is required</p>)}
                </div>

                <div className="form-group mb-3">
                    <label className="fw-bold">Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" {...register('password',{required:true})} />
                    {errors.password && (<p className="text-danger">* Password is required</p>)}
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block w-100">Register</button>
                <p className="forgot-password text-right">
                    Already registered <NavLink to={'/sign-in'}>log in?</NavLink>
                </p>
            </form>
        </div>

    )
}



export default SignUp