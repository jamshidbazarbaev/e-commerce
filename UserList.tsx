import React from "react";
import { IUser } from "../models/models";

interface UserListProps {
  users: IUser[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div >

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 ">
          {users.map((userItem) => (
            <li key={userItem.id} className="border p-4 rounded-md shadow-md"> 
              <img
                src={userItem.avatar}
                alt={userItem.name}
                width={75}
                height={50}
                className="rounded-full "
              />
              <p>Name: {userItem.name}</p>
              <p>Email: {userItem.email}</p>
            </li>
          ))}
        </ul>
    </div>
  );
};

export default UserList;
