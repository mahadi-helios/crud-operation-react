import React from "react";

function ContactList({ contacts, navigate, removeContact }) {
  return (
    <div>
      <h1 className="contact-header">Contact List</h1>
      {contacts.length > 0 ? (
        <div className="posts-div">
          {contacts.map((contact) => (
            <div className="post-data " key={contact.id}>
              <h4 className="name">Name: {contact.name}</h4>
              <p className="phone-number">Number: {contact.phone_number}</p>
              <button
                className="update-btn"
                onClick={() => navigate(`/edit-user/${contact.id}`, { state: contact })}
              >
                Update
              </button>
              <button className="delete-btn" onClick={() => removeContact(contact.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="alert">No Contact Here</p>
      )}
    </div>
  );
}

export default ContactList;
