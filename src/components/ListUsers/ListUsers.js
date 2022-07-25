
import { useState } from "react";

const ListUsers = (props) => {
    const {users}=props
    return (
      <div>
        {users.map((user) => {
          return <li>{user.username}</li>;
        })}
      </div>
    );
  };


export default ListUsers;
