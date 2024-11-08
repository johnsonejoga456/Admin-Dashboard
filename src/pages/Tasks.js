import React, { useState } from 'react';
import { Box, Typography, Button, Modal, TextField, IconButton } from '@mui/material';
import { Edit, Delete, CheckCircle, Cancel } from '@mui/icons-material';
import DataTable from '../components/DataTable';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  // Columns for DataTable component
  const columns = [
    { field: 'title', headerName: 'Task Title' },
    { field: 'description', headerName: 'Description' },
    {
      field: 'completed',
      headerName: 'Completed',
      renderCell: (row) => (row.completed ? 'Yes' : 'No')
    },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (row) => (
        <Box>
          <IconButton onClick={() => handleToggleComplete(row.id)} color="primary">
            {row.completed ? <Cancel /> : <CheckCircle />}
          </IconButton>
          <IconButton onClick={() => handleEditTask(row)} color="default">
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDeleteTask(row.id)} color="secondary">
            <Delete />
          </IconButton>
        </Box>
      )
    }
  ];

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setIsEditing(false);
    setCurrentTask(null);
    setNewTask({ title: '', description: '' });
  };

  const handleAddTask = () => {
    setTasks([...tasks, { ...newTask, id: tasks.length + 1, completed: false }]);
    handleCloseModal();
  };

  const handleEditTask = (task) => {
    setIsEditing(true);
    setCurrentTask(task);
    setNewTask({ title: task.title, description: task.description });
    handleOpenModal();
  };

  const handleSaveEditTask = () => {
    setTasks(tasks.map(task => task.id === currentTask.id ? { ...currentTask, ...newTask } : task));
    handleCloseModal();
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleToggleComplete = (taskId) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task));
  };

  return (
    <Box className="p-6 bg-white dark:bg-gray-900 min-h-screen rounded-lg shadow-lg">
      <Typography variant="h4" fontWeight="bold" color="gray.800" gutterBottom>
        Task Management
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpenModal}>
        Add Task
      </Button>

      {/* DataTable Component */}
      <Box className="mt-4">
        <DataTable columns={columns} data={tasks} />
      </Box>

      {/* Add/Edit Task Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg mx-auto mt-20 max-w-md">
          <Typography variant="h6" gutterBottom>{isEditing ? 'Edit Task' : 'Add New Task'}</Typography>
          <TextField
            fullWidth
            label="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Task Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={isEditing ? handleSaveEditTask : handleAddTask}>
            {isEditing ? 'Save Changes' : 'Save Task'}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Tasks;
