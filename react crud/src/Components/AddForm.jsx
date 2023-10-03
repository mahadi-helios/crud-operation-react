import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useForm from "./UseForm";
import { addContact, getListContactId, editContact } from "../LocalStroge/SaveData";
import axios from "axios";
import { useLocation } from 'react-router-dom';

export default function AddForm() {

  const navigate = useNavigate();
  const { id } = useParams();
  const [aleart, setAleart] = useState();
  const location = useLocation();
  const contactData = location.state;

  const { inputValues, handleInputChange, resetForm, setForm } = useForm({
    name: "",
    number: "",
  });

  useEffect(() => {
    if (aleart) {
      const timeoutId = setTimeout(() => {
        setAleart(null);
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
    if (contactData) {
           setForm({
             name: contactData.name,
             number: formatPhoneNumberForDisplay(contactData.phone_number),
           });
         } 
  }, [id,aleart,contactData]);
  
  
  const formatPhoneNumberForDisplay = (phoneNumber) => {
    // Convert "+8801xxxxxxxxx" to "01xxxxxxxxx" for display
    return phoneNumber.replace("+880", "0");
  };

  const formatPhoneNumberForStorage = (phoneNumber) => {
    // Convert "017xxxxxxxxx" to "+8801xxxxxxxx" for storage
    return phoneNumber.replace(/^0/, "+880");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Perform the phone number format validation here
    const bdPhoneNumber = /^01\d{9}$/.test(inputValues.number);

    setAleart(null);

    try {
      if (bdPhoneNumber) {
        // Format the phone number for storage
        const phoneNumberForStorage = formatPhoneNumberForStorage(inputValues.number);
        if (id) {
          const updateRespone= await axios.put(`http://127.0.0.1:8000/update/${id}/`, {
            name: inputValues.name,
            phone_number: phoneNumberForStorage,
          })
          .then(function (response) {
            console.log(()=>response.data);

          })
          .catch(function (error) {
            console.log(error);
          });
          console.log(updateRespone);
          editContact(id, { ...inputValues, number: phoneNumberForStorage });
          
      } else {
        const createRespone = await axios.post('http://127.0.0.1:8000/create/', {
          name: inputValues.name,
          phone_number: phoneNumberForStorage,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
          console.log(createRespone);
          addContact({ ...inputValues, number: phoneNumberForStorage });
        } 
        // Show an alert
        setAleart({ type: "success", message: id ? "Your data updated successfully!" : "Your data created successfully!" });

        resetForm(); // after submite a form then reset form
      } else {
        aleart("Please enter a valid 11-digit Bangladesh phone number starting with '01'.");
      }
    } catch (error) {
        console.log(error);
        setAleart({ type: "error", message: "Please enter a valid 11-digit Bangladesh phone number starting with '01'." });
    }
  };

  

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>User {id ? "Edit" : "Create"} Information</h1>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="name"
            value={inputValues.name}
            onChange={handleInputChange}
            id="username"
            required
          />
        </div>
        <div>
          <label htmlFor="usernumber">User Number (BD Only - 11 digits):</label>
          <input
            type="text"
            name="number"
            value={formatPhoneNumberForDisplay(inputValues.number)}
            onChange={handleInputChange}
            id="usernumber"
            required
          />
        </div>
        {aleart && (
          <div className={`alert ${aleart.type}`}>
            {aleart.message}
          </div>
        )}
        <button className="button1" type="submit">
          Submit
        </button>
        <button className="btn" type="button" onClick={() => navigate("/contact-list")}>
          Contact List
        </button>
      </form>
    </>
  );
}







