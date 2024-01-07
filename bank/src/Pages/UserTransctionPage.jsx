import React, { useContext, useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { UserContext, AccountContext } from '../context/UsersContext.jsx';

function UserTransactionPage() {
  const { loggedInUserId, getUserById } = useContext(UserContext);
  const { fetchAccountsByUserId, userDeposit, userWithdraw, userTransfer, deleteAccount } = useContext(AccountContext);
  const [user, setUser] = useState(null);
  const [userAccounts, setUserAccounts] = useState([]);

  const [openDepositModal, setOpenDepositModal] = useState(false);
  const [openWithdrawModal, setOpenWithdrawModal] = useState(false);
  const [openTransferModal, setOpenTransferModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [amount, setAmount] = useState('');
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (loggedInUserId) {
        const fetchedUser = await getUserById(loggedInUserId);
        setUser(fetchedUser);
        const fetchedAccounts = await fetchAccountsByUserId(loggedInUserId);
        setUserAccounts(fetchedAccounts);
      }
    };
    fetchUserDetails();
  }, [loggedInUserId, getUserById, fetchAccountsByUserId]);

  const handleCloseModals = () => {
    setOpenDepositModal(false);
    setOpenWithdrawModal(false);
    setOpenTransferModal(false);
    setOpenDeleteModal(false);
  };

  const handleDeposit = async () => {
    await userDeposit(loggedInUserId, parseFloat(amount));
    handleCloseModals();
  };

  const handleWithdraw = async () => {
    await userWithdraw(loggedInUserId, parseFloat(amount));
    handleCloseModals();
  };

  const handleTransfer = async () => {
    await userTransfer(loggedInUserId, fromAccount, toAccount, parseFloat(amount));
    handleCloseModals();
  };

  const handleDeleteAccount = async () => {
    await deleteAccount(loggedInUserId);
    handleCloseModals();
  };

  return (
    <Box sx={{ p: 3 }}>
      {loggedInUserId ? (
        userAccounts.length ? (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Welcome, {user ? user.name : "User"}!
              </Typography>
              {userAccounts.map(account => (
                <Box key={account._id} sx={{ mt: 2 }}>
                  <Typography variant="subtitle1">
                    {account.accountType.charAt(0).toUpperCase() + account.accountType.slice(1)} Account
                  </Typography>
                  <Typography variant="body1">
                    Balance: ${account.cash}
                  </Typography>
                </Box>
              ))}
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button onClick={() => setOpenDepositModal(true)} color="success">Deposit</Button>
                <Button onClick={() => setOpenWithdrawModal(true)} color="primary">Withdraw</Button>
                <Button onClick={() => setOpenTransferModal(true)} color="secondary">Transfer</Button>
                <Button onClick={() => setOpenDeleteModal(true)} color="error">Delete Account</Button>
              </Stack>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent>
              <Typography variant="h6">You don't have an account. Please create one.</Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={()=> console.log("first")}>Create Account</Button>
            </CardContent>
          </Card>
        )
      ) : (
        <Card>
          <CardContent>
            <Typography variant="h6">Please log in to use our services.</Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }} component={Link} to="/login">Log In</Button>
          </CardContent>
        </Card>
      )}

      {/* Deposit Modal */}
      <Dialog open={openDepositModal} onClose={handleCloseModals}>
        {/* Modal content for deposit */}
      </Dialog>

      {/* Withdraw Modal */}
      <Dialog open={openWithdrawModal} onClose={handleCloseModals}>
        {/* Modal content for withdrawal */}
      </Dialog>

      {/* Transfer Modal */}
      <Dialog open={openTransferModal} onClose={handleCloseModals}>
        {/* Modal content for transfer */}
      </Dialog>

      {/* Delete Account Modal */}
      <Dialog open={openDeleteModal} onClose={handleCloseModals}>
        {/* Modal content for account deletion */}
      </Dialog>
    </Box>
  );
}

export default UserTransactionPage;
