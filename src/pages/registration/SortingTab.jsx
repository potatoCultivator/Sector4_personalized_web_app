import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { alpha } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect } from 'react';

// project import
import AttendeesTable from './AttendeesTable';
import MainCard from 'components/MainCard';
import Search from './Search';
import { fetchAllRows } from '../backend';
import { set } from 'lodash';

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

export default function SortingTab() {
  const [value, setValue] = React.useState(0);
  const [paid, setPaid] = React.useState(0);
  const [unpaid, setUnpaid] = React.useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // useEffect(() => {
  //   fetchAllRows().then((data) => {
  //     console.log(data);
  //   });
  // }, []);

  useEffect(() => {
    fetchAllRows().then((data) => {
      const counts = data.reduce((acc, curr) => {
        if (curr.stat === "Paid") {
          acc.zeros += 1;
          setPaid(acc.zeros);
        } else if (curr.stat === "Unpaid") {
          acc.ones += 1;
          setUnpaid(acc.ones);
        }
        return acc;
      }, { zeros: 0, ones: 0 });

      console.log(counts);
    });
  }, []);

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
                    label={paid + unpaid}
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
                    label={paid}
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
                label={unpaid}
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
            <AttendeesTable attendeesStat={'All'}/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
            <AttendeesTable attendeesStat={'Paid'}/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <AttendeesTable attendeesStat={'Unpaid'}/>
        </CustomTabPanel>
      </MainCard>
    </Box>
  );
}
