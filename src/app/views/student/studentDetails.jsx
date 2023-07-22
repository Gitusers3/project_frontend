import React, { useState } from 'react';
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

export default function StudentsAll({ studentD, setStudent }) {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }));
  const [on, setOn] = useState(true);
  const IconList = ['edit'];
  const IconList1 = ['check'];
  const [check] = IconList1;

  const handleIconClick = () => {
    setOn((prevState) => !prevState);
  };

  const imageUrl =
    'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=';

  const updateStudent = (e) => {
    setStudent({ ...studentD, [e.target.name]: e.target.value });
    console.log(studentD);
  };
  const SubmitForm = (e) => {
    alert('a');
  };

  return (
    <div>
      <form onSubmit={SubmitForm}>
        <div>
          <Item>
            <div style={{ float: 'right' }}>
              <Tooltip title={on ? 'Check Icon' : 'Edit Icon'}>
                <Icon fontSize="large" onClick={handleIconClick}>
                  {on && <span style={{ marginTop: '2px' }}>edit</span>}

                  <span style={{ marginTop: '2px' }}>check</span>
                </Icon>
              </Tooltip>
              {!on && (
                <Tooltip title={on ? 'Check Icon' : 'Edit Icon'}>
                  <Icon fontSize="large" onClick={handleIconClick}>
                    <span style={{ marginTop: '4px' }}>clear</span>
                  </Icon>
                </Tooltip>
              )}
            </div>
            <img src={imageUrl} alt="avatar" width="150" height="150" style={{ marginLeft: 8 }} />
            <div className="text-center">
              <h5 className="text-black text-center">{studentD?.student_name}</h5>
              {/* <TextField
              id="standard-basic"
              value={studentD?.student_name}
              variant="standard"
              disabled={on}
              name="student_name"
              onChange={updateStudent}
            /> */}
              {/* <TextField
              id="standard-basic"
              name="student_name"
              value={studentD?.student_name}
              onChange={updateStudent}
              variant="standard"
              disabled={on}
            /> */}
            </div>
          </Item>
          <div style={{ marginTop: '2px' }}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow sx={{ margin: '5px' }}>
                    <TableCell
                      className="text-black fw-bolder"
                      component="th"
                      scope="row"
                      sx={{ padding: '16px' }}
                    >
                      Syudent Name
                    </TableCell>
                    <TableCell
                      className="text-black fw-bolder"
                      align="start"
                      sx={{ padding: '16px' }}
                    >
                      <TextField
                        id="standard-basic"
                        name="student_name"
                        value={studentD?.student_name}
                        onChange={updateStudent}
                        variant="standard"
                        disabled={on}
                      />
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
                      className="text-black fw-bolder"
                      component="th"
                      scope="row"
                      sx={{ padding: '16px' }}
                    >
                      Office Register Number
                    </TableCell>
                    <TableCell
                      className="text-black fw-bolder"
                      align="start"
                      sx={{ padding: '16px' }}
                    >
                      <TextField
                        id="standard-basic"
                        name="our_reg_no"
                        value={studentD?.our_reg_no}
                        onChange={updateStudent}
                        variant="standard"
                        disabled={on}
                      />
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
                      className="text-black fw-bolder"
                      component="th"
                      scope="row"
                      sx={{ padding: '16px' }}
                    >
                      Date of Admission
                    </TableCell>
                    <TableCell
                      className="text-black fw-bolder"
                      align="start"
                      sx={{ padding: '16px' }}
                    >
                      <TextField
                        id="standard-basic"
                        name="date_of_admission"
                        value={studentD?.date_of_admission}
                        onChange={updateStudent}
                        variant="standard"
                        disabled={on}
                      />
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
                      className="text-primary fw-bolder"
                      component="th"
                      scope="row"
                      sx={{ padding: '16px' }}
                    >
                      Temporary Address
                    </TableCell>
                    <TableCell
                      className="text-primary fw-bolder"
                      align="start"
                      sx={{ padding: '16px' }}
                    >
                      <TextField
                        id="standard-basic"
                        name="t_address"
                        value={studentD?.t_address}
                        onChange={updateStudent}
                        variant="standard"
                        disabled={on}
                      />
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
                      className="text-primary fw-bolder"
                      component="th"
                      scope="row"
                      sx={{ padding: '16px' }}
                    >
                      Pincode
                    </TableCell>
                    <TableCell
                      className="text-primary fw-bolder"
                      align="start"
                      sx={{ padding: '16px' }}
                    >
                      <TextField
                        id="standard-basic"
                        name="t_pincode"
                        value={studentD?.t_pincode}
                        onChange={updateStudent}
                        variant="standard"
                        disabled={on}
                      />
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
                      className="text-primary fw-bolder"
                      component="th"
                      scope="row"
                      sx={{ padding: '16px' }}
                    >
                      District
                    </TableCell>
                    <TableCell
                      className="text-primary fw-bolder"
                      align="start"
                      sx={{ padding: '16px' }}
                    >
                      <TextField
                        id="standard-basic"
                        name="t_district"
                        value={studentD?.t_district}
                        onChange={updateStudent}
                        variant="standard"
                        disabled={on}
                      />
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
                      className="text-primary fw-bolder"
                      component="th"
                      scope="row"
                      sx={{ padding: '16px' }}
                    >
                      State
                    </TableCell>
                    <TableCell
                      className="text-primary fw-bolder"
                      align="start"
                      sx={{ padding: '16px' }}
                    >
                      <TextField
                        id="standard-basic"
                        name="t_state"
                        value={studentD?.t_state}
                        onChange={updateStudent}
                        variant="standard"
                        disabled={on}
                      />
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
                      sx={{ padding: '16px', color: '#8e24aa' }}
                    >
                      Permanent Address
                    </TableCell>
                    <TableCell
                      className="fw-bolder"
                      align="start"
                      sx={{ padding: '16px', color: '#8e24aa' }}
                    >
                      <TextField
                        id="standard-basic"
                        name="p_address"
                        value={studentD?.p_address}
                        onChange={updateStudent}
                        variant="standard"
                        disabled={on}
                      />
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
                      sx={{ padding: '16px', color: '#8e24aa' }}
                    >
                      Pincode
                    </TableCell>
                    <TableCell
                      className="fw-bolder"
                      align="start"
                      sx={{ padding: '16px', color: '#8e24aa' }}
                    >
                      <TextField
                        id="standard-basic"
                        name="p_pincode"
                        value={studentD?.p_pincode}
                        onChange={updateStudent}
                        variant="standard"
                        disabled={on}
                      />
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
                      sx={{ padding: '16px', color: '#8e24aa' }}
                    >
                      District
                    </TableCell>
                    <TableCell
                      className="fw-bolder"
                      align="start"
                      sx={{ padding: '16px', color: '#8e24aa' }}
                    >
                      <TextField
                        id="standard-basic"
                        name="p_district"
                        value={studentD?.p_district}
                        onChange={updateStudent}
                        variant="standard"
                        disabled={on}
                      />
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
                      sx={{ padding: '16px', color: '#8e24aa' }}
                    >
                      State
                    </TableCell>
                    <TableCell
                      className="fw-bolder"
                      align="start"
                      sx={{ padding: '16px', color: '#8e24aa' }}
                    >
                      <TextField
                        id="standard-basic"
                        name="p_state"
                        value={studentD?.p_state}
                        onChange={updateStudent}
                        variant="standard"
                        disabled={on}
                      />
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
                      Email ID
                    </TableCell>
                    <TableCell className="fw-bolder" align="start" sx={{ padding: '16px' }}>
                      <TextField
                        id="standard-basic"
                        name="email_id"
                        value={studentD?.email_id}
                        onChange={updateStudent}
                        variant="standard"
                        disabled={on}
                      />
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
                      Contact Number(1)
                    </TableCell>
                    <TableCell className="fw-bolder" align="start" sx={{ padding: '16px' }}>
                      <TextField
                        id="standard-basic"
                        name="contact_no1"
                        value={studentD?.contact_no1}
                        onChange={updateStudent}
                        variant="standard"
                        disabled={on}
                      />
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
                      WhatsApp
                    </TableCell>
                    <TableCell className="fw-bolder" align="start" sx={{ padding: '16px' }}>
                      <TextField
                        id="standard-basic"
                        name="whatsup"
                        value={studentD?.whatsup}
                        onChange={updateStudent}
                        variant="standard"
                        disabled={on}
                      />
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
                      Parent's/Guardian's
                    </TableCell>
                    <TableCell className="fw-bolder" align="start" sx={{ padding: '16px' }}>
                      <TextField
                        id="standard-basic"
                        name="parent_contact"
                        value={studentD?.parent_contact}
                        onChange={updateStudent}
                        variant="standard"
                        disabled={on}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </form>
    </div>
  );
}
