import React, { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';

const Content = () => {
  const [contentItems, setContentItems] = useState([]);
  const [currentContent, setCurrentContent] = useState({ title: '', body: '', author: '', type: '', status: 'Draft' });
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    // Load initial mock data
    const initialContent = [
      { id: 1, title: 'First Article', body: 'This is the first article', author: 'Author1', type: 'Article', status: 'Published', dateCreated: '2024-01-01', lastUpdated: '2024-01-10' },
      { id: 2, title: 'Second Blog Post', body: 'This is the second blog post', author: 'Author2', type: 'Blog Post', status: 'Draft', dateCreated: '2024-01-05', lastUpdated: '2024-01-15' },
      
    ];
    setContentItems(initialContent);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentContent({ ...currentContent, [name]: value });
  };

  const handleSaveContent = () => {
    if (isEditing) {
      setContentItems(contentItems.map(item => item.id === currentContent.id ? currentContent : item));
    } else {
      setCurrentContent({ ...currentContent, id: contentItems.length + 1 });
      setContentItems([...contentItems, currentContent]);
    }
    resetForm();
  };

  const handleEditContent = (content) => {
    setCurrentContent(content);
    setIsEditing(true);
  };

  const handleDeleteContent = (id) => {
    setContentItems(contentItems.filter(item => item.id !== id));
  };

  const resetForm = () => {
    setCurrentContent({ title: '', body: '', author: '', type: '', status: 'Draft' });
    setIsEditing(false);
  };

  const filteredContent = contentItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filterStatus ? item.status === filterStatus : true)
  );

  const contentColumns = [
    { field: 'title', headerName: 'Title' },
    { field: 'author', headerName: 'Author' },
    { field: 'type', headerName: 'Type' },
    { field: 'dateCreated', headerName: 'Date Created' },
    { field: 'lastUpdated', headerName: 'Last Updated' },
    { field: 'status', headerName: 'Status', renderCell: (row) => (
      <span className={`py-1 px-3 rounded-full text-white ${row.status === 'Published' ? 'bg-green-500' : 'bg-yellow-500'}`}>
        {row.status}
      </span>
    )},
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (row) => (
        <div className="flex space-x-2">
          <button onClick={() => handleEditContent(row)} className="text-blue-600 hover:underline">Edit</button>
          <button onClick={() => handleDeleteContent(row.id)} className="text-red-600 hover:underline">Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 min-h-screen rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Content Management</h2>

      {/* Search and Filter */}
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="">All Statuses</option>
          <option value="Published">Published</option>
          <option value="Draft">Draft</option>
        </select>
      </div>

      {/* Form for Creating/Editing Content */}
      <div className="mb-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={currentContent.title}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded-md mb-2 w-full"
        />
        <textarea
          name="body"
          placeholder="Body"
          value={currentContent.body}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded-md mb-2 w-full"
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={currentContent.author}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded-md mb-2 w-full"
        />
        <input
          type="text"
          name="type"
          placeholder="Type"
          value={currentContent.type}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded-md mb-2 w-full"
        />
        <select
          name="status"
          value={currentContent.status}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded-md mb-2 w-full"
        >
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
        </select>
        <button
          onClick={handleSaveContent}
          className={`p-2 rounded-md ${isEditing ? 'bg-yellow-500' : 'bg-green-500'} text-white w-full`}
        >
          {isEditing ? 'Update Content' : 'Create Content'}
        </button>
      </div>

      <DataTable columns={contentColumns} data={filteredContent} />
    </div>
  );
};

export default Content;
