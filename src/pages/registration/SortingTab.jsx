import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { alpha } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// project import
import AttendeesTable from './AttendeesTable';
import MainCard from 'components/MainCard';
import Search from './Search';
import SampleTable1 from './sampleTable1';
import SampleTable2 from './sampleTable2';

function createData(tracking_no,church ,name, acadStat, stat, regStat) {
  return { tracking_no,church ,name, acadStat, stat, regStat };
}

const rows = [
  createData(1, 'Christ Baptist Mission Gacat', 'Jana Gian Mazo', 'College', 0, 2),
  createData(2, 'Christ Baptist Mission Gacat', 'Shanelle Mazo', 'HighSchool', 0, 1),
  createData(3, 'Christ Baptist Mission Gacat', 'Geselle Joy Mazo', 'HighSchool', 1, 1),
  createData(4, 'Christ Baptist Mission Gacat', 'Cyrome Caraan', 'HighSchool', 1, 1),
  createData(5, 'Christ Baptist Mission Gacat', 'Janelle Divya Mazo', 'HighSchool', 1, 1),
  createData(6, 'Christ Baptist Mission San Agustin', 'Maria Regina Carmelotes', 'HighSchool', 0, 1),
  createData(7, 'Christ Baptist Mission San Agustin', 'Harzelynne Torres', 'HighSchool', 0, 2),
  createData(8, 'Christ Baptist Mission San Agustin', 'Joel John Argallon', 'HighSchool', 0, 1),
  createData(9, 'Christ Baptist Mission San Agustin', 'Riclyn Argallon', 'College', 1, 2),
  createData(10, 'Christ Baptist Mission San Agustin', 'Randall John Argallon', 'HighSchool', 0, 1)
];

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function SortingTab({ rows }) {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <MainCard>
      <Box >
        <Tabs value={value} onChange={handleChange} TabIndicatorProps={{ style: { backgroundColor: 'black' } }}>

          <Tab 
          disableRipple
          sx={{
            '&.Mui-selected': {
              backgroundColor: 'transparent',
              color: 'inherit',
            },
            '&:hover': {
              backgroundColor: 'transparent', // or any color you want
              color: 'inherit', // or any color you want
            },
          }}
          label={
            <Box display="flex" alignItems="center" gap={1}>
                <span style={{ color: value === 0? 'black' : theme.palette.secondary.main }}>All</span>
                <Chip 
                    label="10" 
                    size="small" 
                    style={{
                        backgroundColor: value === 0 ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.2),
                        color: value === 0 ? 'white': theme.palette.primary.dark 
                    }}
                />
            </Box>
            }  
          {...a11yProps(0)} />

          <Tab 
          disableRipple
          label={
            <Box display="flex" alignItems="center" gap={1}>
                <span style={{ color: value === 1 ? 'black' : theme.palette.secondary.main }}>Paid</span>
                <Chip 
                    label="6" 
                    size="small" 
                    style={{
                        backgroundColor: value === 1 ? theme.palette.success.main : alpha(theme.palette.success.main, 0.2),
                        color: value === 1 ? 'white': theme.palette.success.dark 
                    }}
                />
            </Box>
            }  
          {...a11yProps(1)} />

          <Tab 
          disableRipple
          label={
            <Box display="flex" alignItems="center" gap={1}>
                <span style={{ color: value === 2 ? 'black' : theme.palette.secondary.main }}>Unpaid</span>
                <Chip 
                label="4" 
                size="small" 
                style={{
                    backgroundColor: value === 2 ? theme.palette.error.main : alpha(theme.palette.error.main, 0.2),
                    color: value === 2 ? 'white': theme.palette.error.dark 
                }}
            />
            </Box>
            }  
          {...a11yProps(2)} />

          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Search />
            </Box>
          )}
        </Tabs>
        {isMobile && (
           <Search />
          )}
      </Box>
        </MainCard>
      <MainCard>
        <CustomTabPanel value={value} index={0}>
            <AttendeesTable attendeesStat={2}/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
            <AttendeesTable attendeesStat={0}/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <AttendeesTable attendeesStat={1}/>
        </CustomTabPanel>
      </MainCard>
    </Box>
  );
}
