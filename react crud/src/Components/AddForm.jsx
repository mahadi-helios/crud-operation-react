


///''''''''''''''''''''''''''''''''''one components use form'''''''''''''''''''''''''''''''
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import useForm from "./UseForm";
// import axios from "axios";
// import { useLocation } from 'react-router-dom';

// export default function AddForm() {

//   const navigate = useNavigate();
//   const { id } = useParams();
//   const location = useLocation();
//   const contactData = location.state;
//   const [alert, setAlert] = useState(null);
//   const [contacts, setContacts] = useState([]); // Array to store the contact list
//   const { inputValues, handleInputChange, resetForm, setForm } = useForm({
//     name: "",
//     number: "",
//   });


//   useEffect(() => {
//     if (alert) {
//       const timeoutId = setTimeout(() => {
//         setAlert(null);
//       }, 1000);
//       return () => clearTimeout(timeoutId);
//     }
//     if (contactData) {
//       setForm({ 
//         name: contactData.name,
//         number: formatPhoneNumberForDisplay(contactData.phone_number),
//       });
//     }
//   }, [id, alert, contactData]);


//   useEffect(() => {
//     axios.get('http://127.0.0.1:8000/list/') // Fetch the contact list when the component mounts
//       .then(function (response) {
//         setContacts(response.data);
//       })
//       .catch(function (error) {
//         console.log(error);
//       })
//       .finally(function () {
//       })
//   }, []);


//   const formatPhoneNumberForDisplay = (phoneNumber) => {
//     return phoneNumber.replace("+880", "0");
//   };

//   const formatPhoneNumberForStorage = (phoneNumber) => {
//     return phoneNumber.replace(/^0/, "+880");
//   };


//   const removeContact = (id) => {

//     axios.delete(`http://127.0.0.1:8000/delete/${id}/`)
//     .then(function (response) {
//       console.log(response.data);
//       setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
//     })
//     .catch(function (error) {
//       console.log(error);
//     })
//     .finally(function () {
//     })
//     setAlert({ type: "error", message: "Data delete successfully !" });

//     };

//   const handleFormSubmit = async (event) => {

//     event.preventDefault();
//     const bdPhoneNumber = /^01\d{9}$/.test(inputValues.number);
//     setAlert(null);

//     try {

//       if (bdPhoneNumber) {
//         const phoneNumberForStorage = formatPhoneNumberForStorage(inputValues.number);
//         if (id) {
//           const updateResponse = await axios.put(`http://127.0.0.1:8000/update/${id}/`, {
//             name: inputValues.name,
//             phone_number: phoneNumberForStorage,
//           })
//           .then(function (response) {
//             console.log(response.data);
            
//             })
//           .catch(function (error) {
//             console.log(error);
//             })
//           .finally(function () {
//             })  
//             // console.log(updateResponse);
//         } else {
//           const createResponse = await axios.post('http://127.0.0.1:8000/create/', {
//             name: inputValues.name,
//             phone_number: phoneNumberForStorage,
//           })
//           .then(function (response) {
//             console.log(response.data);
            
//             })
//           .catch(function (error) {
//             console.log(error);
//             })
//           .finally(function () {
//             })  
//         //   console.log(createResponse);
//         }
//         navigate('/')
//         resetForm();
//         setAlert({ type: "success", message: id ? "Your data updated successfully!" : "Your data created successfully!" });
        
//         // create and update show data in contact list
//         const updatedContactList = await axios.get('http://127.0.0.1:8000/list/');
//         setContacts(updatedContactList.data);
//         navigate('/')

//       } else {
//         setAlert({ type: "error", message: "Please enter a valid 11-digit Bangladesh phone number starting with '01'." });
//       }
//     } catch (error) {
//       console.error(error);
//       setAlert({ type: "error", message: "An error occurred while saving the data." });
//     }
//   };

//   return (
//     <>
//     <form onSubmit={handleFormSubmit}>
//       <h1>User {id ? "Edit" : "Create"} Information</h1>
//         <div>
//           <label htmlFor="username">Username:</label> 
//           <input
//             type="text"
//             name="name"
//             value={inputValues.name}
//             onChange={handleInputChange}
//             id="username"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="usernumber">User Number (BD Only - 11 digits):</label> 
//           <input
//             type="text"
//             name="number"
//             value={formatPhoneNumberForDisplay(inputValues.number)}
//             onChange={handleInputChange}
//             id="usernumber"
//             required
//           />
//         </div>
//         {alert && (
//           <div className={`alert ${alert.type} danger ,success `}>
//             {alert.message}
//           </div>
//         )}
//         <button className="button1" type="submit">
//           Submit
//         </button>
//         <button  className="btn" onClick={() => resetForm()}>
//             Clear
//         </button>
//     </form>

//     <br/>     
//       <h1>Contact List</h1>
//       {contacts.length > 0 ? (
//         <div className="posts-div">
//           {contacts.map((contact) => (
//             <div className="post-data" key={contact.id}>
//               <h4 className="name">Name: {contact.name}</h4>
//               <p className="phone-number">Number: {contact.phone_number}</p>
//               <button className="update-btn" onClick={() => navigate(`/edit-user/${contact.id}`, {state: contact})}>
//                 Update
//               </button>
//               <button className="delete-btn" onClick={()=> removeContact(contact.id) }>
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="aleart">No Contact Here</p>
//       )}
//     </>
//   );
// }









































































/// ''''''''''''''diffrent page show code '''''''''''''''''''''''''''''''''''''''''''''''''''

// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import useForm from "./UseForm";
// import { addContact, getListContactId, editContact } from "../LocalStroge/SaveData";
// import axios from "axios";
// import { useLocation } from 'react-router-dom';

// export default function AddForm() {

//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [aleart, setAleart] = useState();
//   const location = useLocation();
//   const contactData = location.state;

//   const { inputValues, handleInputChange, resetForm, setForm } = useForm({
//     name: "",
//     number: "",
//   });

//   useEffect(() => {
//     if (aleart) {
//       const timeoutId = setTimeout(() => {
//         setAleart(null);
//       }, 3000);
//       return () => clearTimeout(timeoutId);
//     }
//     if (contactData) {
//            setForm({
//              name: contactData.name,
//              number: formatPhoneNumberForDisplay(contactData.phone_number),
//            });
//          } 
//   }, [id,aleart,contactData]);
  
  
//   const formatPhoneNumberForDisplay = (phoneNumber) => {
//     // Convert "+8801xxxxxxxxx" to "01xxxxxxxxx" for display
//     return phoneNumber.replace("+880", "0");
//   };

//   const formatPhoneNumberForStorage = (phoneNumber) => {
//     // Convert "017xxxxxxxxx" to "+8801xxxxxxxx" for storage
//     return phoneNumber.replace(/^0/, "+880");
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     // Perform the phone number format validation here
//     const bdPhoneNumber = /^01\d{9}$/.test(inputValues.number);

//     setAleart(null);

//     try {
//       if (bdPhoneNumber) {
//         // Format the phone number for storage
//         const phoneNumberForStorage = formatPhoneNumberForStorage(inputValues.number);
//         if (id) {
//           const updateRespone= await axios.put(`http://127.0.0.1:8000/update/${id}/`, {
//             name: inputValues.name,
//             phone_number: phoneNumberForStorage,
//           })
//           .then(function (response) {
//             console.log(()=>response.data);

//           })
//           .catch(function (error) {
//             console.log(error);
//           });
//           console.log(updateRespone);
//           editContact(id, { ...inputValues, number: phoneNumberForStorage });
          
//       } else {
//         const createRespone = await axios.post('http://127.0.0.1:8000/create/', {
//           name: inputValues.name,
//           phone_number: phoneNumberForStorage,
//           })
//           .then(function (response) {
//             console.log(response);
//           })
//           .catch(function (error) {
//             console.log(error);
//           });
//           console.log(createRespone);
//           addContact({ ...inputValues, number: phoneNumberForStorage });
//         } 
//         // Show an alert
//         setAleart({ type: "success", message: id ? "Your data updated successfully!" : "Your data created successfully!" });

//         resetForm(); // after submite a form then reset form
//       } else {
//         aleart("Please enter a valid 11-digit Bangladesh phone number starting with '01'.");
//       }
//     } catch (error) {
//         console.log(error);
//         setAleart({ type: "error", message: "Please enter a valid 11-digit Bangladesh phone number starting with '01'." });
//     }
//   };

  

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <h1>User {id ? "Edit" : "Create"} Information</h1>
//         <div>
//           <label htmlFor="username">Username:</label>
//           <input
//             type="text"
//             name="name"
//             value={inputValues.name}
//             onChange={handleInputChange}
//             id="username"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="usernumber">User Number (BD Only - 11 digits):</label>
//           <input
//             type="text"
//             name="number"
//             value={formatPhoneNumberForDisplay(inputValues.number)}
//             onChange={handleInputChange}
//             id="usernumber"
//             required
//           />
//         </div>
//         {aleart && (
//           <div className={`alert ${aleart.type}`}>
//             {aleart.message}
//           </div>
//         )}
//         <button className="button1" type="submit">
//           Submit
//         </button>
//         <button className="btn" type="button" onClick={() => navigate("/contact-list")}>
//           Contact List
//         </button>
//       </form>
//     </>
//   );
// }





