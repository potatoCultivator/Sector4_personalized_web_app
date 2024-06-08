import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import { alpha } from '@mui/system';
import { useTheme, createTheme, ThemeProvider } from '@mui/material/styles';

// project import
import Search from './Search';
import AttendeesTable from './AttendeesTable';
import MainCard from 'components/MainCard';

export default function LabTabs() {
  const [value, setValue] = React.useState('1');
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

//   const indicatorTheme = createTheme({
//     components: {
//       MuiTabs: {
//         styleOverrides: {
//           indicator: {
//             backgroundColor: 'black', // Change this to your desired color
//           },
//         },
//       },
//     },
//   });
const indicatorTheme = createTheme({
    components: {
      MuiTabs: {
        styleOverrides: {
          indicator: {
            backgroundColor: value === '1' ? theme.palette.primary.main : value === '2' ? theme.palette.success.main : theme.palette.error.main,
          },
        },
      },
    },
});

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <ThemeProvider theme={indicatorTheme}>
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', pl:3}}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab 
            disableRipple
            label={
            <Box display="flex" alignItems="center" gap={1}>
                <span style={{ color: value === "1" ? 'black' : theme.palette.secondary.main }}>All</span>
                <Chip 
                    label="0" 
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
                label="0" 
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
                label="0" 
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
            <AttendeesTable />
        </TabPanel>
        <TabPanel value="3">
            <AttendeesTable />
        </TabPanel>
      </TabContext>
      </ThemeProvider>
    </Box>
  );
}
