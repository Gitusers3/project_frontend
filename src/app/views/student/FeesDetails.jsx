import React, { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import { Box, styled } from '@mui/material/styles'; // Import from '@mui/material/styles'
import { useTheme } from '@mui/material/styles'; // Import from '@mui/material/styles'
import { Icon, Tooltip } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Breadcrumb, SimpleCard } from 'app/components';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SimpleForm from '../material-kit/forms/SimpleForm';
import StepperForm from '../material-kit/forms/StepperForm';
import Sidenav from '../../components/Sidenav';
import AreaChart from '../charts/echarts/AreaChart';
import ComparisonChart from '../charts/echarts/ComparisonChart';
import DoughnutChart from '../charts/echarts/Doughnut';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Checkbox from '@mui/material/Checkbox';
import { green } from '@mui/material/colors';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

const GreenCheckbox = styled(Checkbox)(({ theme }) => ({
  color: green[400],
  '&$checked': { color: green[600] }
}));

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: {
    margin: '16px'
  },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '16px'
    }
  }
}));

export default function FeesDetails({ studentD, setStudent }) {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#dcc715' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }));
  const IconList = ['edit'];
  const imageUrl =
    'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=';

  const [on, setOn] = useState(true);
  const theme = useTheme();

  // Rest of your component code...
  const [state, setState] = useState({
    checkedA: false,
    checkedB: false,
    checkedD: false
  });

  useEffect(() => {
    // Update the state based on studentD.all_status
    if (studentD.all_status === 'Ongoing') {
      setState((prevState) => ({
        ...prevState,
        checkedA: true
      }));
    } else if (studentD.all_status === 'Completed') {
      setState((prevState) => ({
        ...prevState,
        checkedB: true
      }));
    } else if (studentD.all_status === 'Discontinued') {
      setState((prevState) => ({
        ...prevState,
        checkedD: true
      }));
    }
  }, [studentD.all_status]);

  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.checked });
  };
  return (
    <div>
      <div>
        <Item>
          <h6 className="text-start text-black fw-bolder">Fees</h6>
        </Item>

        <div style={{ marginTop: '2px' }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow sx={{ margin: '5px' }}>
                  <TableCell
                    className="text-black"
                    component="th"
                    scope="row"
                    sx={{ padding: '16px' }}
                  >
                    Total Fees
                  </TableCell>
                  <TableCell className="text-black" align="start" sx={{ padding: '16px' }}>
                    <span>{studentD.fees}/-</span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div style={{ marginTop: '2px' }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow sx={{ margin: '5px' }}>
                  <TableCell
                    className="text-black"
                    component="th"
                    scope="row"
                    sx={{ padding: '16px' }}
                  >
                    Paid Fees
                  </TableCell>
                  <TableCell className="text-black" align="start" sx={{ padding: '16px' }}>
                    <span className="fw-bolder text-success">6000/-</span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div style={{ marginTop: '2px' }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow sx={{ margin: '5px' }}>
                  <TableCell
                    className="text-black"
                    component="th"
                    scope="row"
                    sx={{ padding: '16px' }}
                  >
                    Pending Fees
                  </TableCell>
                  <TableCell className="text-black" align="start" sx={{ padding: '16px' }}>
                    <span className="text-danger fw-bolder">6000/-</span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <SimpleCard>
          <DoughnutChart
            height="300px"
            color={[
              theme.palette.primary.dark,
              theme.palette.primary.main,
              theme.palette.primary.light
            ]}
          />
        </SimpleCard>

        <div style={{ marginTop: '2px' }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow sx={{ margin: '5px' }}>
                  <TableCell
                    className="fw-bolder text-start"
                    component="th"
                    scope="row"
                    sx={{ padding: '16px', fontSize: '14px', textTransform: 'uppercase' }}
                  >
                    Student Status
                  </TableCell>
                </TableRow>
                <TableRow sx={{ margin: '5px' }}>
                  <TableCell
                    className="fw-bolder text-start"
                    component="th"
                    scope="row"
                    sx={{ padding: '16px', fontSize: '16px', textTransform: 'uppercase' }}
                  >
                    <FormControlLabel
                      control={
                        <GreenCheckbox
                          color="default"
                          checked={state.checkedA}
                          onChange={handleChange('checkedA')}
                          value="checkedA"
                        />
                      }
                      label="On Going"
                    />
                  </TableCell>
                </TableRow>
                <TableRow sx={{ margin: '5px' }}>
                  <TableCell
                    className="fw-bolder text-start"
                    component="th"
                    scope="row"
                    sx={{ padding: '16px', fontSize: '16px', textTransform: 'uppercase' }}
                  >
                    <FormControlLabel
                      control={
                        <GreenCheckbox
                          color="default"
                          checked={state.checkedB}
                          onChange={handleChange('checkedB')}
                          value="checkedB"
                        />
                      }
                      label="Completed"
                    />
                  </TableCell>
                </TableRow>
                {/* Add more rows for other checkboxes */}
                <TableRow sx={{ margin: '5px' }}>
                  <TableCell
                    className="fw-bolder text-start"
                    component="th"
                    scope="row"
                    sx={{ padding: '16px', fontSize: '16px', textTransform: 'uppercase' }}
                  >
                    <FormControlLabel
                      control={
                        <GreenCheckbox
                          color="default"
                          checked={state.checkedD}
                          onChange={handleChange('checkedD')}
                          value="checkedD"
                        />
                      }
                      label="Discontinued"
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
