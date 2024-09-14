import React, { useState } from 'react';
import { IUser } from '../models/models';

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: Omit<IUser, 'id'>) => void;
}

const UserFormModal: React.FC<UserFormModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "https://api.lorem.space/image/face?w=150&h=150"
  });

  const handleNewUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(newUser);
    setNewUser({
      name: "",
      email: "",
      password: "",
      avatar: "https://api.lorem.space/image/face?w=150&h=150"
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Create New User</h3>
          <form onSubmit={handleSubmit} className="mt-2">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newUser.name}
              onChange={handleNewUserChange}
              className="w-full p-2 mb-2 border rounded-md"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newUser.email}
              onChange={handleNewUserChange}
              className="w-full p-2 mb-2 border rounded-md"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={newUser.password}
              onChange={handleNewUserChange}
              className="w-full p-2 mb-2 border rounded-md"
              required
            />
            <div className="items-center px-4 py-3">
              <button
                id="ok-btn"
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Create User
              </button>
            </div>
          </form>
          <button onClick={onClose} className="mt-2 px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserFormModal;