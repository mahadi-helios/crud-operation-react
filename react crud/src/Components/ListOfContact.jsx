import  { useEffect, useState } from "react";
//import { getListContact, deleteContact } from "../LocalStroge/SaveData";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function ListOfContact (){

  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();
  const [aleart, setAlert] = useState();


  // Fetch the list of contacts when the component mounts
  useEffect(() => {
    if (aleart) {
      const timeoutId = setTimeout(() => {
        setAlert(null);
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
      //const axios = require('axios'); // legacy way
      // Make a request for a user with a given ID
      axios.get('http://127.0.0.1:8000/list/')
      .then(function (response) {
        // handle success
        console.log(response.data);
        setContacts(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      })
    
  }, [aleart]);

  const removeContact = (id) => {
      
      //const axios = require('axios'); // legacy way
      // Make a request for a user with a given ID
      axios.delete(`http://127.0.0.1:8000/delete/${id}/`)
      .then(function (response) {
        // handle success
        console.log(response.data);
        setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      })
      setAlert({ type: "error", message: "Data delete successfully !" });
  };

  return (
    <>
      <h1>ContactList</h1>
      <div className="aleart">
      {aleart && (
          <div className={`alert ${aleart.type}`}>
            {aleart.message}
          </div>
        )}
      </div>
      <button className="btn" onClick={() => navigate(`/`)}>Back</button>
      {contacts.length > 0 ? (
        <div className="posts-div">
          {contacts.map((contact, id) => (
            <div className="post-data" key={id}>
              <h4 className="name">Name: {contact.name}</h4>
              <p className="phone-number">Number: {contact.phone_number}</p>
              <button className="update-btn" onClick={() => navigate(`/edit-user/${contact.id}`)}>Update</button>
              <button className="delete-btn" onClick={() => removeContact(contact.id)}>Delete</button> 
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center' }}>No Contact Here</p>
      )}
    </>
  );
}