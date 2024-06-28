import React, { useState, useEffect } from 'react';

import { Typography, Button, Card, CardContent, TextField, Grid, Alert } from '@mui/material';
// import Product from './product';
import Snackbar from '@mui/material/Snackbar';

import { uploadRow,updateRow } from '../backend';

function createData(church ,firstname, lastname, acadStat, stat, registration) {
  return { church ,firstname, lastname, acadStat, stat, registration };
}

export default function EditAttendeeInfo({row}) {
  // Product state
  const [firstname, setFirstname] = useState(row.firstname);
  const [lastname, setLastname] = useState(row.lastname);
  const [church, setChurch] = useState(row.church);
  const [academicStat, setAcademicStat] = useState(row.acadStat);
  const [status, setStatus] = useState(row.stat);
  const [registration, setRegistration] = useState(row.registration);
  
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = React.useState('error');

  const handleAddAttendee = async () => {
  setLoading(true); // Indicate loading state
  try {
    const data = createData(church, firstname, lastname, academicStat, status, registration);
    await updateRow(row.id, data);
    setMessageType('success');
    setMessage('Edit successful!'); // Set success message
    setShowPopup(true); // Show success message
    // window.location.onClose();
  } catch (error) {
    console.error(error);
    setMessage('Failed to register. Please try again.'); // Set error message
    setShowPopup(true); // Show error message
  } finally {
    setLoading(false); // Reset loading state
  }
};

  const hidePopup = () => {
    setShowPopup(false);
  };

  if (showPopup) {
    setTimeout(() => {
      hidePopup();
    }, 5000);
  }

  useEffect(() => {
    let payment;
    switch(academicStat) {
      case 'Elementary':
        payment = 30;
        break;
      case 'High School':
        payment = 50;
        break;
      case 'College':
        payment = 80;
        break;
      case 'Young Prof':
        payment = 100;
        break;
      default:
        payment = 0;
    }
    setRegistration(payment);
  }, [academicStat]); 

  const isRegisterDisabled = () => {
  return (
    firstname === '' ||
    lastname === '' ||
    church === '' ||
    academicStat === '' ||
    status === ''
  );
};

  const fileInputRef = React.useRef();

  return (
    <Card sx={{ maxWidth: "100wh", padding: '1em' }}>
      <CardContent>
        <Typography variant="h4" component="div" gutterBottom>
          Edit Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField fullWidth label="Firstname" variant="outlined" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Lastname" variant="outlined" value={lastname} onChange={(e) => setLastname(e.target.value)} />
          </Grid>
          <Grid item xs={6}>
            <TextField
                  fullWidth
                  label="Church"
                  variant="outlined"
                  select
                  value={church} // set default value to 'kg'
                  onChange={(e) => {
                    console.log(e.target.value); // Add this line
                    setChurch(e.target.value);
                  }}
                  SelectProps={{ native: true }}
                >
                  <option value='None'>None</option>
                  <option value='Grace Baptist Church'>Grace Baptist Church</option>
                  <option value='Christ Baptist Church'>Christ Baptist Church</option>
                  <option value='Christ Baptist Church Albuera'>Christ Baptist Church Albuera</option>
              </TextField>
          </Grid> 
          
          <Grid item xs={6}>
            <TextField
                  fullWidth
                  label="Academic Status"
                  variant="outlined"
                  select
                  value={academicStat} // set default value to 'kg'
                  onChange={(e) => {
                    console.log(e.target.value); // Add this line
                    setAcademicStat(e.target.value);
                  }}
                  SelectProps={{ native: true }}
                >
                  <option value='Elementary'>Elementary</option>
                  <option value='HighSchool'>HighSchool</option>
                  <option value='College'>College</option>
                  <option value='Young Prof'>Young Prof</option>
              </TextField>
          </Grid> 

          <Grid item xs={6}>
              <TextField
                fullWidth
                label="Status"
                variant="outlined"
                select
                value={status}
                onChange={(e) => {
                  console.log(e.target.value); // Add this line
                  setStatus(e.target.value);
                }}
                SelectProps={{ native: true }}
              >
                <option value='Unpaid'>Unpaid</option>
                <option value='Paid'>Paid</option>
              </TextField>
          </Grid> 
          
         
          
          <Grid item xs={12}>
            <Button 
              variant="contained" 
              sx={{ bgcolor: 'success.dark' }} 
              fullWidth 
              onClick={handleAddAttendee}
              disabled={loading || isRegisterDisabled()} // Add this line
            >
              {loading ? 'Uploading...' : 'Edit'}
            </Button>
          </Grid>
        </Grid>

        {showPopup && (
        <Snackbar open={showPopup} autoHideDuration={6000} onClose={hidePopup}>
          <Alert onClose={hidePopup} severity={messageType} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      )}
      </CardContent>
    </Card>
  );
}