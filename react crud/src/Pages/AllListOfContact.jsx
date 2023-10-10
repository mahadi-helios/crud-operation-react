import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Paginator from "./Paginator";
import Cookies from "js-cookie";

export default function AllListOfContact() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const contactData = location.state;
  const [alert, setAlert] = useState(null);
  const [contacts, setContacts] = useState([]); // Array to store the contact list


  // Define the API base URL from the environment variable
  const apiBaseUrl = import.meta.env.VITE_API_URL;


  const [currentPage, setCurrenpage]= useState(1);

  const handlePageChange = (newPage) => {
    if (newPage < 1) {
      newPage = 1; // Ensure we don't go below the first page
    } else if (newPage > Math.ceil(contacts.length / itemPerPage)) {
      newPage = Math.ceil(contacts.length / itemPerPage); // Ensure we don't go beyond the last page
    }
    setCurrenpage(newPage);
  };
  
  const itemPerPage = 20;
  const startIndex = (currentPage-1)* itemPerPage;
  const endIndex = startIndex + itemPerPage;



  useEffect(() => {
    if (alert) {
      const timeoutId = setTimeout(() => {
        setAlert(null);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [alert]);


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

    //  counter variable
    let counter = startIndex + 1;

  return (
    <>
      <div className="contact-list-all">
          <div className="page">
          <div className="del-aleart">
        {alert && (
              <div className={`alert ${alert.type}`}>
                {alert.message}
              </div>
            )}
        </div>
        <h2 className="contact-all-header">All Contact List</h2>
        <button type="submit"  className="btn-list" onClick={()=> navigate('/contact-form')}>Back</button>
          <div className="table-container-all">
              <div className="table-all">
                <div className="table-row header color">
                <div className="table-cell">Id</div>
                  <div className="table-cell">Name</div>
                  <div className="table-cell">Number</div>
                  <div className="table-cell">Action</div>
                </div>
                {contacts.slice(startIndex, endIndex).map((contact) => (
                <div className="table-row" key={contact.id}>
                   <div className="table-cell">{counter++}</div>
                  <div className="table-cell">{contact.name}</div>
                  <div className="table-cell">{contact.phone_number}</div>
                  <div className="table-cell">
                    <button className="update-btn" onClick={() => navigate(`/edit-user/${contact.id}`, { state: contact })}>
                      Update
                    </button>
                    <button className="delete-btn" onClick={() => removeContact(contact.id)}>
                      Delete
                    </button>
                  </div>
                </div>
                ))}
              </div>
          </div>  
          </div>
        
        <Paginator
            totalPages={Math.ceil(contacts.length / itemPerPage)}
            currentPage={currentPage}
            onPageChange={handlePageChange}
        />

      </div>
   </>
  );
}




