import React, { useState } from 'react';
import DataTable from '../components/DataTable';

const Users = () => {
  // Define the table columns
  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'role', headerName: 'Role' },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (row) => (
        <div className="flex space-x-2">
          <button onClick={() => handleEdit(row)} className="text-blue-600 hover:text-blue-800 hover:underline">Edit</button>
          <button onClick={() => handleDelete(row.id)} className="text-red-600 hover:text-red-800 hover:underline">Delete</button>
          <button onClick={() => handleViewProfile(row)} className="text-green-600 hover:text-green-800 hover:underline">View Profile</button>
        </div>
      ),
    },
  ];

  const initialUsers = [
    { id: 1, name: 'John Doe', email: 'johndoe@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'Editor' },
    { id: 4, name: 'Bob Brown', email: 'bob@example.com', role: 'Viewer' },
  ];

  const [usersData, setUsersData] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isViewing, setIsViewing] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '' });

  // Filter and search logic
  const filteredData = usersData.filter((user) => {
    return (
      (user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedRole ? user.role.toLowerCase() === selectedRole.toLowerCase() : true)
    );
  });

  const handleEdit = (user) => {
    setIsEditing(true);
    setCurrentUser(user);
  };

  const handleSaveEdit = () => {
    setUsersData(usersData.map((user) => (user.id === currentUser.id ? currentUser : user)));
    setIsEditing(false);
    setCurrentUser(null);
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsersData(usersData.filter((user) => user.id !== userId));
    }
  };

  const handleViewProfile = (user) => {
    setIsViewing(true);
    setCurrentUser(user);
  };

  const handleAddUser = () => {
    setIsAdding(true);
  };

  const handleSaveNewUser = () => {
    setUsersData([...usersData, { ...newUser, id: usersData.length + 1 }]);
    setIsAdding(false);
    setNewUser({ name: '', email: '', role: '' });
  };

  return (
    <div className="p-6 bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 min-h-screen rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-700 mb-6">User Management</h2>

      {/* Search Bar */}
      <div className="mb-6 flex space-x-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-md shadow-sm w-full"
        />
        
        {/* Role Filter */}
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="p-2 border border-gray-300 rounded-md shadow-sm"
        >
          <option value="">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
          <option value="Editor">Editor</option>
          <option value="Viewer">Viewer</option>
        </select>
      </div>

      {/* Add User Button */}
      <button
        onClick={handleAddUser}
        className="mb-6 p-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 transition"
      >
        Add User
      </button>

      {/* DataTable with filtered data */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <DataTable columns={columns} data={filteredData} />
      </div>

      {/* Add User Modal */}
      {isAdding && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Add New User</h3>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="p-2 border border-gray-300 rounded-md mb-4 w-full shadow-sm"
              placeholder="Name"
            />
            <input
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="p-2 border border-gray-300 rounded-md mb-4 w-full shadow-sm"
              placeholder="Email"
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="p-2 border border-gray-300 rounded-md w-full mb-4 shadow-sm"
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>
            <button
              onClick={handleSaveNewUser}
              className="p-2 bg-green-500 text-white rounded-md mr-2 hover:bg-green-600 transition"
            >
              Save
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Edit User</h3>
            <input
              type="text"
              value={currentUser.name}
              onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
              className="p-2 border border-gray-300 rounded-md mb-4 w-full shadow-sm"
              placeholder="Name"
            />
            <input
              type="email"
              value={currentUser.email}
              onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
              className="p-2 border border-gray-300 rounded-md mb-4 w-full shadow-sm"
              placeholder="Email"
            />
            <select
              value={currentUser.role}
              onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
              className="p-2 border border-gray-300 rounded-md w-full mb-4 shadow-sm"
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>
            <button
              onClick={handleSaveEdit}
              className="p-2 bg-blue-500 text-white rounded-md mr-2 hover:bg-blue-600 transition"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* View Profile Modal */}
      {isViewing && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">User Profile</h3>
            <p><strong>Name:</strong> {currentUser.name}</p>
            <p><strong>Email:</strong> {currentUser.email}</p>
            <p><strong>Role:</strong> {currentUser.role}</p>
            <button
              onClick={() => setIsViewing(false)}
              className="mt-4 p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;