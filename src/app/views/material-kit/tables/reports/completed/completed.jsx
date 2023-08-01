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
import { useState, useEffect } from 'react';
import CompletedStudents from './completedStudents';
import CompletedStudentsByCollege from './CompletedStudentsByCollege';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
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

const Completed = (propss) => {
  console.log(propss);
  const div = propss?.props === 'QueueTech Solution';
  console.log(propss.props + 'props');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [fdate, setFdate] = useState('');
  const [tdate, setTdate] = useState('');
  const [college, setCollege] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState('');
  const [result, setResult] = useState(true);
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
  const handleSelectChangeofCollege = (event) => {
    const selectedValue = event.target.value;
    setSelectedCollege(selectedValue);
    localStorage.setItem('CompletedCollege', selectedValue);
  };
  useEffect(() => {
    const storedResult = localStorage.getItem('CompletedGetResult');
    if (storedResult !== null) {
      setResult(storedResult === 'true');
    }
  }, []);
  const getResult = () => {
    setResult((prevState) => {
      const updatedResult = !prevState;
      localStorage.setItem('CompletedGetResult', updatedResult.toString());
      return updatedResult;
    });
  };

  useEffect(() => {
    // Make the API request
    axios
      .get('http://localhost:4000/api/college/view')
      .then((res) => {
        console.log(res.data);
        setCollege(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // alert(selectedDivision);
  }, [selectedCollege]);

  useEffect(() => {
    const storedCollege = localStorage.getItem('CompletedCollege');
    if (storedCollege) {
      setSelectedCollege(storedCollege);
    }
  }, []);
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
          {div && (
            <>
              <Grid container sx={{ marginTop: '10px' }} spacing={3}>
                <Grid item xs={10}>
                  <Select
                    fullWidth={true}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="c_id"
                    value={selectedCollege}
                    onChange={handleSelectChangeofCollege}
                    label="Choose College"
                  >
                    <MenuItem hidden value="">
                      Select a college
                    </MenuItem>
                    {college.map((clg) => (
                      <MenuItem key={clg._id} value={clg.c_name}>
                        {clg.c_name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    onClick={() => getResult()}
                    fullWidth
                    sx={{ padding: '13px' }}
                    variant="outlined"
                  >
                    Get result
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </form>
      </Box>
      <Box sx={{ marginTop: '20px' }}>
        {/* <MdbTable fromDate={fdate} toDate={tdate} divprop={propss} /> */}
        {/* Use result directly as it's a boolean */}
        {result === false ? (
          <>
            <button onClick={getResult} children className="btn btn-danger">
              Go Back
            </button>
            <CompletedStudentsByCollege
              fromDate={fdate}
              toDate={tdate}
              divprop={propss}
              clg={selectedCollege}
            />
          </>
        ) : (
          <CompletedStudents
            fromDate={fdate}
            toDate={tdate}
            divprop={propss}
            clg={selectedCollege}
          />
        )}
      </Box>
    </div>
  );
};

export default Completed;
