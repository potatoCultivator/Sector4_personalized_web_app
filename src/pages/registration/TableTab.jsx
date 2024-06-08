import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function TableTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{
          '& .MuiTabs-indicator': {
            height: '3px',
          },
        }}
        variant="fullWidth"
      >
        <Tab label="All" />
        <Tab label="Paid" />
        <Tab label="Unpaid" />
      </Tabs>
      {/* Your table goes here */}
    </>
  );
}