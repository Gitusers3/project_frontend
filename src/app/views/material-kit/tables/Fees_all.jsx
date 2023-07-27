import React from 'react'


import {
    Box,
    Icon,
    IconButton,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Grid,
    TextField,
    Button
  } from '@mui/material';
  import DeleteIcon from '@mui/icons-material/Delete';
  import SendIcon from '@mui/icons-material/Send';
  import Stack from '@mui/material/Stack';
  import InputLabel from '@mui/material/InputLabel';
  import { useState } from 'react';
  import Form from '../forms/TForm';
  import MdbTable from './mdbTable';
  import Fees_table from './Fees_table';
  
  const StyledTable = styled(Table)(() => ({
    whiteSpace: 'pre',
    '& thead': {
      '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } }
    },
    '& tbody': {
      '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } }
    }
  }));
  
  const subscribarList = [
    {
      name: 'john doe',
      date: '18 january, 2019',
      amount: 1000,
      status: 'close',
      status: 'close',
      company: 'ABC Fintech LTD.'
    }
  ];
  

export default function Fees_all(propss) {
    console.log(propss);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [fdate, setFdate] = useState('');
    const [tdate, setTdate] = useState('');
    const Submit = (e) => {
      e.preventDefault();
      // alert(fdate);
      // alert(tdate);
    };
  
    const handleFromDateChange = (e) => {
      setFdate(e.target.value);
    };
  
    const handleToDateChange = (e) => {
      setTdate(e.target.value);
    };
    const handleChangePage = (_, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  return (
    <div>
      <Box width="100%" overflow="auto">
        <form onSubmit={Submit}>
          <Grid container spacing={3}>
            <Grid item xs={5}>
              <InputLabel id="from-date-label">From</InputLabel>
              <TextField
                required
                type="date"
                id="from-date"
                fullWidth
                value={fdate}
                onChange={handleFromDateChange}
              />
            </Grid>
            <Grid item xs={5}>
              <InputLabel id="to-date-label">To</InputLabel>
              <TextField
                required
                type="date"
                id="to-date"
                fullWidth
                value={tdate}
                onChange={handleToDateChange}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                type="submit"
                sx={{ padding: '15px', marginTop: '20px' }}
                variant="contained"
                fullWidth
                endIcon={<SendIcon />}
              ></Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Box sx={{ marginTop: '20px' }}>
        <Fees_table fromDate={fdate} toDate={tdate} divprop={propss} />
      </Box>
    </div>
  )
}
