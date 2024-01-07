import React, { useContext, useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Typography, Box, Stack, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UsersContext.jsx';

function Navigation() {
    const { loggedInUserId, getUserById, logoutUser } = useContext(UserContext);
    const [user, setUser] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

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

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {['Home', 'MY Account', 'Transactions'].map((text, index) => (
                    <ListItem button key={text} component={Link} to={index === 0 ? '/' : index === 1 ? '/user-details' : '/transactions'}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2, display: { sm: 'none' } }}
                    onClick={toggleDrawer(true)}
                >
                    <MenuIcon />
                </IconButton>
                <Drawer
                    anchor="left"
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                >
                    {list()}
                </Drawer>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Bank App
                </Typography>
                <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                    <Stack direction="row" spacing={2}>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button color="inherit" component={Link} to="/user-details">MY Account</Button>
                        <Button color="inherit" component={Link} to="/transactions">Transactions</Button>
                    </Stack>
                </Box>
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
