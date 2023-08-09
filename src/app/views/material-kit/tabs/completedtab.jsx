import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Completed from '../tables/reports/completed/completed';
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function LabTabs() {
  const [value, setValue] = useState('all');
  const [divsn1, setDivsn1] = useState(['All']);
  const [divsn, setDivsn] = useState([]);

  useEffect(() => {
    // Make the API request
    async function FetchData(){
      const token=await localStorage.getItem("accessToken")
      axios
      .get('http://localhost:4000/api/division/view_division',{headers:{"auth-token":token}})
      .then((res) => {
        console.log(res.data);
        setDivsn(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
   FetchData()
  }, []);
  const handleChange = (event, newValue) => {
    // alert(newValue);
    setValue(newValue);
    localStorage.setItem('CompletedTabs', newValue);
  };
  useEffect(() => {
    const storedValue = localStorage.getItem('CompletedTabs');
    if (storedValue) {
      setValue(storedValue);
    }
  }, []);
  const allDataTab = {
    label: 'All',
    value: 'all',
    component: <Completed divsn1={divsn1} />
  };

  const tabsData = [
    allDataTab,
    ...divsn.map((division) => ({
      label: division.d_name,
      value: division.d_name,
      component: <Completed props={division.d_name} />
    }))
  ];

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {tabsData.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </TabList>
        </Box>

        {tabsData.map((tab) => (
          <TabPanel key={tab.value} value={tab.value}>
            {tab.component}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
}
