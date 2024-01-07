import React, { useContext, useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Stack, Select, MenuItem, FormControl, InputLabel, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { UserContext, AccountContext } from '../context/UsersContext.jsx';

function UserTransactionPage() {
  const { loggedInUserId, getUserById } = useContext(UserContext);
  const { fetchAccountsByUserId, userDeposit, userWithdraw, userTransfer, deleteAccount, createAccount } = useContext(AccountContext);
  const [user, setUser] = useState(null);
  const [userAccounts, setUserAccounts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openDepositModal, setOpenDepositModal] = useState(false);
  const [openWithdrawModal, setOpenWithdrawModal] = useState(false);
  const [openTransferModal, setOpenTransferModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openCreateAccountModal, setOpenCreateAccountModal] = useState(false);

  const [amount, setAmount] = useState('');
  const [transferFrom, setTransferFrom] = useState('');
  const [transferTo, setTransferTo] = useState('');
  const [initialDeposit, setInitialDeposit] = useState('');


  const fetchUserDetails = async () => {
    setLoading(true);
    if (loggedInUserId) {
      const fetchedUser = await getUserById(loggedInUserId);
      setUser(fetchedUser);
      const fetchedAccounts = await fetchAccountsByUserId(loggedInUserId);
      setUserAccounts(fetchedAccounts);
    }
    setLoading(false);
  };
  
  useEffect(() => {
    fetchUserDetails();
  }, [loggedInUserId, getUserById, fetchAccountsByUserId]);

  const handleCloseModals = () => {
    setOpenDepositModal(false);
    setOpenWithdrawModal(false);
    setOpenTransferModal(false);
    setOpenDeleteModal(false);
    setOpenCreateAccountModal(false);
    setAmount('');
    setTransferFrom('');
    setTransferTo('');
    setInitialDeposit('');
  };

  const handleTransaction = async (transactionFunc) => {
    setLoading(true);
    await transactionFunc();
    await fetchUserDetails();
    setLoading(false);
    handleCloseModals();
  };

  const handleDeposit = () => handleTransaction(() => userDeposit(loggedInUserId, parseFloat(amount)));
  const handleWithdraw = () => handleTransaction(() => userWithdraw(loggedInUserId, parseFloat(amount)));
  const handleTransfer = () => handleTransaction(() => userTransfer(loggedInUserId, transferFrom, transferTo, parseFloat(amount)));
  const handleDeleteAccount = () => handleTransaction(() => deleteAccount(loggedInUserId));
  const handleCreateAccount = () => handleTransaction(() => createAccount(loggedInUserId, { cash: parseFloat(initialDeposit) }));

  return (
    <Box sx={{ p: 3 }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Processing...</Typography>
        </Box>
      ) : (
        <>
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
                  <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => setOpenCreateAccountModal(true)}>Create Account</Button>
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
            <DialogTitle>Deposit Funds</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="depositAmount"
                label="Amount to Deposit"
                type="number"
                fullWidth
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModals}>Cancel</Button>
              <Button onClick={handleDeposit}>Deposit</Button>
            </DialogActions>
          </Dialog>

          {/* Withdraw Modal */}
          <Dialog open={openWithdrawModal} onClose={handleCloseModals}>
            <DialogTitle>Withdraw Funds</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="withdrawAmount"
                label="Amount to Withdraw"
                type="number"
                fullWidth
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModals}>Cancel</Button>
              <Button onClick={handleWithdraw}>Withdraw</Button>
            </DialogActions>
          </Dialog>

          {/* Transfer Modal */}
          <Dialog open={openTransferModal} onClose={handleCloseModals}>
            <DialogTitle>Transfer Funds</DialogTitle>
            <DialogContent>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="from-account-label">From Account</InputLabel>
                <Select
                  labelId="from-account-label"
                  id="fromAccount"
                  value={transferFrom}
                  label="From Account"
                  onChange={(e) => setTransferFrom(e.target.value)}
                >
                  <MenuItem value="checking">Checking</MenuItem>
                  <MenuItem value="savings">Savings</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="to-account-label">To Account</InputLabel>
                <Select
                  labelId="to-account-label"
                  id="toAccount"
                  value={transferTo}
                  label="To Account"
                  onChange={(e) => setTransferTo(e.target.value)}
                >
                  <MenuItem value="checking">Checking</MenuItem>
                  <MenuItem value="savings">Savings</MenuItem>
                </Select>
              </FormControl>
              <TextField
                autoFocus
                margin="dense"
                id="transferAmount"
                label="Amount to Transfer"
                type="number"
                fullWidth
                sx={{ mt: 2 }}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModals}>Cancel</Button>
              <Button onClick={handleTransfer}>Transfer</Button>
            </DialogActions>
          </Dialog>

          {/* Delete Account Modal */}
          <Dialog open={openDeleteModal} onClose={handleCloseModals}>
            <DialogTitle>Confirm Account Deletion</DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to delete your account? This action cannot be undone.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModals}>Cancel</Button>
              <Button onClick={handleDeleteAccount} color="error">Delete</Button>
            </DialogActions>
          </Dialog>

          {/* Create Account Modal */}
          <Dialog open={openCreateAccountModal} onClose={handleCloseModals}>
            <DialogTitle>Create New Account</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="initialDeposit"
                label="Initial Deposit"
                type="number"
                fullWidth
                value={initialDeposit}
                onChange={(e) => setInitialDeposit(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModals}>Cancel</Button>
              <Button onClick={handleCreateAccount}>Create Account</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  );
}

export default UserTransactionPage;
