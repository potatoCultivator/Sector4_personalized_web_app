import React, { useState, useEffect, useCallback } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Grid } from '@mui/material';

function ProductInv() {
  const [rows, setRows] = useState([
  { id: 1, church: 'Church 1', name: 'John Doe', academicStatus: 'Graduate', status: 'Active', registration: 'Registered' },
  { id: 2, church: 'Church 2', name: 'Jane Doe', academicStatus: 'Undergraduate', status: 'Inactive', registration: 'Not Registered' },
  { id: 3, church: 'Church 3', name: 'Alice Smith', academicStatus: 'Graduate', status: 'Active', registration: 'Registered' },
  { id: 4, church: 'Church 4', name: 'Bob Johnson', academicStatus: 'Undergraduate', status: 'Inactive', registration: 'Not Registered' },
  { id: 5, church: 'Church 5', name: 'Charlie Brown', academicStatus: 'Graduate', status: 'Active', registration: 'Registered' },
]);
  const [editId, setEditId] = useState(null);

  const saveRow = async (id) => {
   
  };

  const fetchData = useCallback(async () => {
    
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const deleteRow = async (docId) => {
    
  };

  const updateRow = (id, event) => {
    
  };

  return (
      <TableContainer component={Paper}>
        <Grid item xs={12} sx={{ m: 3, mb: 1.25, pl: 0 }}>
          <Typography variant="h3">Product Table</Typography>
        </Grid>

        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Church</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Academic Status</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Registration</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {editId === row.id ? (
                    <TextField name="church" value={row.church} onChange={(event) => updateRow(row.id, event)} />
                  ) : (
                    row.church
                  )}
                </TableCell>
                <TableCell align="right">
                  {editId === row.id ? (
                    <TextField name="name" value={row.name} onChange={(event) => updateRow(row.id, event)} />
                  ) : (
                    row.name
                  )}
                </TableCell>
                <TableCell align="right">
                  {editId === row.id ? (
                    <TextField name="academic status" value={row.academicStatus} onChange={(event) => updateRow(row.id, event)} />
                  ) : (
                    row.academicStatus
                  )}
                </TableCell>
                <TableCell align="right">
                  {editId === row.id ? (
                    <TextField name="status" value={row.status} onChange={(event) => updateRow(row.id, event)} />
                  ) : (
                    row.status
                  )}
                </TableCell>
                <TableCell align="right">
                  {editId === row.id ? (
                    <TextField name="registration" value={row.registration} onChange={(event) => updateRow(row.id, event)} />
                  ) : (
                    row.registration
                  )}
                </TableCell>
                <TableCell align="right">
                  {editId === row.id ? (
                    <Button color="primary" style={{backgroundColor: 'green', color: 'white'}} onClick={() => saveRow(row.id)}>Done</Button>
                  ) : (
                    <>
                      <Button color="primary" style={{backgroundColor: 'blue', color: 'white'}} onClick={() => setEditId(row.id)}>Edit</Button>
                      <Button color="primary" style={{backgroundColor: 'red', color: 'white'}} onClick={() => deleteRow(row.docId)}>Delete</Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}

export default ProductInv;