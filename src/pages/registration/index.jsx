// material-ui
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';
import RegistrationCrud from './registrationCrud'
import AttendeesTable from './AttendeesTable';
import AddRegistrant from './addRegistrant'

// ==============================|| SAMPLE PAGE ||============================== //

export default function Registration() {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: 2.25 }}>
        <Typography variant="h5">Registration</Typography>
      </Grid>
      <Grid item xs={12}>
        <MainCard title="Registration">
            <Typography variant="body2">
                And ibutang ngari kay ang total na kwarta sa tanan ga register og ang total na kwarta na church na nag register haha
            </Typography>
        
        </MainCard>
      </Grid>
    
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Current Attendees</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <AttendeesTable />
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Registration Card</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          {/* <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="text.secondary">
                This Fellowship Statistics
              </Typography>
              <Typography variant="h3">$7,650</Typography>
            </Stack>
          </Box> */}
          <AddRegistrant />
        </MainCard>
      </Grid>
      
      
    </Grid>
  );
}
