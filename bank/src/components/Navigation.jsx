import React, { useContext, useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Typography, Box, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UsersContext.jsx';

function Navigation() {
    const { loggedInUserId, getUserById, loginUser,logoutUser } = useContext(UserContext);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (loggedInUserId) {
            const fetchUser = async () => {
                const fetchedUser = await getUserById(loggedInUserId);
                setUser(fetchedUser);
            };
            fetchUser();
        } else {
            setUser(null);
        }
    }, [loggedInUserId, getUserById]);


const handleLogout = () => {
    logoutUser(); 
};


    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Bank App
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/user-details">MY Account</Button>
                    <Button color="inherit" component={Link} to="/transactions">Transactions</Button>
                </Stack>
                <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', marginLeft: 2 }}>
                    {user ? (
                        <>
                            <Typography sx={{ marginRight: 2 }}>
                                Hi {user.name}
                            </Typography>
                            <Button color="secondary" variant="contained" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navigation;
