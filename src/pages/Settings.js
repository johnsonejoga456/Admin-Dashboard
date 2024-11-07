import React, { useState, useEffect, useContext } from 'react';
import { Button, TextField, MenuItem, FormControl, InputLabel, Select, Typography, Box, Grid } from '@mui/material';
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext

const Settings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext); // Access theme context
  const [profile, setProfile] = useState({ name: '', email: '', password: '' });
  const [preferences, setPreferences] = useState({ theme: theme, language: '', notifications: '' });

  useEffect(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handlePreferencesChange = (e) => {
    const { name, value } = e.target;
    setPreferences((prevPreferences) => ({ ...prevPreferences, [name]: value }));
  };

  const handleSavePreferences = () => {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    toggleTheme(preferences.theme); // Apply theme immediately
    alert('Preferences saved successfully!');
  };

  return (
    <Box className="p-6 bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 min-h-screen rounded-xl shadow-lg">
      <Typography variant="h4" fontWeight="bold" color="gray.800" gutterBottom>
        Settings
      </Typography>

      {/* Profile Settings */}
      <Box mb={6}>
        <Typography variant="h6" fontWeight="medium" color="gray.800" mb={2}>
          Profile Settings
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              name="password"
              value={profile.password}
              onChange={handleProfileChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={() => alert('Profile saved successfully!')}>
              Save Profile
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* User Preferences */}
      <Box mb={6}>
        <Typography variant="h6" fontWeight="medium" color="gray.800" mb={2}>
          User Preferences
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Theme</InputLabel>
              <Select
                name="theme"
                value={preferences.theme}
                onChange={handlePreferencesChange}
                label="Theme"
              >
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Language</InputLabel>
              <Select
                name="language"
                value={preferences.language}
                onChange={handlePreferencesChange}
                label="Language"
              >
                <MenuItem value="english">English</MenuItem>
                <MenuItem value="spanish">Spanish</MenuItem>
                <MenuItem value="french">French</MenuItem>
                <MenuItem value="german">German</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Notifications</InputLabel>
              <Select
                name="notifications"
                value={preferences.notifications}
                onChange={handlePreferencesChange}
                label="Notifications"
              >
                <MenuItem value="enabled">Enabled</MenuItem>
                <MenuItem value="disabled">Disabled</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handleSavePreferences}>
              Save Preferences
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Settings;
