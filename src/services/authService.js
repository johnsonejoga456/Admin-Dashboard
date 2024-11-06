// Register a new user
export const register = async (userData) => {
    try {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));
        return { message: "Registration successful" };
    } catch (error) {
        console.error("Registration error", error);
        throw error;
    }
};

// Login user
export const login = async (credentials) => {
    try {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === credentials.email && user.password === credentials.password);
        if (user) {
            const token = "mock-token"; // Simulate token
            localStorage.setItem('authToken', token);
            return { token };
        } else {
            throw new Error("Invalid credentials");
        }
    } catch (error) {
        console.error("Login error", error);
        throw error;
    }
};

// Logout user
export const logout = () => {
    localStorage.removeItem('authToken');
};

// Get current user token
export const getToken = () => {
    return localStorage.getItem('authToken');
};
