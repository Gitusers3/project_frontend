import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import MockAdapter from 'axios-mock-adapter';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Icon,
  Radio,
  RadioGroup,
  styled
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Span } from 'app/components/Typography';
import { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Subject } from '@mui/icons-material';

const filter = createFilterOptions();
// const mock = new MockAdapter(axios);

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px'
}));

const SimpleForm = () => {
  const nav = useNavigate();
  const [state, setState] = useState({ date: new Date() });
  const [student, setStudent] = useState({ date: new Date() });
  const [ug, setUg] = useState({});
  const [puc, setPuc] = useState({});
  const [sslc, setSslc] = useState({});

  const handleUg = (e) => {
    setUg({ ...ug, [e.target.name]: e.target.value });
  };
  const handlePuc = (e) => {
    setPuc({
      ...puc,
      [e.target.name]: e.target.value
    });
  };

  const handleSslc = (e) => {
    setSslc({
      ...sslc,
      [e.target.name]: e.target.value
    });
  };

  // console.log('ug', ug);
  // console.log('sslc', sslc);
  // console.log('puc', puc);

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== state.password) return false;

      return true;
    });
    return () => ValidatorForm.removeValidationRule('isPasswordMatch');
  }, [state.password]);


  // profile picture uploading to state
  const [selectedFile, setSelectedFile] = useState(null);
  const UploadPic = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log(selectedFile);
  };

  const handleDateChange = (date) => setState({ ...state, date });

  const {
    username,
    firstName,
    creditCard,
    mobile,
    password,
    confirmPassword,
    gender,
    date,
    email
  } = state;
  const [div, setDiv] = useState('');
  const [semester, setSemester] = useState('');
  const [intern, setIntern] = useState([]);
  const [selectedInternship, setSelectedInternship] = useState('');
  const [divsn, setDivsn] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState('');
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');

  useEffect(() => {
    // Make the API request
    axios
      .get('http://localhost:4000/api/course/view')
      .then((res) => {
        console.log(res.data);
        setCourses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    // Make the API request
    axios
      .get('http://localhost:4000/api/intership/view_intership')
      .then((res) => {
        console.log(res.data);
        setIntern(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  console.log("intern",intern)

  const handleSelectChange = (event) => {
    setSelectedCourse(event.target.value);
  };
  const handleSelectInternship = (event) => {
    setSelectedInternship(event.target.value);
  };
  const handleSelectChangeofDivision = (event) => {
    setSelectedDivision(event.target.value);
  };

  useEffect(() => {
    // Make the API request
    axios
      .get('http://localhost:4000/api/division/view_division')
      .then((res) => {
        console.log(res.data);
        setDivsn(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // alert(selectedDivision);
  }, [selectedDivision]);

  // useEffect(() => {
  //   // Make the API request
  //   axios
  //     .get('http://localhost:4000/api/division/view_division')
  //     .then((res) => {
  //       // console.log(res.data);
  //       setDivsn(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const handleSelectChange3 = (event) => {
    setSemester(event.target.value);
  };
  useEffect(() => {
    if (semester !== '') {
    }
  }, [semester]);

  const handleSelectChange4 = (event) => {
    setIntern(event.target.value);
  };
  useEffect(() => {
    if (intern !== '') {
    }
  }, [intern]);

  const [disc, setDisc] = useState([]);
  const [selectedcollege, setSelectedCollege] = useState('');
  const [value, setValue] = useState(null);
  const [open, toggleOpen] = useState(false);

  const handleClose = () => {
    setDialogValue({
      college: '',
      address: ''
    });
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = useState({
    college: '',
    address: ''
  });

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/college/view')
      .then((res) => {
        setDisc(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [college, setCollege] = useState('');
  const [address, setAddress] = useState('');
  const handleSubmitDialog = (event) => {
    event.preventDefault();
    let c_name = dialogValue.college;
    let c_address = dialogValue.address;
    axios
      .post('http://localhost:4000/api/college/insert', { college: c_name, address: c_address })
      .then((res) => {
        console.log('Inserted:', res);
        if (res.data.success) {
          alert('Insertion Successful');
          console.log('Insertion Successful');
        }
      })
      .catch((err) => {
        alert(err);
        console.log('Error frontend:', err);
      });

    handleClose();
  };

  // profile picture uploading to state

  useEffect(() => {
    console.log(selectedFile); // This will log the updated value of selectedFile
  }, [selectedFile]);

  const handleChange = (event) => {
    event.persist();

    setStudent({
      ...student,
      image: selectedFile,
      division_id: selectedDivision,
      course_id: selectedCourse,
      college_id: selectedcollege,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:4000/api/student/insert', { student, ug, sslc, puc })
      .then((res) => {
        console.log(res.data);
        // alert('Student Details added Successfully');
        // nav('/student/students');
      })
      .catch((err) => {
        alert(err);
      });
  };
  

  // console.log(selectedcollege + ' selected college');

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit}>
        <h2 className="text-center">Personal Details</h2>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="reg"
              id="standard-basic"
              onChange={handleChange}
              label="Register Number (for Office)"
            />
            <TextField type="date" name="firstName" label="" onChange={handleChange} />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Choose Division</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="division_id"
                label="Choose Division"
                value={selectedDivision}
                onChange={handleSelectChangeofDivision}
              >
                {divsn.map((division) => (
                  <MenuItem key={division._id} value={division._id}>
                    {division.d_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <TextField
              type="text"
              name="username"
              id="standard-basic"
              onChange={handleChange}
              errorMessages={['this field is required']}
              label="Username (Min length 4, Max length 9)"
              validators={['required', 'minStringLength: 4', 'maxStringLength: 9']}
            /> */}
            {/* <TextField
              sx={{ marginTop: '10px' }}
              type="email"
              name="email"
              label="Email"
              onChange={handleChange}
              validators={['required', 'isEmail']}
              errorMessages={['this field is required', 'email is not valid']}
            /> */}
            <InputLabel sx={{ marginTop: '8px' }} id="demo-simple-select-label">
              Student Image
            </InputLabel>
            <TextField sx={{ mb: 4 }} type="file" name="image" label="" onChange={UploadPic} />
            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="student_name"
              label="Name of the Student"
              onChange={handleChange}
            />

            <InputLabel id="demo-simple-select-label">Temporary Address</InputLabel>
            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="creditCard"
              label="t_address"
              onChange={handleChange}
            />
            <TextField
              sx={{ mb: 4 }}
              type="number"
              name="t_pincode"
              label="Pincode"
              onChange={handleChange}
            />
            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="t_district"
              label="District"
              onChange={handleChange}
            />
            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="t_state"
              label="State"
              onChange={handleChange}
            />
            <InputLabel id="demo-simple-select-label">Permanent Address</InputLabel>
            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="p_address"
              label="Address"
              onChange={handleChange}
            />
            <TextField
              sx={{ mb: 4 }}
              type="number"
              name="p_pincode"
              label="Pincode"
              onChange={handleChange}
            />
            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="p_district"
              label="District"
              onChange={handleChange}
            />
            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="p_state"
              label="State"
              onChange={handleChange}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="number"
              name="contact_no1"
              label="Contact Nubmer1( whatsapp )"
              onChange={handleChange}
            />
            <TextField
              type="number"
              name="contact_no2"
              label="Contact Nubmer2"
              onChange={handleChange}
            />
            <TextField name="email_id" type="email" label="Email ID" onChange={handleChange} />
            <TextField
              type="text"
              name="parent_or_guardian_name"
              // onChange={handleChange}
              label="Parent/Guardian's Name"
            />
            <TextField
              type="text"
              name="relationship"
              // onChange={handleChange}
              label="Relationsship"
            />
            <TextField
              type="number"
              name="parent_contact"
              label="Parent's/guardian's Contact "
              onChange={handleChange}
            />

            <Grid fullWidth id="queuetech-college">
              <h4 sx={{ fontWeight: 'bolder' }} className="text-center">
                <b>Academic Details</b>
              </h4>
              <Autocomplete
                fullWidth
                value={value}
                onChange={(event, newValue) => {
                  if (typeof newValue === 'string') {
                    // Timeout to avoid instant validation of the dialog's form.
                    setTimeout(() => {
                      toggleOpen(true);
                      setDialogValue({
                        college: newValue,
                        address: ''
                      });
                    });
                  } else if (newValue && newValue.inputValue) {
                    toggleOpen(true);
                    setDialogValue({
                      college: newValue.inputValue,
                      address: ''
                    });
                  } else {
                    setValue(newValue);
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);

                  if (params.inputValue !== '') {
                    filtered.push({
                      inputValue: params.inputValue,
                      c_name: `Add "${params.inputValue}"`
                    });
                  }

                  return filtered;
                }}
                id="free-solo-dialog-demo"
                options={disc}
                getOptionLabel={(option) => {
                  // e.g., value selected with enter, right from the input
                  if (typeof option === 'string') {
                    return option;
                  }
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  return option.c_name;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={(props, option) => {
                  setSelectedCollege(option._id);
                  return (
                    <>
                      <li {...props}>
                        {option.c_name} {option.c_address}
                      </li>
                    </>
                  );
                }}
                freeSolo
                renderInput={(params) => <TextField {...params} label="Choose College" />}
              />

              <Dialog open={open} onClose={handleClose}>
                {/* <form> */}
                <DialogTitle>Add a new College</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Did you miss any college in our list? Please, add it!
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    value={dialogValue.college}
                    // onChange={(e) => setCollege(e.target.value)}
                    onChange={(event) =>
                      setDialogValue({
                        ...dialogValue,
                        college: event.target.value
                      })
                    }
                    label="College name"
                    type="text"
                    variant="standard"
                  />
                  <TextField
                    margin="dense"
                    id="address"
                    onChange={(event) =>
                      setDialogValue({
                        ...dialogValue,
                        address: event.target.value
                      })
                    }
                    label="Address"
                    type="text"
                    variant="standard"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleSubmitDialog} type="submit">
                    Add
                  </Button>
                </DialogActions>
                {/* </form> */}
              </Dialog>
              <TextField
                sx={{ mb: 4 }}
                type="text"
                name="university_reg_no"
                label="Register number (University)"
                onChange={handleChange}
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Course</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  name="course_id"
                  id="demo-simple-select"
                  label="Choose Course"
                  value={selectedCourse}
                  onChange={handleSelectChange}
                >
                  {courses.map((course) => (
                    <MenuItem key={course._id} value={course._id}>
                      {course.cou_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                sx={{ mt: 2 }}
                type="text"
                name="stream"
                label="Stream"
                onChange={handleChange}
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Semester</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Select Semester"
                  name="sem"
                  onChange={handleSelectChange3}
                >
                  <MenuItem value="I Semester">I Semester</MenuItem>
                  <MenuItem value="II Semester">II Semester</MenuItem>
                  <MenuItem value="III Semester">III Semester</MenuItem>
                  <MenuItem value="IV Semester">IV Semester</MenuItem>
                  <MenuItem value="V Semester">V Semester</MenuItem>
                  <MenuItem value="VI Semester">VI Semester</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        {selectedDivision === '64b63281e4c71dfecf988dda' ? (
          <Grid container className="d-flex" spacing={10}>
            <Grid item xs={6} id="queuetech-project">
              <h4 sx={{ fontWeight: 'bolder' }} className="text-center">
                <b>Project Details</b>
              </h4>
              <FormControlLabel control={<Checkbox />} label="Existing Project" />
              <TextField
                type="text"
                name="project_title"
                id="standard-basic"
                onChange={handleChange}
                label="Project Title"
              />

              <TextField
                type="text"
                name="username"
                id="standard-basic"
                onChange={handleChange}
                label="Project Company"
              />
              <TextField
                type="text"
                name="project_client_name"
                id="standard-basic"
                onChange={handleChange}
                label="Project Client Name"
              />
              <TextField
                type="text"
                name="project_client_contact"
                id="standard-basic"
                onChange={handleChange}
                label="Project Client Contact number"
              />
              <TextField
                type="text"
                name="project_client_email"
                id="standard-basic"
                onChange={handleChange}
                label="Project Client Email ID"
              />

              <TextField
                sx={{ mb: 4 }}
                type="text"
                name="project_description"
                label="Project Decription"
                onChange={handleChange}
              />
              <TextField
                sx={{ mb: 4 }}
                type="text"
                name="front_end_pro_lang"
                label="Frontend Programming Language"
                onChange={handleChange}
              />
              <TextField
                sx={{ mb: 4 }}
                type="text"
                name="backend_pro_lang"
                label="Backend Programming Language"
                onChange={handleChange}
              />
              <TextField
                sx={{ mb: 4 }}
                type="text"
                name="total_fees"
                label="Fees"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6} id="queuetech-project">
              <h4 sx={{ fontWeight: 'bolder' }} className="text-center">
                <b>Schedule Details</b>
              </h4>
              <InputLabel id="demo-simple-select-label">From</InputLabel>
              <TextField
                type="date"
                name="schedule_from"
                id="standard-basic"
                onChange={handleChange}
              />
              <InputLabel id="demo-simple-select-label">To</InputLabel>
              <TextField
                type="date"
                name="schedule_to"
                id="standard-basic"
                onChange={handleChange}
              />
              <h4 sx={{ fontWeight: 'bolder' }} className="text-center">
                <b>Academic Details</b>
              </h4>
              <Table aria-label="simple table" sx={{ border: '1px solid black', height: '30vh' }}>
                <Grid>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Course</TableCell>
                      <TableCell align="center">College</TableCell>
                      <TableCell align="center">Percentage</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <Box component="span" sx={{ p: 2 }}>
                          <Input name="ucourse" onChange={handleUg} />
                        </Box>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Box component="span" sx={{ p: 2 }}>
                          <Input name="ucollege" onChange={handleUg} />
                        </Box>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Box component="span" sx={{ p: 2 }}>
                          <Input name="upercenatge" onChange={handleUg} />
                        </Box>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <Box component="span" sx={{ p: 2 }}>
                          <Input name="pcourse" onChange={handlePuc} />
                        </Box>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Box component="span" sx={{ p: 2 }}>
                          <Input name="pcollege" onChange={handlePuc} />
                        </Box>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Box component="span" sx={{ p: 2 }}>
                          <Input name="ppercenatge" onChange={handlePuc} />
                        </Box>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <Box component="span" sx={{ p: 2 }}>
                          <Input name="scourse" onChange={handleSslc} />
                        </Box>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Box component="span" sx={{ p: 2 }}>
                          <Input name="scollege" onChange={handleSslc} />
                        </Box>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Box component="span" sx={{ p: 2 }}>
                          <Input name="spercentage" onChange={handleSslc} />
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Grid>
              </Table>
            </Grid>
          </Grid>
        ) : selectedDivision === '64b63271e4c71dfecf988dd8' ? (
          <Grid container id="cognitive" className="d-flex" spacing={10}>
            <Grid item xs={6} id="cognitive">
              <h4 sx={{ fontWeight: 'bolder' }} className="text-center">
                <b>INTERNSHIP DETAILS</b>
              </h4>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Choose Internship</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Choose Division"
                  name="internship_id"
                  value={selectedInternship.id}
                  onChange={handleSelectInternship}
                >
                  {intern.map((intern) => (
                    <MenuItem key={intern._id} value={intern._id}>
                      {intern.intership_on}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <InputLabel sx={{ mt: '5px' }} id="demo-simple-select-label">
                Starting date
              </InputLabel>
              <TextField
                type="date"
                name="start_date"
                id="standard-basic"
                onChange={handleChange}
              />
              <InputLabel id="demo-simple-select-label">End Date</InputLabel>
              <TextField type="date" name="end_date" id="standard-basic" onChange={handleChange} />
              <InputLabel sx={{ mt: '5px' }} id="demo-simple-select-label">
                Time : From
              </InputLabel>
              <TextField
                type="time"
                name="start_time"
                id="standard-basic"
                onChange={handleChange}
              />
              <InputLabel id="demo-simple-select-label">Time : To</InputLabel>
              <TextField type="time" name="end_time" id="standard-basic" onChange={handleChange} />

              <TextField
                sx={{ mb: 4 }}
                type="number"
                name="no_of_days"
                label="Number of days "
                onChange={handleChange}
              />
              <TextField
                sx={{ mb: 4 }}
                type="number"
                name="no_of_hours"
                label="Number of hours"
                onChange={handleChange}
              />
              <TextField
                sx={{ mb: 4 }}
                type="number"
                name="total_fees"
                label="Fees"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        ) : selectedDivision === '64b6328ce4c71dfecf988ddc' ? (
          <Grid container id="codeLab" className="d-flex" spacing={10}>
            <Grid item xs={6} id="codeLab">
              <h4 sx={{ fontWeight: 'bolder' }} className="text-center">
                <b>INTERNSHIP DETAILS</b>
              </h4>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Choose Internship</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="intenship_id"
                  label="Choose Internship"
                  value={selectedInternship}
                  onChange={handleSelectChange4}
                >
                  {intern.map((intern) => (
                    <MenuItem key={intern._id} value={intern._id}>
                      {intern.intership_on}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <InputLabel sx={{ mt: '5px' }} id="demo-simple-select-label">
                Starting date
              </InputLabel>
              <TextField
                type="date"
                name="start_date"
                id="standard-basic"
                onChange={handleChange}
              />
              <InputLabel id="demo-simple-select-label">End Date</InputLabel>
              <TextField type="date" name="end_date" id="standard-basic" onChange={handleChange} />
              <InputLabel sx={{ mt: '5px' }} id="demo-simple-select-label">
                Time : From
              </InputLabel>
              <TextField
                type="time"
                name="start_time"
                id="standard-basic"
                onChange={handleChange}
              />
              <InputLabel id="demo-simple-select-label">Time : To</InputLabel>
              <TextField type="time" name="end_time" id="standard-basic" onChange={handleChange} />

              <TextField
                sx={{ mb: 4 }}
                type="number"
                name="no_of_days"
                label="Number of days "
                onChange={handleChange}
              />
              <TextField
                sx={{ mb: 4 }}
                type="number"
                name="no_of_hours"
                label="Number of hours"
                onChange={handleChange}
              />
              <TextField
                sx={{ mb: 4 }}
                type="text"
                name="total_fees"
                label="Fees"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        ) : null}

        {/* project details for queuetech */}

        {/* internship details for cognitive */}

        {/* internship details for codeLab */}

        <Button fullWidth color="primary" variant="contained" type="submit">
          {/* <Icon>send</Icon> */}
          <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Submit</Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

const top100Films = [{ college: 'The Shawshank Redemption', address: 1994 }];

export default SimpleForm;
