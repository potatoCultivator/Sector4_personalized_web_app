// material-ui
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

// project import
import MainCard from 'components/MainCard';
import RegistrationCrud from './registrationCrud'
import AttendeesTable from './AttendeesTable';
import AddRegistrant from './addRegistrant'
import Search from './Search';
import TableTab from './TableTab';
import SortingTab from './SortingTab';
import SampleTab from './sampleTab';

// ==============================|| SAMPLE PAGE ||============================== //

export default function Registration() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

      {/* row 2 */}
      <Grid item xs={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Current Attendees</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <SortingTab />
      </Grid>

      {/* row 2 */}
      <Grid item xs={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Current Attendees</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <SampleTab />
      </Grid>
      {/* row 2 */}
      <Grid item xs={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Current Attendees</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard>
          <AttendeesTable />
        </MainCard>
        
      </Grid>

      {/* row 3 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Current Attendees</Typography>
          </Grid>
          <Grid item />
        </Grid>
        
        <SortingTab />

      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Registration Card</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <AddRegistrant />
        </MainCard>
      </Grid>
      
      
    </Grid>
  );
}
