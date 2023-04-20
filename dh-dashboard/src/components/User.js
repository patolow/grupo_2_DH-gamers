import React from "react";
function User({ name, email, username, image }) {
  const url = "http://localhost:3000" + image

  return (
    <div className="container-datos">
      <div className="datos-texto">
        <h2>Nombre: {name}</h2>
        <p>Email: {email}</p>
        <p>Nombre de usuario: {username}</p>
      </div>
      <div className="datos-imagen">
        <img style={{ width: "10%" }}
          src={url}
          alt="imagen usuario"
        />
      </div>
    </div>
  );
}

export default User;