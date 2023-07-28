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
import axios, { Axios } from 'axios';
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
import { use } from 'echarts';
import url from 'global';
import { useNavigate } from 'react-router-dom';

const filter = createFilterOptions();
// const mock = new MockAdapter(axios);

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px'
}));

const Staffform = () => {
  const nav = useNavigate();
  const [state, setState] = useState({ date: new Date() });

  const [role, setRole] = useState([]);

  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [gender, setGender] = useState('');
  const [staff, setStaff] = useState({});
  const [staffdetails, setStaffdetails] = useState({});
  const [roleid, setRoleid] = useState('');
  const [designation, setDesignation] = useState('');

  const handleType = (e) => {
    setType(e.target.value);
  };

  const handleGender = (e) => {
    setGender(e.target.value);
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };
  const handledesignation = (e) => {
    setDesignation(e.target.value);
  };

const handleChange = (event) => {
  event.persist();
  setStaff({
      ...staff,
      [event.target.name]:event.target.value
  })

};


  useEffect(() => {
    url
      .get('http://localhost:4000/api/role/view')
      .then((res) => {
        console.log(res.data);
        setRole(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== state.password) return false;

      return true;
    });
    return () => ValidatorForm.removeValidationRule('isPasswordMatch');
  }, [state.password]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setStaffdetails({
   
      
        employee_type:type,
        employee_category:category,
        gname:gender,
        role_id:roleid,
        designation:designation
    })




    axios.post('http://localhost:4000/api/staff/insert',{staffdetails,staff}).then((res)=>{
        console.log(res.data)
        alert("Staff Details added Successfully")
  
    nav("/staffs")
        
  
  
      }).catch((err)=>{
        alert(err)
  
      })
      .catch((err) => {
        alert(err);
      });
  };

  console.log('sdfr', staffdetails);
  console.log('staff', staff);


  const handleDateChange = (date) => setState({ ...state, date });

  const {
    username,
    firstName,
    creditCard,
    mobile,
    password,
    confirmPassword,

    date,
    email
  } = state;

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

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <h2 className="text-center">Staff Details</h2>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="employee_code"
              id="standard-basic"
              onChange={handleChange}
              label="Employee Code"
            />
            <TextField
              type="text"
              name="staff_name"
              id="standard-basic"
              onChange={handleChange}
              label="Employee Name "
            />

            <InputLabel id="demo-simple-select-label">Date Of Joining </InputLabel>
            <TextField type="date" name="doj" label="" onChange={handleChange} />

            <FormControl fullWidth style={{ marginBottom: '20px' }}>
              <InputLabel id="demo-simple-select-label">Employee Type </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="employee_type"
                label="Choose Employee type"
                value={type}
                onChange={handleType}
              >
                <MenuItem value="Full Time">Full Time</MenuItem>
                <MenuItem value="Full Time">Part Time</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Employee Category </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="employee_category"
                label="Choose Division"
                onChange={handleCategory}
                value={category}
              >
                <MenuItem value="Permanent">Permanent</MenuItem>
                <MenuItem value="Temporry">Temporary</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="demo-simple-select-label">Employee Role </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Employee Role"
                name="role_id"
                value={roleid}
                onChange={(e) => {
                  setRoleid(e.target.value);
                }}
              >
                {role.map((item) => {
                  return <MenuItem value={item._id}>{item.role}</MenuItem>;
                })}
              </Select>
            </FormControl>

            {/* <TextField
              type="text"
              name="username"
              id="standard-basic"
              onChange={handleChange}
      
              label="Username (Min length 4, Max length 9)"
            
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
            {/* <InputLabel id="demo-simple-select-label">Employee Profile Image</InputLabel>
            <TextField
              sx={{ mb: 4 }}
              type="file"
              name="profile_img"
              label=""
              onChange={handleChange}
      
             
            /> */}

            {/* <TextField
              sx={{ mb: 4 }}
              type="text"
              name="creditCard"
              label="Place"
              onChange={handleChange}
      
             
            /> */}

            <FormControl fullWidth style={{ marginTop: '20px', marginBottom: '20px' }}>
              <InputLabel id="demo-simple-select-label">Employee Designation </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="designation"
                label="Choose Employee designation"
                value={designation}
                onChange={handledesignation}
              >
                <MenuItem value="Administartor">Administartor</MenuItem>
                <MenuItem value="HR">HR </MenuItem>
                <MenuItem value="Software Developer">Software Developer </MenuItem>
                <MenuItem value="Marketing Executive ">Marketing Executive </MenuItem>
                <MenuItem value="Accountant">Accountant </MenuItem>
              </Select>
            </FormControl>
            <InputLabel id="demo-simple-select-label">Gardian Name</InputLabel>
            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="gname"
              label="Gardian Name"
              onChange={handleChange}
            />
            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="relationship"
              label="Relationship"
              onChange={handleChange}
            />
            <TextField
              sx={{ mb: 4 }}
              type="tel"
              name="gcontact"
              label="Gaurdian Conatct"
              onChange={handleChange}
            />
            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="taddress"
              label="Contact Address"
              onChange={handleChange}
            />

            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="paddress"
              label="Address"
              onChange={handleChange}
            />
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
            <TextField
              sx={{ mb: 4 }}
              type="email"
              name="email"
              label="Email"
              onChange={handleChange}
            />
            <TextField sx={{ mb: 4 }} type="date" name="dob" label="DOB" onChange={handleChange} />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField type="text" name="blood_group" label="Bood Group" onChange={handleChange} />
            <FormControl fullWidth style={{ marginBottom: '20px' }}>
              <InputLabel id="demo-simple-select-label">Gender </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="gender"
                label="Choose Division"
                onChange={handleGender}
                value={gender}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
            <TextField
              name="marital_status"
              type="text"
              label="Marital Status"
              onChange={handleChange}
            />
            <TextField
              type="text"
              name="pan_no"
              // onChange={handleChange}
              label="Pan Number"
            />
            <TextField
              type="text"
              name="adhar_no"
              // onChange={handleChange}
              label="Adhar Number"
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
          </Grid>
        </Grid>

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

export default Staffform;
