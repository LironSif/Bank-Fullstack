import React from 'react';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function TransactionsPage() {
  // Dummy data for the table
  const transactions = [
    { id: 1, type: 'Deposit', amount: 100, date: '2023-01-01' },
    { id: 2, type: 'Withdrawal', amount: 50, date: '2023-01-02' },
    // Add more transactions
  ];

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Transaction History
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell component="th" scope="row">
                  {transaction.type}
                </TableCell>
                <TableCell align="right">{transaction.amount}</TableCell>
                <TableCell align="right">{transaction.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default TransactionsPage