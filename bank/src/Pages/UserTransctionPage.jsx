import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  CardHeader,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";
import { UserContext, AccountContext } from "../context/UsersContext.jsx";

function UserTransactionPage() {
  const { loggedInUserId, getUserById } = useContext(UserContext);
  const {
    fetchAccountsByUserId,
    userDeposit,
    userWithdraw,
    userTransfer,
    deleteAccount,
    createAccount,
  } = useContext(AccountContext);
  const [user, setUser] = useState(null);
  const [userAccounts, setUserAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [openDepositModal, setOpenDepositModal] = useState(false);
  const [openWithdrawModal, setOpenWithdrawModal] = useState(false);
  const [openTransferModal, setOpenTransferModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openCreateAccountModal, setOpenCreateAccountModal] = useState(false);

  const [amount, setAmount] = useState("");
  const [transferFrom, setTransferFrom] = useState("");
  const [transferTo, setTransferTo] = useState("");
  const [initialDeposit, setInitialDeposit] = useState("");

  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      if (loggedInUserId) {
        const fetchedUser = await getUserById(loggedInUserId);
        setUser(fetchedUser);
        const fetchedAccounts = await fetchAccountsByUserId(loggedInUserId);
        setUserAccounts(fetchedAccounts);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setUserAccounts([]);
    } finally {
      setLoading(false);
    }
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
    setAmount("");
    setTransferFrom("");
    setTransferTo("");
    setInitialDeposit("");
  };

  const handleTransaction = async (transactionFunc, successMsg) => {
    setLoading(true);
    try {
      await transactionFunc();
      setSuccessMessage(successMsg);
      setTimeout(() => {
        setSuccessMessage("");
        fetchUserDetails();
      }, 1000); // Delay for showing success message
    } catch (error) {
      console.error("Transaction error:", error);
    } finally {
      setLoading(false);
      handleCloseModals();
    }
  };

  const handleDeposit = () =>
    handleTransaction(
      () => userDeposit(loggedInUserId, parseFloat(amount)),
      "Deposit successful."
    );
  const handleWithdraw = () =>
    handleTransaction(
      () => userWithdraw(loggedInUserId, parseFloat(amount)),
      "Withdrawal successful."
    );
  const handleTransfer = () =>
    handleTransaction(
      () =>
        userTransfer(
          loggedInUserId,
          transferFrom,
          transferTo,
          parseFloat(amount)
        ),
      "Transfer successful."
    );
  const handleDeleteAccount = () =>
    handleTransaction(() => deleteAccount(loggedInUserId), "Account deleted.");
  const handleCreateAccount = () =>
    handleTransaction(
      () => createAccount(loggedInUserId, parseFloat(initialDeposit)),
      "Account created."
    );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        Account Dashboard
      </Typography>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Processing...</Typography>
        </Box>
      ) : (
        <>
          {successMessage && (
            <Box sx={{ my: 2, textAlign: "center" }}>
              <Typography variant="h6" color="success.main">
                {successMessage}
              </Typography>
            </Box>
          )}
          {loggedInUserId ? (
            userAccounts.length ? (
              <Card sx={{ my: 4, p: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                    Welcome, {user ? user.name : "User"}!
                  </Typography>
                  {userAccounts.map((account) => (
                    <Box key={account._id} sx={{ mt: 2, mb: 1 }}>
                      <Typography variant="subtitle1">
                        {account.accountType.charAt(0).toUpperCase() +
                          account.accountType.slice(1)}{" "}
                        Account
                      </Typography>
                      <Typography variant="body1">
                        Balance: ${account.cash}
                      </Typography>
                    </Box>
                  ))}
                  <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <Button
                      onClick={() => setOpenDepositModal(true)}
                      color="success"
                      sx={{
                        backgroundColor: "primary.dark",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "green",
                        },
                        "@media (max-width:600px)": {
                          fontSize: "0.75em",
                        },
                      }}
                    >
                      Deposit
                    </Button>

                    <Button
                      onClick={() => setOpenWithdrawModal(true)}
                      color="primary"
                      sx={{
                        backgroundColor: "primary.dark",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "blue",
                        },
                        "@media (max-width:600px)": {
                          fontSize: "0.75em",
                        },
                      }}
                    >
                      Withdraw
                    </Button>

                    <Button
                      onClick={() => setOpenTransferModal(true)}
                      color="secondary"
                      sx={{
                        backgroundColor: "primary.dark",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "white",
                          color: "black"
                        },
                        "@media (max-width:600px)": {
                          fontSize: "0.75em",
                        },
                      }}
                    >
                      Transfer
                    </Button>

                    <Button
                      onClick={() => setOpenDeleteModal(true)}
                      color="error"
                      sx={{
                        backgroundColor: "red",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "black",
                        },
                        "@media (max-width:600px)": {
                          fontSize: "0.75em",
                        },
                      }}
                    >
                      Delete Account
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    You don't have an account. Please create one.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => setOpenCreateAccountModal(true)}
                  >
                    Create Account
                  </Button>
                </CardContent>
              </Card>
            )
          ) : (
            <Card>
              <CardContent>
                <Typography variant="h6">
                  Please log in to use our services.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  component={Link}
                  to="/login"
                >
                  Log In
                </Button>
              </CardContent>
            </Card>
          )}

          {/* New Card for Banking Features and Options */}
          <Card sx={{ my: 4, p: 2 }}>
            <CardHeader
              avatar={<InfoIcon color="primary" />}
              title="Banking Features and Options"
            />
            <CardContent>
              <Typography variant="body1" gutterBottom>
                1. Deposits and Withdrawals are available only for Checking
                Accounts.
              </Typography>
              <Typography variant="body1" gutterBottom>
                2. Transfers are possible between Checking and Savings Accounts
                only.
              </Typography>
              <Typography variant="body1" gutterBottom>
                3. For transferring funds to other users, please go to the
                Transactions page.
              </Typography>
              <Typography variant="body1" gutterBottom>
                4. Deleting an account will remove both Checking and Savings
                accounts.
              </Typography>
            </CardContent>
          </Card>

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
                  {userAccounts.map((account) => (
                    <MenuItem key={account._id} value={account._id}>
                      {account.accountType}
                    </MenuItem>
                  ))}
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
                  {userAccounts.map((account) => (
                    <MenuItem key={account._id} value={account._id}>
                      {account.accountType}
                    </MenuItem>
                  ))}
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
                Are you sure you want to delete your account? This action cannot
                be undone.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModals}>Cancel</Button>
              <Button onClick={handleDeleteAccount} color="error">
                Delete
              </Button>
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
