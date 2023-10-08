import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SingIn(){
  const navigate = useNavigate();
  const [userAuth , setUserAuth]=useState({
      username : '',
      password:'',
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
          const response = await axios.post(`${apiBaseUrl}/singin/`,
            userAuth  
          )
          console.log('singIn Successfully', response.data);
          navigate('/contact-form')
      } catch (error) {
          console.error('singIn Error :', error)
      }
  };
    return(
        <>
        <div className="singIn-div">
          <form className="user-form" onSubmit={handleSubmit}>
            <h1 className="User-form-header">SingIn Your Account</h1>
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
            <button className="btn-auth" type="submit" >
              SingIn
            </button>
            <p className="singIn-p">You Don't Have An Account,<a  className="singIn-a" href="" onClick={()=> navigate('/singUp')} >SingUp</a></p>
          </form>
        </div>
        </>

    );
}