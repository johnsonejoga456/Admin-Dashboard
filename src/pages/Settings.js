import React from "react";
import FormInput from '../components/FormInput';

const Settings = () => {
    const [profile, setProfile] = useState({
        name: 'Admin User',
        email: 'admin@example.com',
        password: '',
    });

    const [preferences, setPreferences] = useState({
        notifications: true,
        darkMode: false,
    });

    // Hnadle form changes
    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
    };

    const handlePreferenceChange = (e) => {
        const { name, checked } = e.target;
        setPreferences((prevPrefs) => ({ ...prevProfile, [name]: checked }));
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Settings</h2>

            {/* Profile Settings */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <h3 className="text-lg font-semibold mb-4">Profile Settings</h3>
                <FormInput
                    label="Name"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                />
                <FormInput
                    label="Email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                />
                <FormInput
                    label="Password"
                    name="password"
                    type="password"
                    value={profile.password}
                    onChange={handleProfileChange}
                />
            </div>

            {/* Preferences Section */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <h3 className="text-lg font-semibold mb-4">Preferences</h3>
                <div className="flex items-center mb-4">
                    <label className="mr-2">Enable notifications</label>
                    <input
                        type="checkbox"
                        name="notifications"
                        checked={preferences.notifications}
                        onChange={handlePreferenceChange}
                    />
                </div>
                <div className="flex items-center">
                    <label className="mr-2">Dark Mode</label>
                    <input
                        type="checkbox"
                        name="darkMode"
                        checked={preferences.darkMode}
                        onChange={handlePreferenceChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default Settings;