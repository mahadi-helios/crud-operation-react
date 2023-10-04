import React from "react";

function UserForm({ inputValues, handleFormSubmit, handleInputChange, resetForm, alert }) {
  return (
    <form onSubmit={handleFormSubmit}>
      <h1>User {inputValues.id ? "Edit" : "Create"} Information</h1>
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
          value={inputValues.number}
          onChange={handleInputChange}
          id="usernumber"
          required
        />
      </div>
      {alert && (
        <div className={`alert ${alert.type} danger ,success `}>
          {alert.message}
        </div>
      )}
      <br />
      <button className="button1" type="submit">
        Submit
      </button>
      <button className="btn" onClick={() => resetForm()}>
        Clear
      </button>
    </form>
  );
}

export default UserForm;
