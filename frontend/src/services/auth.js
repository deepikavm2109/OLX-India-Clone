import axios from 'axios';


const API_URL = 'http://localhost:8000/';

const register = async(username, email, password) => {
    return axios.post(API_URL + 'olxapi/register/', {
        username,
        email,
        password
    });
};

const login = async (username, password) => {
    try {
        //  Sending login request to get tokens
        const response = await axios.post(API_URL + 'olxapi/token/', {
            username,
            password,
        });

        // Checking if access token is returned
        if (response.data.access) {
            const tokens = response.data; // This contains access and refresh tokens
            localStorage.setItem('tokens', JSON.stringify(tokens));

            // Step 3: Fetch user profile using the access token
            const profileResponse = await axios.get(API_URL + 'olxapi/profile/', {
                headers: {
                    Authorization: `Bearer ${tokens.access}`,
                },
            });

            // Step 4: Store both the tokens and user profile in localStorage
            const userData = {
                ...tokens, // Access and refresh tokens
                username: profileResponse.data.username,
                email: profileResponse.data.email,
                // Add more profile fields if necessary
            };

            localStorage.setItem('user', JSON.stringify(userData));

            // Return the user data
            return userData;
        }

    } catch (error) {
        // Error handling
        if (error.response && error.response.status === 401) {
            throw new Error('Unauthorized: Invalid credentials');
        }
        throw error.response ? error.response.data : error.message;
    }
};


const logout = async() => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export default {
    register,
    login,
    logout,
    getCurrentUser,
};
