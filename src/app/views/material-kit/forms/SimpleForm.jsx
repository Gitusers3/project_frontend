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

const filter = createFilterOptions();
// const mock = new MockAdapter(axios);

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px'
}));

const SimpleForm = () => {
  const [state, setState] = useState({ date: new Date() });

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== state.password) return false;

      return true;
    });
    return () => ValidatorForm.removeValidationRule('isPasswordMatch');
  }, [state.password]);

  const handleSubmit = (event) => {
    // console.log("submitted");
    // console.log(event);
  };

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
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
  const [intern, setIntern] = useState('');
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

  const handleSelectChange = (event) => {
    setSelectedCourse(event.target.value);
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

  useEffect(() => {
    // Make the API request
    axios
      .get('http://localhost:4000/api/division/view_division')
      .then((res) => {
        // console.log(res.data);
        setDivsn(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
    alert('a');
    axios
      .post('http://localhost:4000/api/college/insert', { c_name: college, c_address: address })
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
  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <h2 className="text-center">Personal Details</h2>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="reg"
              id="standard-basic"
              onChange={handleChange}
              errorMessages={['this field is required']}
              label="Register Number (for Office)"
              validators={['required', 'minStringLength: 4', 'maxStringLength: 9']}
            />
            <TextField
              type="date"
              name="firstName"
              label=""
              onChange={handleChange}
              validators={['required']}
              errorMessages={['this field is required']}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Choose Division</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Choose Division"
                value={selectedDivision}
                onChange={handleSelectChangeofDivision}
              >
                {divsn.map((division) => (
                  <MenuItem key={division._id} value={division.d_name}>
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
            <InputLabel id="demo-simple-select-label">Student Image</InputLabel>
            <TextField
              sx={{ mb: 4 }}
              type="file"
              name="creditCard"
              label=""
              onChange={handleChange}
              errorMessages={['this field is required']}
              validators={['required', 'minStringLength:16', 'maxStringLength: 16']}
            />
            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="creditCard"
              label="Name of the Student"
              onChange={handleChange}
              errorMessages={['this field is required']}
              validators={['required', 'minStringLength:16', 'maxStringLength: 16']}
            />
            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="creditCard"
              label="Place"
              onChange={handleChange}
              errorMessages={['this field is required']}
              validators={['required', 'minStringLength:16', 'maxStringLength: 16']}
            />
            <InputLabel id="demo-simple-select-label">Temporary Address</InputLabel>
            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="creditCard"
              label="Address"
              onChange={handleChange}
              errorMessages={['this field is required']}
              validators={['required', 'minStringLength:16', 'maxStringLength: 16']}
            />
            <TextField
              sx={{ mb: 4 }}
              type="number"
              name="creditCard"
              label="Pincode"
              onChange={handleChange}
              errorMessages={['this field is required']}
              validators={['required', 'minStringLength:16', 'maxStringLength: 16']}
            />
            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="creditCard"
              label="District"
              onChange={handleChange}
              errorMessages={['this field is required']}
              validators={['required', 'minStringLength:16', 'maxStringLength: 16']}
            />
            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="creditCard"
              label="State"
              onChange={handleChange}
              errorMessages={['this field is required']}
              validators={['required', 'minStringLength:16', 'maxStringLength: 16']}
            />
            <InputLabel id="demo-simple-select-label">Permanent Address</InputLabel>
            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="creditCard"
              label="Address"
              onChange={handleChange}
              errorMessages={['this field is required']}
              validators={['required', 'minStringLength:16', 'maxStringLength: 16']}
            />
            <TextField
              sx={{ mb: 4 }}
              type="number"
              name="creditCard"
              label="Pincode"
              onChange={handleChange}
              errorMessages={['this field is required']}
              validators={['required', 'minStringLength:16', 'maxStringLength: 16']}
            />
            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="creditCard"
              label="District"
              onChange={handleChange}
              errorMessages={['this field is required']}
              validators={['required', 'minStringLength:16', 'maxStringLength: 16']}
            />
            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="creditCard"
              label="State"
              onChange={handleChange}
              errorMessages={['this field is required']}
              validators={['required', 'minStringLength:16', 'maxStringLength: 16']}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="number"
              name="mobile"
              label="Contact Nubmer1( whatsapp )"
              onChange={handleChange}
              validators={['required']}
              errorMessages={['this field is required']}
            />
            <TextField
              type="number"
              name="mobile"
              label="Contact Nubmer2"
              onChange={handleChange}
              validators={['required']}
              errorMessages={['this field is required']}
            />
            <TextField
              name="Email"
              type="email"
              label="Email ID"
              onChange={handleChange}
              validators={['required']}
              errorMessages={['this field is required']}
            />
            <TextField
              type="text"
              name="confirmPassword"
              // onChange={handleChange}
              label="Parent/Guardian's Name"
              validators={['required', 'isPasswordMatch']}
              errorMessages={['this field is required', "password didn't match"]}
            />
            <TextField
              type="text"
              name="confirmPassword"
              // onChange={handleChange}
              label="Relationsship"
              validators={['required', 'isPasswordMatch']}
              errorMessages={['this field is required', "password didn't match"]}
            />
            <TextField
              type="number"
              name="mobile"
              label="Parent's/guardian's Contact "
              onChange={handleChange}
              validators={['required']}
              errorMessages={['this field is required']}
            />

            {/* <RadioGroup
              row
              name="gender"
              sx={{ mb: 2 }}
              onChange={handleChange}
            >
              <FormControlLabel
                value="Male"
                label="Male"
                labelPlacement="end"
                control={<Radio color="secondary" />}
              />

              <FormControlLabel
                value="Female"
                label="Female"
                labelPlacement="end"
                control={<Radio color="secondary" />}
              />

              <FormControlLabel
                value="Others"
                label="Others"
                labelPlacement="end"
                control={<Radio color="secondary" />}
              />
            </RadioGroup>

            <FormControlLabel
              control={<Checkbox />}
              label="I have read and agree to the terms of service."
            /> */}
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
                      college: `Add "${params.inputValue}"`,
                      address: ''
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
                renderOption={(props, option) => (
                  <li {...props}>
                    {option.c_name} {option.c_address}
                  </li>
                )}
                freeSolo
                renderInput={(params) => <TextField {...params} label="Choose College" />}
              />

              <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmitDialog}>
                  <DialogTitle>Add a new College</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Did you miss any college in our list? Please, add it!
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      value={dialogValue.c_name}
                      onChange={(e) => setCollege(e.target.value)}
                      label="College name"
                      type="text"
                      variant="standard"
                    />
                    <TextField
                      margin="dense"
                      id="address"
                      value={dialogValue.c_name}
                      onChange={(e) => setAddress(e.target.value)}
                      label="Address"
                      type="text"
                      variant="standard"
                    />
                    {/* <TextField
                      margin="dense"
                      id="address"
                      value={dialogValue.address}
                      onChange={(e) => setAddress(e.target.value)}
                      label="address"
                      type="text"
                      variant="standard"
                    /> */}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Add</Button>
                  </DialogActions>
                </form>
              </Dialog>
              <TextField
                sx={{ mb: 4 }}
                type="text"
                name="creditCard"
                label="Register number (University)"
                onChange={handleChange}
                errorMessages={['this field is required']}
                validators={['required', 'minStringLength:16', 'maxStringLength: 16']}
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Course</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Choose Course"
                  value={selectedCourse}
                  onChange={handleSelectChange}
                >
                  {courses.map((course) => (
                    <MenuItem key={course._id} value={course.cou_name}>
                      {course.cou_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                sx={{ mt: 2 }}
                type="text"
                name="creditCard"
                label="Stream"
                onChange={handleChange}
                errorMessages={['this field is required']}
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Semester</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Select Semester"
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
        {selectedDivision === 'QueueTech Solution' ? (
          <Grid container className="d-flex" spacing={10}>
            <Grid item xs={6} id="queuetech-project">
              <h4 sx={{ fontWeight: 'bolder' }} className="text-center">
                <b>Project Details</b>
              </h4>
              <FormControlLabel control={<Checkbox />} label="Existing Project" />
              <TextField
                type="text"
                name="ptitle"
                id="standard-basic"
                onChange={handleChange}
                errorMessages={['this field is required']}
                label="Project Title"
              />

              {/* <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Choose Division</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Choose Division"
                onChange={handleSelectChange}
              >
                <MenuItem value="Queue Tech">Queue Tech</MenuItem>
                <MenuItem value="Cognitive">Cognitive</MenuItem>
                <MenuItem value="CodeLab">CodeLab</MenuItem>
              </Select>
            </FormControl> */}
              <TextField
                type="text"
                name="username"
                id="standard-basic"
                onChange={handleChange}
                errorMessages={['this field is required']}
                label="Project Company"
                validators={['required', 'minStringLength: 4', 'maxStringLength: 9']}
              />
              <TextField
                type="text"
                name="username"
                id="standard-basic"
                onChange={handleChange}
                errorMessages={['this field is required']}
                label="Project Client Name"
              />
              <TextField
                type="text"
                name="username"
                id="standard-basic"
                onChange={handleChange}
                errorMessages={['this field is required']}
                label="Project Client Contact number"
              />
              <TextField
                type="text"
                name="username"
                id="standard-basic"
                onChange={handleChange}
                errorMessages={['this field is required']}
                label="Project Client Email ID"
              />

              <TextField
                sx={{ mb: 4 }}
                type="text"
                name="creditCard"
                label="Project Decription"
                onChange={handleChange}
                errorMessages={['this field is required']}
              />
              <TextField
                sx={{ mb: 4 }}
                type="text"
                name="creditCard"
                label="Frontend Programming Language"
                onChange={handleChange}
                errorMessages={['this field is required']}
              />
              <TextField
                sx={{ mb: 4 }}
                type="text"
                name="creditCard"
                label="Backend Programming Language"
                onChange={handleChange}
                errorMessages={['this field is required']}
              />
              <TextField
                sx={{ mb: 4 }}
                type="text"
                name="creditCard"
                label="Fees"
                onChange={handleChange}
                errorMessages={['this field is required']}
              />
            </Grid>
            <Grid item xs={6} id="queuetech-project">
              <h4 sx={{ fontWeight: 'bolder' }} className="text-center">
                <b>Schedule Details</b>
              </h4>
              <InputLabel id="demo-simple-select-label">From</InputLabel>
              <TextField
                type="date"
                name="ptitle"
                id="standard-basic"
                onChange={handleChange}
                errorMessages={['this field is required']}
              />
              <InputLabel id="demo-simple-select-label">To</InputLabel>
              <TextField
                type="date"
                name="ptitle"
                id="standard-basic"
                onChange={handleChange}
                errorMessages={['this field is required']}
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
                          <Input />
                        </Box>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Box component="span" sx={{ p: 2 }}>
                          <Input />
                        </Box>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Box component="span" sx={{ p: 2 }}>
                          <Input />
                        </Box>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <Box component="span" sx={{ p: 2 }}>
                          <Input />
                        </Box>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Box component="span" sx={{ p: 2 }}>
                          <Input />
                        </Box>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Box component="span" sx={{ p: 2 }}>
                          <Input />
                        </Box>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <Box component="span" sx={{ p: 2 }}>
                          <Input />
                        </Box>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Box component="span" sx={{ p: 2 }}>
                          <Input />
                        </Box>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Box component="span" sx={{ p: 2 }}>
                          <Input />
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Grid>
              </Table>
            </Grid>
          </Grid>
        ) : selectedDivision === 'Cognitive Solution' ? (
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
                  label="Choose Internship"
                  onChange={handleSelectChange4}
                >
                  <MenuItem value="PHP Web Development">PHP Web Development</MenuItem>
                  <MenuItem value="Python Web Development">Python Web Development</MenuItem>
                  <MenuItem value="MERN Stack">MERN Stack</MenuItem>
                  <MenuItem value="Data Science">Data Science</MenuItem>
                  <MenuItem value="Machine Learning">Machine Learning</MenuItem>
                  <MenuItem value="Artificial Intelligence">Artificial Intelligence</MenuItem>
                </Select>
              </FormControl>
              <InputLabel sx={{ mt: '5px' }} id="demo-simple-select-label">
                Starting date
              </InputLabel>
              <TextField
                type="date"
                name="ptitle"
                id="standard-basic"
                onChange={handleChange}
                errorMessages={['this field is required']}
              />
              <InputLabel id="demo-simple-select-label">End Date</InputLabel>
              <TextField
                type="date"
                name="ptitle"
                id="standard-basic"
                onChange={handleChange}
                errorMessages={['this field is required']}
              />
              <InputLabel sx={{ mt: '5px' }} id="demo-simple-select-label">
                Time : From
              </InputLabel>
              <TextField
                type="time"
                name="ptitle"
                id="standard-basic"
                onChange={handleChange}
                errorMessages={['this field is required']}
              />
              <InputLabel id="demo-simple-select-label">Time : To</InputLabel>
              <TextField
                type="time"
                name="ptitle"
                id="standard-basic"
                onChange={handleChange}
                errorMessages={['this field is required']}
              />

              <TextField
                sx={{ mb: 4 }}
                type="number"
                name="creditCard"
                label="Number of days "
                onChange={handleChange}
                errorMessages={['this field is required']}
              />
              <TextField
                sx={{ mb: 4 }}
                type="number"
                name="creditCard"
                label="Number of hours"
                onChange={handleChange}
                errorMessages={['this field is required']}
              />
              <TextField
                sx={{ mb: 4 }}
                type="number"
                name="creditCard"
                label="Fees"
                onChange={handleChange}
                errorMessages={['this field is required']}
              />
            </Grid>
          </Grid>
        ) : selectedDivision === 'CodeLab Systems' ? (
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
                  label="Choose Internship"
                  onChange={handleSelectChange4}
                >
                  <MenuItem value="PHP Web Development">PHP Web Development</MenuItem>
                  <MenuItem value="Python Web Development">Python Web Development</MenuItem>
                  <MenuItem value="MERN Stack">MERN Stack</MenuItem>
                  <MenuItem value="Data Science">Data Science</MenuItem>
                  <MenuItem value="Machine Learning">Machine Learning</MenuItem>
                  <MenuItem value="Artificial Intelligence">Artificial Intelligence</MenuItem>
                </Select>
              </FormControl>
              <TextField
                sx={{ mt: 4 }}
                type="text"
                name="creditCard"
                label="Project title"
                onChange={handleChange}
                errorMessages={['this field is required']}
              />
              <InputLabel sx={{ mt: '5px' }} id="demo-simple-select-label">
                Starting date
              </InputLabel>
              <TextField
                type="date"
                name="ptitle"
                id="standard-basic"
                onChange={handleChange}
                errorMessages={['this field is required']}
              />
              <InputLabel id="demo-simple-select-label">End Date</InputLabel>
              <TextField
                type="date"
                name="ptitle"
                id="standard-basic"
                onChange={handleChange}
                errorMessages={['this field is required']}
              />
              <InputLabel sx={{ mt: '5px' }} id="demo-simple-select-label">
                Time : From
              </InputLabel>
              <TextField
                type="time"
                name="ptitle"
                id="standard-basic"
                onChange={handleChange}
                errorMessages={['this field is required']}
              />
              <InputLabel id="demo-simple-select-label">Time : To</InputLabel>
              <TextField
                type="time"
                name="ptitle"
                id="standard-basic"
                onChange={handleChange}
                errorMessages={['this field is required']}
              />

              <TextField
                sx={{ mb: 4 }}
                type="number"
                name="creditCard"
                label="Number of days "
                onChange={handleChange}
                errorMessages={['this field is required']}
              />
              <TextField
                sx={{ mb: 4 }}
                type="number"
                name="creditCard"
                label="Number of hours"
                onChange={handleChange}
                errorMessages={['this field is required']}
              />
              <TextField
                sx={{ mb: 4 }}
                type="text"
                name="creditCard"
                label="Fees"
                onChange={handleChange}
                errorMessages={['this field is required']}
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
