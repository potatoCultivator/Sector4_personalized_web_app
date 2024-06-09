import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import { alpha } from '@mui/system';
import { useTheme } from '@mui/material/styles';

// project import
import Search from './Search';
import AttendeesTable from './AttendeesTable';
import MainCard from 'components/MainCard';
import SampleTable1 from './sampleTable1';
import SampleTable2 from './sampleTable2';

export default function LabTabs() {
  const [value, setValue] = React.useState('1');
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', pl:3}}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab 
            disableRipple
            label={
            <Box display="flex" alignItems="center" gap={1}>
                <span style={{ color: value === "1" ? 'black' : theme.palette.secondary.main }}>All</span>
                <Chip 
                    label="10" 
                    size="small" 
                    style={{
                        backgroundColor: value === "1" ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.2),
                        color: value === "1" ? 'white': theme.palette.primary.dark 
                    }}
                />
            </Box>
            } 
            value="1" 
        />
        <Tab 
        disableRipple
        label={
        <Box display="flex" alignItems="center" gap={1}>
            <span style={{ color: value === "2" ? 'black' : theme.palette.secondary.main }}>Paid</span>
            <Chip 
                label="6" 
                size="small" 
                style={{
                    backgroundColor: value === "2" ? theme.palette.success.main : alpha(theme.palette.success.main, 0.2),
                    color: value === "2" ? 'white': theme.palette.success.dark 
                }}
            />
        </Box>
        } 
        value="2" 
        />
        <Tab 
            disableRipple
            label={
            <Box display="flex" alignItems="center" gap={1}>
                <span style={{ color: value === "3" ? 'black' : theme.palette.secondary.main }}>Unpaid</span>
                <Chip 
                label="4" 
                size="small" 
                style={{
                    backgroundColor: value === "3" ? theme.palette.error.main : alpha(theme.palette.error.main, 0.2),
                    color: value === "3" ? 'white': theme.palette.error.dark 
                }}
            />
            </Box>
            } 
            value="3" 
        />

            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Search />
            </Box>
          </TabList>
        </Box>
        <TabPanel value="1">
           <Paper>
             <AttendeesTable />
           </Paper>
        </TabPanel>
        <TabPanel value="2">
          <Paper>
            <SampleTable1 />
          </Paper>
        </TabPanel>
        <TabPanel value="3">
          <Paper>
            <SampleTable2 />
          </Paper>
        </TabPanel>
      </TabContext>
    </Box>
  );
}

// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';

// // project import
// import Search from './Search';
// import AttendeesTable from './AttendeesTable';
// import MainCard from 'components/MainCard';

// function CustomTabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//     </div>
//   );
// }

// CustomTabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

// export default function BasicTabs() {
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Box sx={{ width: '100%'}}>
//       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//         <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
//             <Tab label="Item One" {...a11yProps(0)} />
//             <Tab label="Item Two" {...a11yProps(1)} />
//             <Tab label="Item Three" {...a11yProps(2)} />
//         </Tabs>
//       </Box>

//       <CustomTabPanel value={value} index={0}>
//            <AttendeesTable />
//         </CustomTabPanel>
//         <CustomTabPanel value={value} index={1}>
//             Item Two
//         </CustomTabPanel>
//         <CustomTabPanel value={value} index={2}>
//             Item Three
//         </CustomTabPanel>
//     </Box>
//   );
// }

