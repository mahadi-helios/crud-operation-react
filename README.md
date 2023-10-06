# crud-operation-react

code are here 

1) userform
        <div class="contact-form">
            <form onSubmit={handleFormSubmit}>
        <h1 className="form-header">User {inputValues.id ? "Edit" : "Create"} Information</h1>
        <div className="label1">
          <input
            type="text"
            name="name"
            placeholder="Username"
            value={inputValues.name}
            onChange={handleInputChange}
            id="username"
            required
          />
        </div>
        <div className="label1">
          <input
            type="text"
            name="number"
            placeholder="User Number (BD Only - 11 digits)"
            value={inputValues.number}
            onChange={handleInputChange}
            id="usernumber"
            required
          />
        </div>
        {alert && (
          <div className={`alert ${alert.type}`}>
            {alert.message}
          </div>
        )}
        <br />
        <button className="button1" type="submit">
          Submit
        </button>
      </form>
        </div>

2) contactList:
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
3)css :
/* Global styles */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;
    box-sizing: border-box;
}


/* Container for contact list and form */
.container {
    display: flex;
    flex-direction: row;
    width: 1080px; /* Fixed width */
    height: 500px; /* Fixed height */
    margin: 20px auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden; /* Hide overflowing content */
}

/* Contact List */
.contact-list {
    flex: 1;
    padding: 20px;
    overflow-y: auto; /* Add vertical scroll if needed */
    max-height: 100%; /* Limit the height and add a scroll when more than 5 items */
    background-color: #4caf50;
}

.contact-header {
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
}

.table {
    width: 100%;
    border-collapse: collapse;
}

.table-row {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
}

.table-row.header {
    font-weight: bold;
    background-color: #f0f0f0;
}

.table-cell {
    flex: 1;
    padding: 5px;
}

.update-btn,
.delete-btn {
    padding: 5px 10px;
    margin-right: 5px;
    cursor: pointer;
}

/* Form */
.contact-form {
    flex: 1;
    padding: 20px;
    background-color: #007bff;
}

.form-header {
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
}

.label1 {
    margin-bottom: 15px;
}

input[type="text"] {
    width: 90%;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.alert {
    padding: 10px;
    margin-bottom: 10px;
    color: #fff;
    border-radius: 5px;
}

.alert.success {
    background-color: #4caf50;
}

.alert.error {
    background-color: #f44336;
}

.button1 {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.no-contact{
    text-align: center;
}

@media screen and (max-width: 768px) {
    .container {
        flex-direction: column;
    }

    .container,
    .contact-list,
    .contact-form {
        width: 100%;
        padding: 20px;
        height: 500px;
        max-height: none; /* Reset max-height for smaller screens */
        overflow-y: auto; /* Add vertical scroll if needed */
        overflow-x: auto;
    }
}

        
