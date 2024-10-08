import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Box } from '@mui/material';
import LoginTab from './LoginCard';
import SignupTab from './SignupCard';
import Copyright from './../Generic/Copyright';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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

export default function LoginTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <Box sx={{ flex: 1, width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Login" {...a11yProps(0)} />
            <Tab label="Signup" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <LoginTab />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <SignupTab setValue={setValue} />
        </CustomTabPanel>
      </Box>
      <Copyright sx={{ mt: 'auto', mb: 2 }} />
    </Box>
  );
}
