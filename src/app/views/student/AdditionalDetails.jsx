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
import { useParams } from 'react-router-dom';

export default function AdditionalDetails({
  studentD,
  setStudent,
  project_details,
  setProject_details,
  currentCollege,
  currentCourse,
  setCurrentCollege,
  setCurrentCourse,
  academicDetails,
  internshipDetails
}) {
  console.log(currentCollege, currentCourse);
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
  const chanegTechie = () => {
    setTOn((prevOn) => !prevOn);
  };
  const [pon, setPOn] = useState(true);
  const changeProject = () => {
    setPOn((prevOn) => !prevOn);
  };
  const [clon, setCol] = useState(true);
  const changeCollege = () => {
    setCol((prevOn) => !prevOn);
  };
  const [acon1, setAcOn1] = useState(true);
  const [acon2, setAcOn2] = useState(true);
  const [acon3, setAcOn3] = useState(true);
  const [acon4, setAcOn4] = useState(true);
  const [techie, setTechie] = useState([]);
  const [project, setProject] = useState({});
  const [selectedTechie, setSelectedTechie] = useState('');
  const handleSelectChangeofTechie = (event) => {
    setSelectedTechie(event.target.value);
  };
  useEffect(() => {
    // Make the API request
    async function fetchdata(){
      const token=await localStorage.getItem("accessToken")
      axios
      .get('http://localhost:4000/api/staff/view',{headers:{"authToken":token}})
      .then((res) => {
        console.log(res.data);
        setTechie(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    fetchdata()
   
    // alert(selectedDivision);
  }, [selectedTechie]);

  const filteredTechie = techie.filter((t) => t.designation === 'Software Developer');
  console.log('fil', filteredTechie);
  console.log('tech', techie);

  const [updatedproject, setUpdatedProject] = useState({
    project_title: '',
    project_client_name: '',
    project_client_address: '',
    project_client_contact: '',
    project_client_email: '',
    project_description: '',
    front_end_pro_lang: '',
    backend_pro_lang: '',
    duration: ''
  });
  const [updatedCurrentCollege, setUpdatedCurrentCollege] = useState({
    c_name: ''
  });
  const [updatedCurrentCourse, setUpdatedCurrentCourse] = useState({
    cou_name: ''
  });
  const handleProject = (e) => {
    setProject_details({ ...project_details, [e.target.name]: e.target.value });
    setUpdatedProject({ ...updatedproject, [e.target.name]: e.target.value });
  };
  const changecourse = (e) => {
    setCurrentCourse({ ...currentCourse, [e.target.name]: e.target.value });
    setUpdatedCurrentCourse({ ...updatedCurrentCourse, [e.target.name]: e.target.value });
  };
  console.log(updatedCurrentCourse);
  const changecollege = (e) => {
    setCurrentCollege({ ...currentCollege, [e.target.name]: e.target.value });
    setUpdatedCurrentCollege({ ...updatedCurrentCollege, [e.target.name]: e.target.value });
  };
  console.log(updatedCurrentCollege);

  let param = useParams();
  console.log('Id in student details : ' + param.id);
  const UpdateProject = (e) => {
    const project_title = updatedproject.project_title;
    const project_client_name = updatedproject.project_client_name;
    const project_client_address = updatedproject.project_client_address;
    const project_client_contact = updatedproject.project_client_contact;
    const project_client_email = updatedproject.project_client_email;
    const project_description = updatedproject.project_description;
    const front_end_pro_lang = updatedproject.front_end_pro_lang;
    const backend_pro_lang = updatedproject.backend_pro_lang;
    const duration = updatedproject.duration;
    axios
      .put(`http://localhost:4000/api/student/update/${param.id}`, {
        project_title,
        project_client_name,
        project_client_address,
        project_client_contact,
        project_client_email,
        project_description,
        front_end_pro_lang,
        backend_pro_lang,
        duration
      })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
        }
      })
      .catch((err) => {
        alert(' Error !');
        console.log(err);
      });
  };
  const UpdateCollegeDetails = (e) => {
    const c_name = updatedCurrentCollege.c_name;
    const cou_name = updatedCurrentCourse.cou_name;
    axios
      .put(`http://localhost:4000/api/student/update/${param.id}`, {
        c_name,
        cou_name
      })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
        }
      })
      .catch((err) => {
        alert(' Error !');
        console.log(err);
      });
  };

  return (
    <div>
      <div>
        <Item sx={{ height: '60px' }}>
          <div style={{ float: 'right' }}>
            <Tooltip title={ton ? 'Check Icon' : 'Edit Icon'}>
              <Icon fontSize="large" onClick={chanegTechie}>
                {ton && <span style={{ marginTop: '2px' }}>edit</span>}

                <span style={{ marginTop: '2px' }}>check</span>
              </Icon>
            </Tooltip>
            {!ton && (
              <Tooltip title={ton ? 'Check Icon' : 'Edit Icon'}>
                <Icon fontSize="large" onClick={chanegTechie}>
                  <span style={{ marginTop: '4px' }}>clear</span>
                </Icon>
              </Tooltip>
            )}
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
                        disabled={ton}
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
        <Item sx={{ marginTop: '2px', height: '50px' }}>
          <div style={{ float: 'right' }}>
            <Tooltip title={pon ? 'Check Icon' : 'Edit Icon'}>
              <Icon fontSize="large" onClick={changeProject}>
                {pon && <span style={{ marginTop: '2px' }}>edit</span>}

                <span onClick={() => UpdateProject()} style={{ marginTop: '2px' }}>
                  check
                </span>
              </Icon>
            </Tooltip>
            {!pon && (
              <Tooltip title={pon ? 'Check Icon' : 'Edit Icon'}>
                <Icon fontSize="large" onClick={changeProject}>
                  <span style={{ marginTop: '4px' }}>clear</span>
                </Icon>
              </Tooltip>
            )}
          </div>
          <h6 className="text-start text-black fw-bolder">Project</h6>
        </Item>
        <>
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
                    <TableCell className="text-black" align="start" sx={{ padding: '10px' }}>
                      <TextField
                        id="standard-basic"
                        value={project_details?.project_title}
                        variant="standard"
                        disabled={pon}
                        name="project_title"
                        onChange={handleProject}
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
                      className="text-black"
                      component="th"
                      scope="row"
                      sx={{ padding: '16px' }}
                    >
                      Project Client
                    </TableCell>
                    <TableCell className="text-black" align="start" sx={{ padding: '16px' }}>
                      <TextField
                        id="standard-basic"
                        value={project_details?.project_client_name}
                        variant="standard"
                        name="project_client_name"
                        onChange={handleProject}
                        disabled={pon}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div style={{ marginTop: '2px' }}>
            {/* <TableContainer component={Paper}>
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
                    <TextField id="standard-basic" value={project_details?.client_name}  variant="standard" disabled={pon} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer> */}
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
                      <TextField
                        id="standard-basic"
                        value={project_details?.project_client_contact}
                        variant="standard"
                        name="project_client_contact"
                        onChange={handleProject}
                        disabled={pon}
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
                      className="text-black"
                      component="th"
                      scope="row"
                      sx={{ padding: '16px' }}
                    >
                      Client Email ID
                    </TableCell>
                    <TableCell className="text-black" align="start" sx={{ padding: '16px' }}>
                      <TextField
                        id="standard-basic"
                        value={project_details?.project_client_email}
                        variant="standard"
                        disabled={pon}
                        name="project_client_email"
                        onChange={handleProject}
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
                      Frontend Language
                    </TableCell>
                    <TableCell className="fw-bolder" align="start" sx={{ padding: '16px' }}>
                      <TextField
                        id="standard-basic"
                        value={project_details?.front_end_pro_lang}
                        variant="standard"
                        disabled={pon}
                        name="front_end_pro_lang"
                        onChange={handleProject}
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
                      Backend Language
                    </TableCell>
                    <TableCell className="fw-bolder" align="start" sx={{ padding: '16px' }}>
                      <TextField
                        id="standard-basic"
                        value={project_details?.backend_pro_lang}
                        name="backend_pro_lang"
                        onChange={handleProject}
                        variant="standard"
                        disabled={pon}
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
                      Project Description
                    </TableCell>
                    <TableCell className="fw-bolder" align="start" sx={{ padding: '16px' }}>
                      <TextField
                        id="standard-basic"
                        value={project_details?.project_description}
                        name="project_description"
                        onChange={handleProject}
                        variant="standard"
                        disabled={pon}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
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
                      <Tooltip title={clon ? 'Check Icon' : 'Edit Icon'}>
                        <Icon fontSize="large" onClick={changeCollege}>
                          {clon && <span style={{ marginTop: '2px' }}>edit</span>}

                          <span onClick={() => UpdateCollegeDetails()} style={{ marginTop: '2px' }}>
                            check
                          </span>
                        </Icon>
                      </Tooltip>
                      {!clon && (
                        <Tooltip title={clon ? 'Check Icon' : 'Edit Icon'}>
                          <Icon fontSize="large" onClick={changeCollege}>
                            <span style={{ marginTop: '4px' }}>clear</span>
                          </Icon>
                        </Tooltip>
                      )}
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
                      name="cou_name"
                      value={currentCourse?.cou_name}
                      onChange={changecourse}
                      variant="standard"
                      disabled={clon}
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
                      name="c_name"
                      value={currentCollege?.c_name}
                      onChange={changecollege}
                      variant="standard"
                      disabled={clon}
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
                      //  value={item.course}
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
                      //  value={item.college}
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
                      //  value={item.percentage}
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
                      // value={academicDetails[1].course}
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
                      // value={academicDetails[1].collge}
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
                      // value={academicDetails[1].percentage}
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
                      // value={academicDetails[2].course}
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
                      // value={academicDetails[2].college}
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
                      // value={academicDetails[2].percentage}
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
