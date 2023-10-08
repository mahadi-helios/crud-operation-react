import React from "react";

function AllListOfContact({ contacts, navigate, removeContact }) {
  return (
    <>
      <div class="contact-list">
        <h1 class="contact-header">Contact List</h1>
            {contacts.length > 0 ? (
          <div className="table-container">
            <div class="table">
              <div className="table-row header">
                <div className="table-cell">Name</div>
                <div className="table-cell">Number</div>
                <div className="table-cell">Action</div>
              </div>
              {contacts.slice(0,10).map((contact) => (
              <div className="table-row" key={contact.id}>
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
        ) : (
          <p className="no-contact">No Contact Here</p>
        )}
      </div>
   </>
  );
}

export default AllListOfContact;