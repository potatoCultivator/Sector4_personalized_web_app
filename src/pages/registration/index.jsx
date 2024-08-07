// material-ui
import { useState } from 'react';
import Button from '@mui/material/Button';
import { useMediaQuery, Grid, Typography, TextField, MenuItem, Dialog } from '@mui/material';

// project import
import AddRegistrant from './addRegistrant'
import SortingTab from './SortingTab';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import ImportExportButton from './import-export-button';
import MembersList from './MembersList';
import MainCard from 'components/MainCard';


// ==============================|| SAMPLE PAGE ||============================== //

export default function Registration() {
  const [optVal, setOptVal] = useState('cbc');
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }
  const churchName = [
    {
      optVal: 'all',
      label: 'All Churches',
    },
    {
      optVal: 'cbc',
      label: 'CBC',
    },
    {
      optVal: 'cbca',
      label: 'CBC Albuera',
    },
    {
      optVal: 'cbms',
      label: 'CBM San Agustin',
    },
    {
      optVal: 'cbmg',
      label: 'CBM Gacat',
    },
  ];
  

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Registration</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Previews Budget" count="₱35,078" percentage={59.3} extra="₱35,000" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Current Fund" count="₱35,078" percentage={70.5} extra="₱8,900" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Attendees" count="18,800" percentage={27.4} isLoss color="warning" extra="1,943" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
      <AnalyticEcommerce title="Total Church Attended" count="35,078" percentage={27.4} isLoss color="warning" extra="395" />
      </Grid>

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      {/* row 2 */}
      <Grid item xs={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Previous Attendees</Typography>
          </Grid>
          <Grid item />
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
              Add Registrant
            </Button>
          </Grid>
        </Grid>
        <Grid item >
           <ImportExportButton />
        </Grid>
        <Grid container direction="row" justifyContent="space-between" spacing={2}>
          <Grid item xs={12} sm={6}>
            <MainCard>
              <MembersList />
            </MainCard>
          </Grid>
          {!isMobile && (
            <>
            <Grid item xs={12} sm={6}>
              <SortingTab />
            </Grid>
            </>
          )}
          
        </Grid>
      </Grid>
      
      {/* row 3 */}
      {isMobile && (
          <>
            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Typography variant="h5">Current Attendees</Typography>
                </Grid>
                <Grid item />
                <Grid item>
                  <TextField
                  id="standard-select-churchName"
                  size="small"
                  select
                  value={optVal}
                  onChange={(e) => setOptVal(e.target.value)}
                  sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem' } }}
                >
                  {churchName.map((option) => (
                    <MenuItem key={option.optVal} value={option.optVal}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                </Grid>
              </Grid>
              <Grid item >
                <ImportExportButton />
              </Grid>
              <SortingTab />
            </Grid>
            <Dialog open={open} onClose={handleClose}>
              <AddRegistrant />
            </Dialog>
          </>
        )}
      </Grid>
    
  );
}
