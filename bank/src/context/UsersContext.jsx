import React, { createContext, useState } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const initialUserId = localStorage.getItem('loggedInUserId');
    const [loggedInUserId, setLoggedInUserId] = useState(initialUserId);
    const apiBaseUrl = 'https://bankapi-tbq9.onrender.com/api/v1';
    const axiosInstance = axios.create({ baseURL: apiBaseUrl });

    const registerUser = async (userData) => {
        const response = await axios.post(`${apiBaseUrl}/users`, userData);
        setLoggedInUserId(response.data._id);
    };

    const getUserByEmail = async (email) => {
        const response = await axiosInstance.get(`/users/email/${email}`);
        return response.data;
    };

    const loginUser = async (userId) => {
        setLoggedInUserId(userId);
        localStorage.setItem('loggedInUserId', userId); // Store user ID in local storage
    };

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
        <UserContext.Provider value={{ logoutUser ,getUserByEmail, loginUser, loggedInUserId, fetchAllUsers, createUser, getUserById, registerUser }}>
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

    const createAccount = async (userId, accountData) => {
        const response = await axios.post(`${apiBaseUrl}/accounts/${userId}`, accountData);
        return response.data;
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
