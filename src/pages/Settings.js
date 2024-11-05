import React, { useState, useEffect } from 'react';
import { Button, TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material';

const Settings = () => {
  const [profile, setProfile] = useState({ name: '', email: '', password: '' });
  const [preferences, setPreferences] = useState({ theme: '', language: '', notifications: '' });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handlePreferencesChange = (e) => {
    const { name, value } = e.target;
    setPreferences({ ...preferences, [name]: value });
  };

  const handleSaveProfile = () => {
    localStorage.setItem('profile', JSON.stringify(profile));
    alert('Profile saved successfully!');
  };

  const handleSavePreferences = () => {
    localStorage.setItem('preferences', JSON.stringify(preferences));
    alert('Preferences saved successfully!');
  };

  useEffect(() => {
    const savedProfile = localStorage.getItem('profile');
    const savedPreferences = localStorage.getItem('preferences');
    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedPreferences) setPreferences(JSON.parse(savedPreferences));
  }, []);

  return (
    <div className="p-6 bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 min-h-screen rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Settings</h2>

      {/* Profile Settings */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Profile Settings</h3>
        <TextField
          label="Name"
          name="name"
          value={profile.name}
          onChange={handleProfileChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={profile.email}
          onChange={handleProfileChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={profile.password}
          onChange={handleProfileChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSaveProfile}>
          Save Profile
        </Button>
      </div>

      {/* User Preferences */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">User Preferences</h3>
        <FormControl fullWidth margin="normal">
          <InputLabel>Theme</InputLabel>
          <Select
            name="theme"
            value={preferences.theme}
            onChange={handlePreferencesChange}
          >
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="dark">Dark</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Language</InputLabel>
          <Select
            name="language"
            value={preferences.language}
            onChange={handlePreferencesChange}
          >
            <MenuItem value="english">English</MenuItem>
            <MenuItem value="spanish">Spanish</MenuItem>
            <MenuItem value="french">French</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Notifications</InputLabel>
          <Select
            name="notifications"
            value={preferences.notifications}
            onChange={handlePreferencesChange}
          >
            <MenuItem value="enabled">Enabled</MenuItem>
            <MenuItem value="disabled">Disabled</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSavePreferences}>
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

export default Settings;
