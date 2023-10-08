import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SingUp(){
    const navigate = useNavigate();
    const [userAuth , setUserAuth]=useState({
        username : '',
        password:'',
        confirmPassword : '',
    });

    const handleChange = (e) =>{
        const {name, value} =  e.target;
        setUserAuth({...userAuth, [name] : value});
    };

    // Define the API base URL from the environment variable
    const apiBaseUrl = import.meta.env.VITE_API_URL;

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const response = await axios.post(`${apiBaseUrl}/singup/`,
              userAuth  
            )
            console.log('singUp Successfully', response.data);
            navigate('/')
        } catch (error) {
            console.error('singUp Error :', error)
        }
    };

    return(
        <>
        <div className="singIn-div">
            <form className="user-form" onSubmit={handleSubmit}>
            <h1 className="User-form-header">SingUp Your Account</h1>
            <div >
                <input className="user-input"
                type="name"
                name="username"
                placeholder="username"
                value={userAuth.username}
                onChange={handleChange}
                id="username"
                required
                />
            </div>
            <div >
                <input className="user-input"
                type="password"
                name="password"
                placeholder="Password"
                value={userAuth.password}
                onChange={handleChange}
                id="password"
                required
                />
            </div>
            <div >
                <input className="user-input"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={userAuth.confirmPassword}
                onChange={handleChange}
                id="confirmpassword"
                required
                />
            </div>
            <button className="btn-auth" type="submit">
                SingUp
            </button>
            <p className="singIn-p">You Have Already An Account,<a  className="singIn-a" href=""onClick={()=> navigate('/')} >SingIn</a></p>
            </form>
        </div>
        </>

    );
}