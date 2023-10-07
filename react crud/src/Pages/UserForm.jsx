import React from "react";

function UserForm({ inputValues, handleFormSubmit, handleInputChange, resetForm, alert }) {
  return (
    <>
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
    </>
  );
}

export default UserForm;
