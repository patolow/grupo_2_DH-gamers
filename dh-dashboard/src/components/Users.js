import React, { useEffect, useState } from "react";
import User from "./User";

function Users() {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    console.log("rendering")
    fetch("http://localhost:3000/dashboard/users")
      .then((response) => response.json())
      .then((users) => setUsers(users.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h2>Users:</h2>
      {users &&
        users.map((user, index) => (
          <User key={index} name={user.completeName} email={user.email} />
        ))}
    </div>
  );
}

export default Users;
