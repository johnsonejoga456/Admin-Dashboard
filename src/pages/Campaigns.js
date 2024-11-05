import React, { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import FormInput from '../components/FormInput';
import { useNotification } from '../context/NotificationContext';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [currentCampaign, setCurrentCampaign] = useState({ name: '', description: '', startDate: '', endDate: '', budget: '', status: 'Inactive' });
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const { addNotification } = useNotification();

  useEffect(() => {
    const initialCampaigns = [
      { id: 1, name: 'Campaign 1', description: 'First campaign', startDate: '2024-05-01', endDate: '2024-05-30', budget: '1000', status: 'Active' },
      { id: 2, name: 'Campaign 2', description: 'Second campaign', startDate: '2024-06-01', endDate: '2024-06-30', budget: '2000', status: 'Inactive' },
    ];
    setCampaigns(initialCampaigns);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCampaign({ ...currentCampaign, [name]: value });
  };

  const handleSaveCampaign = () => {
    if (isEditing) {
      setCampaigns(campaigns.map(c => c.id === currentCampaign.id ? currentCampaign : c));
      addNotification('Campaign updated successfully', 'success');
    } else {
      setCurrentCampaign({ ...currentCampaign, id: campaigns.length + 1 });
      setCampaigns([...campaigns, currentCampaign]);
      addNotification('Campaign created successfully', 'success');
    }
    handleDialogClose();
  };

  const handleEditCampaign = (campaign) => {
    setCurrentCampaign(campaign);
    setIsEditing(true);
    setOpen(true);
  };

  const handleDeleteCampaign = (id) => {
    setCampaigns(campaigns.filter(campaign => campaign.id !== id));
    addNotification('Campaign deleted successfully', 'success');
  };

  const handleDialogOpen = () => {
    setCurrentCampaign({ name: '', description: '', startDate: '', endDate: '', budget: '', status: 'Inactive' });
    setIsEditing(false);
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterStatusChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const filteredCampaigns = campaigns.filter(campaign => 
    campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filterStatus ? campaign.status === filterStatus : true)
  );

  const campaignColumns = [
    { field: 'name', headerName: 'Name' },
    { field: 'description', headerName: 'Description' },
    { field: 'startDate', headerName: 'Start Date' },
    { field: 'endDate', headerName: 'End Date' },
    { field: 'budget', headerName: 'Budget' },
    { field: 'status', headerName: 'Status', renderCell: (row) => (
        <span className={`py-1 px-3 rounded-full text-white ${getStatusColor(row.status)}`}>
          {row.status}
        </span>
      ) 
    },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (row) => (
        <div className="flex space-x-2">
          <Button variant="outlined" color="primary" onClick={() => handleEditCampaign(row)}>Edit</Button>
          <Button variant="outlined" color="secondary" onClick={() => handleDeleteCampaign(row.id)}>Delete</Button>
        </div>
      ),
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500';
      case 'Inactive':
        return 'bg-gray-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-green-100 via-yellow-100 to-red-100 min-h-screen rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Campaign Management</h2>
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded-md"
        />
        <select
          value={filterStatus}
          onChange={handleFilterStatusChange}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <Button variant="contained" color="primary" onClick={handleDialogOpen}>Add Campaign</Button>
      
      <DataTable columns={campaignColumns} data={filteredCampaigns} />
      
      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>{isEditing ? 'Edit Campaign' : 'Add Campaign'}</DialogTitle>
        <DialogContent>
        <FormInput name="name" label="Campaign Name" value={currentCampaign.name} onChange={handleInputChange} />
          <FormInput name="description" label="Description" value={currentCampaign.description} onChange={handleInputChange} />
          <FormInput name="startDate" label="Start Date" type="date" value={currentCampaign.startDate} onChange={handleInputChange} />
          <FormInput name="endDate" label="End Date" type="date" value={currentCampaign.endDate} onChange={handleInputChange} />
          <FormInput name="budget" label="Budget" value={currentCampaign.budget} onChange={handleInputChange} />
          <FormInput name="status" label="Status" value={currentCampaign.status} onChange={handleInputChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">Cancel</Button>
          <Button onClick={handleSaveCampaign} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Campaigns;
