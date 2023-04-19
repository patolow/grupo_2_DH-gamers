import React from "react";

function Users({ name, email }) {
  return (
    <div>
      <h3>Name: {name}</h3>
      <p>Price: {email}</p>
    </div>
  );
}

export default Users;