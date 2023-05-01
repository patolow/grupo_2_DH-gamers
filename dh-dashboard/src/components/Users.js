import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import User from "./User";

function Users() {
  const [users, setUsers] = useState(null)
  const [loadingUser, setLoadingUser] = useState(false)


  useEffect(() => {
    setLoadingUser(true)
    fetch("http://localhost:3000/dashboard/users")
      .then((response) => response.json())
      .then((users) => setUsers(users.data))
      .catch((error) => console.log(error))
      .finally(() => setLoadingUser(false))
  }, []);

  if (loadingUser) {
    return (
      <div className="ultimo-producto-cargado-container">
        <div className='spinner-ultimo-cargado'>
          <ClipLoader
            loading={loadingUser}
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="container-dashboard">
      <h2>Todos los usuarios:</h2>
      {users &&
        users.map((user, index) => (
          <div className="dashboard-division">
          <User 
          key={index} 
          name={user.completeName} 
          email={user.email} 
          username = {user.userName}
          image = {user.image}
          />
          </div>
        ))}
    </div>
  );
}

export default Users;
