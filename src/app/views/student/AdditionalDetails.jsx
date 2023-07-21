import React from 'react';
import { Stack } from '@mui/material';
import { Box, styled } from '@mui/material';
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
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Span } from 'app/components/Typography';
import { useEffect, useState } from 'react';
export default function AdditionalDetails({ studentD, setStudent }) {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }));
  const IconList = ['edit'];
  const imageUrl =
    'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=';

  const [ton, setTOn] = useState(true);
  const [pon, setPOn] = useState(true);
  const [acon1, setAcOn1] = useState(true);
  const [acon2, setAcOn2] = useState(true);
  const [acon3, setAcOn3] = useState(true);
  const [acon4, setAcOn4] = useState(true);
  const [techie, setTechie] = useState([]);
  const [selectedTechie, setSelectedTechie] = useState('');
  const handleSelectChangeofTechie = (event) => {
    setSelectedTechie(event.target.value);
  };
  useEffect(() => {
    // Make the API request
    axios
      .get('http://localhost:4000/api/staff/view')
      .then((res) => {
        console.log(res.data);
        setTechie(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // alert(selectedDivision);
  }, [selectedTechie]);
  const filteredTechie = techie.filter((t) => t.designation === 'IT Operation');

  return (
    <div>
      <div>
        <Item>
          <div style={{ float: 'right' }}>
            {IconList.map((icon, key) => (
              <Tooltip title={icon} key={key}>
                <Icon fontSize="large" onClick={() => setTOn(false)}>
                  {icon}
                </Icon>
              </Tooltip>
            ))}
          </div>
          <h6 className="text-start text-black fw-bolder">Techie</h6>
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
                    Techie Name
                  </TableCell>
                  <TableCell
                    className="text-black fw-bolder"
                    align="start"
                    sx={{ padding: '16px' }}
                  >
                    <FormControl variant="standard" fullWidth>
                      <InputLabel id="demo-simple-select-label">Choose Techie</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Choose Division"
                        value={selectedTechie}
                        onChange={handleSelectChangeofTechie.bind(this)}
                      >
                        {filteredTechie.map((t) => (
                          <MenuItem key={t._id} value={t._id}>
                            {t.staff_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <Item sx={{ marginTop: '2px' }}>
          <div style={{ float: 'right' }}>
            {IconList.map((icon, key) => (
              <Tooltip title={icon} key={key}>
                <Icon fontSize="large" onClick={() => setPOn(false)}>
                  {icon}
                </Icon>
              </Tooltip>
            ))}
          </div>
          <h6 className="text-start text-black fw-bolder">Project</h6>
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
                    Project Title
                  </TableCell>
                  <TableCell className="text-black" align="start" sx={{ padding: '16px' }}>
                    <TextField id="standard-basic" value="abcd" variant="standard" disabled={pon} />
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
                    Project Company
                  </TableCell>
                  <TableCell className="text-black" align="start" sx={{ padding: '16px' }}>
                    <TextField id="standard-basic" value="abcd" variant="standard" disabled={pon} />
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
                    Client Name
                  </TableCell>
                  <TableCell className="text-black" align="start" sx={{ padding: '16px' }}>
                    <TextField id="standard-basic" value="abcd" variant="standard" disabled={pon} />
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
                    Client Contact Number
                  </TableCell>
                  <TableCell className="text-black" align="start" sx={{ padding: '16px' }}>
                    <TextField id="standard-basic" value="abcd" variant="standard" disabled={pon} />
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
                    Client Email ID
                  </TableCell>
                  <TableCell className="text-black" align="start" sx={{ padding: '16px' }}>
                    <TextField id="standard-basic" value="abcd" variant="standard" disabled={pon} />
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
                    className="fw-bolder"
                    component="th"
                    scope="row"
                    sx={{ padding: '16px' }}
                  >
                    Frontend Language
                  </TableCell>
                  <TableCell className="fw-bolder" align="start" sx={{ padding: '16px' }}>
                    <TextField id="standard-basic" value="abcd" variant="standard" disabled={pon} />
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
                    className="fw-bolder"
                    component="th"
                    scope="row"
                    sx={{ padding: '16px' }}
                  >
                    Backend Language
                  </TableCell>
                  <TableCell className="fw-bolder" align="start" sx={{ padding: '16px' }}>
                    <TextField id="standard-basic" value="abcd" variant="standard" disabled={pon} />
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
                    className="fw-bolder"
                    component="th"
                    scope="row"
                    sx={{ padding: '16px' }}
                  >
                    Project Description
                  </TableCell>
                  <TableCell className="fw-bolder" align="start" sx={{ padding: '16px' }}>
                    <TextField id="standard-basic" value="abcd" variant="standard" disabled={pon} />
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
                    className="fw-bolder text-center"
                    component="th"
                    scope="row"
                    sx={{ padding: '16px', fontSize: '16px', textTransform: 'uppercase' }}
                  >
                    Academic Details
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div style={{ marginTop: '5px' }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow className="bg-warning" sx={{ margin: '5px' }}>
                  <TableCell
                    className="fw-bolder"
                    component="th"
                    scope="row"
                    sx={{ padding: '16px' }}
                  >
                    SL No
                  </TableCell>
                  <TableCell
                    className="fw-bolder text-center"
                    align="start"
                    sx={{ padding: '16px' }}
                  >
                    1
                  </TableCell>
                  <TableCell className="fw-bolder" align="center" sx={{ padding: '16px' }}>
                    <div style={{ float: 'right' }}>
                      {IconList.map((icon, key) => (
                        <Tooltip title={icon} key={key}>
                          <Icon fontSize="large" onClick={() => setAcOn1(false)}>
                            {icon}
                          </Icon>
                        </Tooltip>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ margin: '5px' }}>
                  <TableCell
                    className="fw-bolder"
                    component="th"
                    scope="row"
                    sx={{ padding: '16px' }}
                  >
                    Course
                  </TableCell>
                  <TableCell
                    className="fw-bolder text-center"
                    align="center"
                    sx={{ padding: '16px' }}
                  >
                    -
                  </TableCell>
                  <TableCell className="fw-bolder" align="start" sx={{ padding: '16px' }}>
                    <TextField
                      id="standard-basic"
                      name="course_id"
                      value={studentD?.course_id?.cou_name}
                      variant="standard"
                      disabled={acon1}
                    />
                  </TableCell>
                </TableRow>
                <TableRow sx={{ margin: '5px' }}>
                  <TableCell
                    className="fw-bolder"
                    component="th"
                    scope="row"
                    sx={{ padding: '16px' }}
                  >
                    College
                  </TableCell>
                  <TableCell
                    className="fw-bolder text-center"
                    align="center"
                    sx={{ padding: '16px' }}
                  >
                    -
                  </TableCell>
                  <TableCell className="fw-bolder" align="start" sx={{ padding: '16px' }}>
                    <TextField
                      id="standard-basic"
                      name="college_id"
                      value={studentD?.college_id?.c_name}
                      // onChange={updateStudent}
                      variant="standard"
                      disabled={acon1}
                    />
                  </TableCell>
                </TableRow>
                <TableRow sx={{ margin: '5px' }}>
                  <TableCell
                    className="fw-bolder"
                    component="th"
                    scope="row"
                    sx={{ padding: '16px' }}
                  >
                    Percentage
                  </TableCell>
                  <TableCell
                    className="fw-bolder text-center"
                    align="center"
                    sx={{ padding: '16px' }}
                  >
                    -
                  </TableCell>
                  <TableCell className="fw-bolder" align="start" sx={{ padding: '16px' }}>
                    <TextField
                      id="standard-basic"
                      value="abcd"
                      variant="standard"
                      disabled={acon1}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div style={{ marginTop: '5px' }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow className="bg-warning" sx={{ margin: '5px' }}>
                  <TableCell
                    className="fw-bolder"
                    component="th"
                    scope="row"
                    sx={{ padding: '16px' }}
                  >
                    SL No
                  </TableCell>
                  <TableCell
                    className="fw-bolder text-center"
                    align="start"
                    sx={{ padding: '16px' }}
                  >
                    2
                  </TableCell>
                  <TableCell className="fw-bolder" align="center" sx={{ padding: '16px' }}>
                    <div style={{ float: 'right' }}>
                      {IconList.map((icon, key) => (
                        <Tooltip title={icon} key={key}>
                          <Icon fontSize="large" onClick={() => setAcOn2(false)}>
                            {icon}
                          </Icon>
                        </Tooltip>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ margin: '5px' }}>
                  <TableCell
                    className="fw-bolder"
                    component="th"
                    scope="row"
                    sx={{ padding: '16px' }}
                  >
                    Course
                  </TableCell>
                  <TableCell
                    className="fw-bolder text-center"
                    align="center"
                    sx={{ padding: '16px' }}
                  >
                    -
                  </TableCell>
                  <TableCell className="fw-bolder" align="start" sx={{ padding: '16px' }}>
                    <TextField
                      id="standard-basic"
                      value="abcd"
                      variant="standard"
                      disabled={acon2}
                    />
                  </TableCell>
                </TableRow>
                <TableRow sx={{ margin: '5px' }}>
                  <TableCell
                    className="fw-bolder"
                    component="th"
                    scope="row"
                    sx={{ padding: '16px' }}
                  >
                    College
                  </TableCell>
                  <TableCell
                    className="fw-bolder text-center"
                    align="center"
                    sx={{ padding: '16px' }}
                  >
                    -
                  </TableCell>
                  <TableCell className="fw-bolder" align="start" sx={{ padding: '16px' }}>
                    <TextField
                      id="standard-basic"
                      value="abcd"
                      variant="standard"
                      disabled={acon2}
                    />
                  </TableCell>
                </TableRow>
                <TableRow sx={{ margin: '5px' }}>
                  <TableCell
                    className="fw-bolder"
                    component="th"
                    scope="row"
                    sx={{ padding: '16px' }}
                  >
                    Percentage
                  </TableCell>
                  <TableCell
                    className="fw-bolder text-center"
                    align="center"
                    sx={{ padding: '16px' }}
                  >
                    -
                  </TableCell>
                  <TableCell className="fw-bolder" align="start" sx={{ padding: '16px' }}>
                    <TextField
                      id="standard-basic"
                      value="abcd"
                      variant="standard"
                      disabled={acon2}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div style={{ marginTop: '5px' }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow className="bg-warning" sx={{ margin: '5px' }}>
                  <TableCell
                    className="fw-bolder"
                    component="th"
                    scope="row"
                    sx={{ padding: '16px' }}
                  >
                    SL No
                  </TableCell>
                  <TableCell
                    className="fw-bolder text-center"
                    align="start"
                    sx={{ padding: '16px' }}
                  >
                    3
                  </TableCell>
                  <TableCell className="fw-bolder" align="center" sx={{ padding: '16px' }}>
                    <div style={{ float: 'right' }}>
                      {IconList.map((icon, key) => (
                        <Tooltip title={icon} key={key}>
                          <Icon fontSize="large" onClick={() => setAcOn3(false)}>
                            {icon}
                          </Icon>
                        </Tooltip>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ margin: '5px' }}>
                  <TableCell
                    className="fw-bolder"
                    component="th"
                    scope="row"
                    sx={{ padding: '16px' }}
                  >
                    Course
                  </TableCell>
                  <TableCell
                    className="fw-bolder text-center"
                    align="center"
                    sx={{ padding: '16px' }}
                  >
                    -
                  </TableCell>
                  <TableCell className="fw-bolder" align="start" sx={{ padding: '16px' }}>
                    <TextField
                      id="standard-basic"
                      value="abcd"
                      variant="standard"
                      disabled={acon3}
                    />
                  </TableCell>
                </TableRow>
                <TableRow sx={{ margin: '5px' }}>
                  <TableCell
                    className="fw-bolder"
                    component="th"
                    scope="row"
                    sx={{ padding: '16px' }}
                  >
                    College
                  </TableCell>
                  <TableCell
                    className="fw-bolder text-center"
                    align="center"
                    sx={{ padding: '16px' }}
                  >
                    -
                  </TableCell>
                  <TableCell className="fw-bolder" align="start" sx={{ padding: '16px' }}>
                    <TextField
                      id="standard-basic"
                      value="abcd"
                      variant="standard"
                      disabled={acon3}
                    />
                  </TableCell>
                </TableRow>
                <TableRow sx={{ margin: '5px' }}>
                  <TableCell
                    className="fw-bolder"
                    component="th"
                    scope="row"
                    sx={{ padding: '16px' }}
                  >
                    Percentage
                  </TableCell>
                  <TableCell
                    className="fw-bolder text-center"
                    align="center"
                    sx={{ padding: '16px' }}
                  >
                    -
                  </TableCell>
                  <TableCell className="fw-bolder" align="start" sx={{ padding: '16px' }}>
                    <TextField
                      id="standard-basic"
                      value="abcd"
                      variant="standard"
                      disabled={acon3}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div style={{ marginTop: '5px' }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow className="bg-warning" sx={{ margin: '5px' }}>
                  <TableCell
                    className="fw-bolder"
                    component="th"
                    scope="row"
                    sx={{ padding: '16px' }}
                  >
                    SL No
                  </TableCell>
                  <TableCell
                    className="fw-bolder text-center"
                    align="start"
                    sx={{ padding: '16px' }}
                  >
                    4
                  </TableCell>
                  <TableCell className="fw-bolder" align="center" sx={{ padding: '16px' }}>
                    <div style={{ float: 'right' }}>
                      {IconList.map((icon, key) => (
                        <Tooltip title={icon} key={key}>
                          <Icon fontSize="large" onClick={() => setAcOn4(false)}>
                            {icon}
                          </Icon>
                        </Tooltip>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ margin: '5px' }}>
                  <TableCell
                    className="fw-bolder"
                    component="th"
                    scope="row"
                    sx={{ padding: '16px' }}
                  >
                    Course
                  </TableCell>
                  <TableCell
                    className="fw-bolder text-center"
                    align="center"
                    sx={{ padding: '16px' }}
                  >
                    -
                  </TableCell>
                  <TableCell className="fw-bolder" align="start" sx={{ padding: '16px' }}>
                    <TextField
                      id="standard-basic"
                      value="abcd"
                      variant="standard"
                      disabled={acon4}
                    />
                  </TableCell>
                </TableRow>
                <TableRow sx={{ margin: '5px' }}>
                  <TableCell
                    className="fw-bolder"
                    component="th"
                    scope="row"
                    sx={{ padding: '16px' }}
                  >
                    College
                  </TableCell>
                  <TableCell
                    className="fw-bolder text-center"
                    align="center"
                    sx={{ padding: '16px' }}
                  >
                    -
                  </TableCell>
                  <TableCell className="fw-bolder" align="start" sx={{ padding: '16px' }}>
                    <TextField
                      id="standard-basic"
                      value="abcd"
                      variant="standard"
                      disabled={acon4}
                    />
                  </TableCell>
                </TableRow>
                <TableRow sx={{ margin: '5px' }}>
                  <TableCell
                    className="fw-bolder"
                    component="th"
                    scope="row"
                    sx={{ padding: '16px' }}
                  >
                    Percentage
                  </TableCell>
                  <TableCell
                    className="fw-bolder text-center"
                    align="center"
                    sx={{ padding: '16px' }}
                  >
                    -
                  </TableCell>
                  <TableCell className="fw-bolder" align="start" sx={{ padding: '16px' }}>
                    <TextField
                      id="standard-basic"
                      value="abcd"
                      variant="standard"
                      disabled={acon4}
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
