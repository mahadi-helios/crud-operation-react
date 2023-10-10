import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ContactList from "./ContactList";
import UserForm from "./UserForm";
import useForm from "../Components/UseForm";
import Cookies from "js-cookie";


export default function AddForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const contactData = location.state;
  const [alert, setAlert] = useState(null);
  const [contacts, setContacts] = useState([]); // Array to store the contact list
  const { inputValues, handleInputChange, resetForm, setForm } = useForm({
    name: "",
    number: "",
  });

  // Define the API base URL from the environment variable
  const apiBaseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (alert) {
      const timeoutId = setTimeout(() => {
        setAlert(null);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
    if (contactData) {
      setForm({ 
        name: contactData.name,
        number: formatPhoneNumberForDisplay(contactData.phone_number),
      });
    }
  }, [id, alert, contactData]);


  useEffect(() => {
    // Use the API base URL defined from the environment variable
    axios.get(`${apiBaseUrl}/list/`,{
      headers:{
        "Authorization" : `Token ${Cookies.get("AuthToken")}`
      }
    })
      .then(function (response) {
        setContacts(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
      })
  }, [apiBaseUrl]);


  const formatPhoneNumberForDisplay = (phoneNumber) => {
    return phoneNumber.replace("+880", "0");
  };

  const formatPhoneNumberForStorage = (phoneNumber) => {
    return phoneNumber.replace(/^0/, "+880");
  };


  const removeContact = (id) => {

    axios.delete(`${apiBaseUrl}/delete/${id}/`,{
      headers:{
        "Authorization" : `Token ${Cookies.get("AuthToken")}`
      }
    })
    .then(function (response) {
      console.log(response.data);
      setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
    })
    setAlert({ type: "error", message: "Data delete successfully !" });

    };


  const handleLogout = async () => {

    try {
      const response = await axios.post(`${apiBaseUrl}/logout/`,null, {
        headers:{
          "Authorization" : `Token ${Cookies.get("AuthToken")}`
        }
      })
      console.log('logout Successfully', response.data);
      Cookies.remove('AuthToken', response.data.token);
      navigate('/')
  } catch (error) {
      console.error('logout Error :', error)
  }
  };

  const handleFormSubmit = async (event) => {

    event.preventDefault();
    const bdPhoneNumber = /^01\d{9}$/.test(inputValues.number);
    setAlert(null);

    try {

      if (bdPhoneNumber) {
        const phoneNumberForStorage = formatPhoneNumberForStorage(inputValues.number);
        if (id) {
          const updateResponse = await axios.put(`${apiBaseUrl}/update/${id}/`,{
            name: inputValues.name,
            phone_number: phoneNumberForStorage,
          },{
            headers:{
              "Authorization" : `Token ${Cookies.get("AuthToken")}`
            }
          })
          .then(function (response) {
            console.log(response.data);
            
            })
          .catch(function (error) {
            console.log(error);
            })
          .finally(function () {
            })  
            // console.log(updateResponse);
        } else {
          const createResponse = await axios.post(`${apiBaseUrl}/create/`, {
            name: inputValues.name,
            phone_number: phoneNumberForStorage,
          },{
            headers:{
              "Authorization" : `Token ${Cookies.get("AuthToken")}`
            }
          })
          .then(function (response) {
            console.log(response.data);
            
            })
          .catch(function (error) {
            console.log(error);
            })
          .finally(function () {
            })  
        //   console.log(createResponse);
        }
        navigate('/contact-list')
        resetForm();
        setAlert({ type: "success", message: id ? "Your data updated successfully!" : "Your data created successfully!" });
        
        // create and update show data in contact list
        const updatedContactList = await axios.get(`${apiBaseUrl}/list/`,{
          headers:{
            "Authorization" : `Token ${Cookies.get("AuthToken")}`
          }
        });
        setContacts(updatedContactList.data);
        navigate('/contact-list')
   
      } else {
        setAlert({ type: "error", message: "Please enter a valid 11-digit Bangladesh phone number starting with '01'." });
      }
    } catch (error) {
      console.error(error);
      setAlert({ type: "error", message: "An error occurred while saving the data." });
    }
  };

  return (
    <>
      <UserForm
        inputValues={inputValues}
        handleFormSubmit={handleFormSubmit}
        handleInputChange={handleInputChange}
        resetForm={resetForm}
        alert={alert}
      />

      <br />

      <ContactList
        contacts={contacts}
        navigate={navigate}
        removeContact={removeContact}
        alert={alert}
      />
      <div className="button-div">
          <button type="submit"  className="logout" onClick={()=> handleLogout()} >Logout</button> 
      </div>
    </>
  );
}
