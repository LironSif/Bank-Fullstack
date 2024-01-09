import React, { createContext, useState } from 'react';
import axios from 'axios';
import { redirect } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const initialUserId = localStorage.getItem('loggedInUserId');
    const [loggedInUserId, setLoggedInUserId] = useState(initialUserId);
    const apiBaseUrl = 'http://localhost:3000/api/v1';
    // const apiBaseUrl = 'https://bankapi-tbq9.onrender.com/api/v1';
    const axiosInstance = axios.create({ baseURL: apiBaseUrl });
    
    const registerUser = async (userData) => {
        try {
            const response = await axios.post(`${apiBaseUrl}/users/s`, userData);
            console.log(response.data);
            if (response.data.token) {
                await authTheUser(response.data.token);
                setLoggedInUserId(response.data._id);
                console.log("Registration and authentication completed successfully");
            }
        } catch (error) {
            if (error.response) {
                console.error("Registration error:", error.response.data);
                throw new Error(error.response.data); 
            } else {
                console.error("Error:", error.message);
                throw error;
            }
        }
    };
    
    const loginTheUser = async (userId ,email, password) => {
        try {
            const response = await axios.post(`${apiBaseUrl}/users/login`, { email, password });
            console.log(response.data);
            if (response.data.token) {
                await authTheUser(response.data.token);
                console.log("Login successful for email:", email);
                console.log(userId);
                setLoggedInUserId(userId);
                localStorage.setItem('loggedInUserId', userId); 
            }
        } catch (error) {
            console.error("Login problem:", error.response ? error.response.data : error.message);
        }
    };
    
    const authTheUser = async (token) => {
        try {
            const response = await axios.get(`${apiBaseUrl}/users/s/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Authenticated user data:", response.data);
            // Additional logic if needed
        } catch (error) {
            console.error("Authentication problem:", error.response ? error.response.data : error.message);
        }
    };










    const getUserByEmail = async (email) => {
        const response = await axiosInstance.get(`/users/email/${email}`);
        return response.data;
    };

    // const loginUser = async (userId) => {
    //     setLoggedInUserId(userId);
    //     localStorage.setItem('loggedInUserId', userId); // Store user ID in local storage
    // };

    const logoutUser = () => {
        setLoggedInUserId(null);
        localStorage.removeItem('loggedInUserId'); // Clear user ID from local storage
    }

    const fetchAllUsers = async () => {
        const response = await axios.get(`${apiBaseUrl}/users`);
        return response.data;
    };

    const createUser = async (userData) => {
        const response = await axios.post(`${apiBaseUrl}/users`, userData);
        return response.data;
    };

    const getUserById = async (userId) => {
        const response = await axios.get(`${apiBaseUrl}/users/${userId}`);
        return response.data;
    };

    return (
        <UserContext.Provider value={{ loginTheUser ,logoutUser ,getUserByEmail, loggedInUserId, fetchAllUsers, createUser, getUserById, registerUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
    const apiBaseUrl = 'https://bankapi-tbq9.onrender.com/api/v1';

    const fetchAllAccounts = async () => {
        const response = await axios.get(`${apiBaseUrl}/accounts`);
        return response.data;
    };

    const fetchAccountsByUserId = async (userId) => {
        const response = await axios.get(`${apiBaseUrl}/accounts/${userId}`);
        return response.data;
    };

    const getAccountById = async (accountId) => {
        const response = await axios.get(`${apiBaseUrl}/accounts/${accountId}`);
        return response.data;
    };

    const createAccount = async (userId, amount) => {

        try {
            const response = await axios.post(`${apiBaseUrl}/accounts/${userId}`, { cash: amount });
            return response.data;
        } catch (error) {
            // Check if the error response exists and log the message
            if (error.response) {
                console.error('Error:', error.response.data);
                throw new Error(error.response.data);
            } else {
                console.error('Error:', error.message);
                throw error;
            }
        }
    };
    

    const deleteAccount = async (accountId) => {
        const response = await axios.delete(`${apiBaseUrl}/accounts/${accountId}`);
        return response.data;
    };

    const userDeposit = async (accountId, amount) => {
        const response = await axios.post(`${apiBaseUrl}/accounts/${accountId}/deposit`, { amount });
        return response.data;
    };

    const userWithdraw = async (accountId, amount) => {
        const response = await axios.post(`${apiBaseUrl}/accounts/${accountId}/Withdraw`, { amount });
        return response.data;
    };

    const userTransfer = async (userId, fromAccountId, toAccountId, amount) => {
        const response = await axios.post(`${apiBaseUrl}/accounts/${userId}/transfer`, { fromAccountId, toAccountId, amount });
        return response.data;
    };

    return (
        <AccountContext.Provider value={{ fetchAllAccounts, getAccountById, createAccount, deleteAccount, userDeposit, userWithdraw, fetchAccountsByUserId, userTransfer }}>
            {children}
        </AccountContext.Provider>
    );
};
