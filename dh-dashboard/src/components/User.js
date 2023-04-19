import React from "react";

function Users({ name, email, username }) {
  return (
    <div>
      <h2>Nombre: {name}</h2>
      <p>Email: {email}</p>
      <p>Nombre de usuario: {username}</p>
    </div>
  );
}

export default Users;