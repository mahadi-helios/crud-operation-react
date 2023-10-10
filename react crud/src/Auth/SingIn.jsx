import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";


export default function SingIn(){
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
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

  useEffect(() => {
    if (alert) {
      const timeoutId = setTimeout(() => {
        setAlert(null);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [alert]);

  const handleSubmit = async (e)=>{
      e.preventDefault();
      try {
          const response = await axios.post(`${apiBaseUrl}/singin/`,
            userAuth  
          )
          console.log('singIn Successfully', response.data);
          Cookies.set('AuthToken', response.data.token);
          navigate('/contact-form')
      } catch (error) {
          console.error('singIn Error :', error)
          setAlert({ type: "error", message: "Enter  your valid username and password" });
      }
  };
    return(
        <>
        <div className="singIn-div">
          {alert && (
            <div className={`alert ${alert.type}`}>
              {alert.message}
            </div>
          )}
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