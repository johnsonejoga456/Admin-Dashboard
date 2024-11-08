import React, { useState, useEffect } from 'react';
import { IconButton, Box, Typography, Avatar, Badge, Menu, MenuItem, Modal, Button } from '@mui/material';
import { Notifications } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [profileEl, setProfileEl] = useState(null);
    const [profileImage, setProfileImage] = useState('');
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navigate = useNavigate();

    // Mockup notifications data
    const notifications = [
        { id: 1, message: 'New user registration' },
        { id: 2, message: 'New task added' },
        { id: 3, message: 'Server maintenance at 3 PM' }
    ];

    // Fetch random profile image (male)
    useEffect(() => {
        fetch('https://randomuser.me/api/?gender=male')
            .then(response => response.json())
            .then(data => {
                const imageUrl = data.results[0].picture.large;
                setProfileImage(imageUrl);
            });
    }, []);

    // Notification dropdown handlers
    const handleNotificationClick = (event) => setAnchorEl(event.currentTarget);
    const handleNotificationClose = () => setAnchorEl(null);

    // Profile dropdown handlers
    const handleProfileClick = (event) => setProfileEl(event.currentTarget);
    const handleProfileClose = () => setProfileEl(null);

    // Profile modal handlers
    const handleViewProfile = () => {
        setProfileEl(null);
        setIsProfileOpen(true);
    };
    const handleCloseProfile = () => setIsProfileOpen(false);

    // Handle profile image upload
    const handleProfileImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Actual logout function
    const handleLogout = () => {
        setProfileEl(null);
        localStorage.removeItem('authToken'); // Clear authentication token
        navigate('/login'); // Redirect to login page
    };

    return (
        <header className="bg-white shadow p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Dashboard</h1>
            <div className="flex items-center space-x-4">
                {/* Notification Icon with Badge */}
                <IconButton onClick={handleNotificationClick} aria-label="notifications">
                    <Badge badgeContent={notifications.length} color="secondary">
                        <Notifications className="text-gray-600" />
                    </Badge>
                </IconButton>
                
                {/* Notifications Dropdown */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleNotificationClose}
                    className="mt-2"
                >
                    {notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <MenuItem key={notification.id} onClick={handleNotificationClose}>
                                {notification.message}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem onClick={handleNotificationClose}>No new notifications</MenuItem>
                    )}
                </Menu>

                {/* Profile Section */}
                <Box onClick={handleProfileClick} className="flex items-center cursor-pointer space-x-2">
                    <Avatar src={profileImage} alt="Profile Image" />
                    <Typography className="text-gray-700 font-semibold">John Doe</Typography>
                </Box>

                {/* Profile Dropdown */}
                <Menu
                    anchorEl={profileEl}
                    open={Boolean(profileEl)}
                    onClose={handleProfileClose}
                    className="mt-2"
                >
                    <MenuItem onClick={handleViewProfile}>View Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </div>

            {/* Profile Modal */}
            <Modal open={isProfileOpen} onClose={handleCloseProfile}>
                <Box className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg mx-auto mt-20 max-w-md">
                    <Typography variant="h6" gutterBottom>Profile</Typography>
                    <Avatar src={profileImage} alt="Profile Image" className="w-32 h-32 mx-auto" />
                    <Typography variant="body1" className="text-center mt-4">John Doe</Typography>
                    <Button variant="contained" component="label" className="mt-4">
                        Change Profile Picture
                        <input type="file" accept="image/*" onChange={handleProfileImageChange} hidden />
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleCloseProfile} className="mt-4">Close</Button>
                </Box>
            </Modal>
        </header>
    );
};

export default Header;
