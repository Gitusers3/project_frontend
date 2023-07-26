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





const filter = createFilterOptions();
// const mock = new MockAdapter(axios);

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px'
}));

const Staffform = () => {
  const [state, setState] = useState({ date: new Date() });

  const [role,setRole]=useState([])


  useEffect(()=>{
  
    url.get('http://localhost:4000/api/role/view').then((res)=>{
        console.log(res.data)
        setRole(res.data)
  
        
        

    }).catch((err)=>{
        alert(err)

    })
},[])



  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== state.password) return false;

      return true;
    });
    return () => ValidatorForm.removeValidationRule('isPasswordMatch');
  }, [state.password]);

  const handleSubmit = (event) => {
    event.preventDefault()
   
  
  };





  const handleChange = (event) => {
    event.persist();

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
              errorMessages={['this field is required']}
              label="Employee Code "
              validators={['required', 'minStringLength: 4', 'maxStringLength: 9']}
            />
             <TextField
              type="text"
              name="staff_name"
              id="standard-basic"
              onChange={handleChange}
              errorMessages={['this field is required']}
              label="Employee Name "
              validators={['required', 'minStringLength: 4', 'maxStringLength: 9']}
            />

           
           <InputLabel id="demo-simple-select-label">Date Of Joining </InputLabel>
            <TextField
              type="date"
              name="doj"
              label=""
              onChange={handleChange}
              validators={['required']}
              errorMessages={['this field is required']}
            />
            
            <FormControl fullWidth style={{marginBottom:"20px"}}>
              <InputLabel id="demo-simple-select-label">Employee Type </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="employee_type"
                label="Choose Division"
                // value={selectedDivision}
              
              >
                
                  <MenuItem value="Full Time">Full Time</MenuItem>
                  <MenuItem value="Full Time">Part Time</MenuItem>
               
              </Select>
            </FormControl>
            <FormControl fullWidth >
              <InputLabel id="demo-simple-select-label">Employee Category </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="employee_category"
                label="Choose Division"
                // value={selectedDivision}
            
              >
                
                  <MenuItem value="Permanent">Permanent</MenuItem>
                  <MenuItem value="Temporry">Temporary</MenuItem>
               
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{mt:2}} >
              <InputLabel id="demo-simple-select-label">Employee Role </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="employee_category"
                label="Employee Role"
                // value={selectedDivision}
            
              >
                {role.map((item)=>{
                    return(
                     <MenuItem value={item._id}>{item.role}</MenuItem>
                    )


                })}
                
              
               
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
            <InputLabel id="demo-simple-select-label">Employee Profile Image</InputLabel>
            <TextField
              sx={{ mb: 4 }}
              type="file"
              name="profile_img"
              label=""
              onChange={handleChange}
              errorMessages={['this field is required']}
              validators={['required', 'minStringLength:16', 'maxStringLength: 16']}
            />


            
           
            {/* <TextField
              sx={{ mb: 4 }}
              type="text"
              name="creditCard"
              label="Place"
              onChange={handleChange}
              errorMessages={['this field is required']}
              validators={['required', 'minStringLength:16', 'maxStringLength: 16']}
            /> */}

            <InputLabel id="demo-simple-select-label">Designation</InputLabel>
            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="designation"
              label="Designation"
              onChange={handleChange}
              errorMessages={['this field is required']}
              validators={['required', 'minStringLength:16', 'maxStringLength: 16']}
            />
            <InputLabel id="demo-simple-select-label">Gardian Name</InputLabel>
            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="gname"
              label="Gardian Name"
              onChange={handleChange}
              errorMessages={['this field is required']}
              validators={['required', 'minStringLength:16', 'maxStringLength: 16']}
            />
            <TextField
              sx={{ mb: 4 }}
              type="number"
              name="relationship"
              label="Relationship"
              onChange={handleChange}
              errorMessages={['this field is required']}
              validators={['required', 'minStringLength:16', 'maxStringLength: 16']}
            />
            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="gcontact"
              label="Gaurdian Conatct"
              onChange={handleChange}
              errorMessages={['this field is required']}
              validators={['required', 'minStringLength:16', 'maxStringLength: 16']}
            />
            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="taddress"
              label="Contact Address"
              onChange={handleChange}
              errorMessages={['this field is required']}
              validators={['required', 'minStringLength:16', 'maxStringLength: 16']}
            />
            <InputLabel id="demo-simple-select-label">Permanent Address</InputLabel>
            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="paddress"
              label="Address"
              onChange={handleChange}
              errorMessages={['this field is required']}
              validators={['required', 'minStringLength:16', 'maxStringLength: 16']}
            />
             <TextField
              type="number"
              name="contact_no1"
              label="Contact Nubmer1( whatsapp )"
              onChange={handleChange}
              validators={['required']}
              errorMessages={['this field is required']}
            />
            <TextField
              type="number"
              name="contact_no2"
              label="Contact Nubmer2"
              onChange={handleChange}
              validators={['required']}
              errorMessages={['this field is required']}
            />
            <TextField
              sx={{ mb: 4 }}
              type="number"
              name="email"
              label="Email"
              onChange={handleChange}
              errorMessages={['this field is required']}
              validators={['required', 'minStringLength:16', 'maxStringLength: 16']}
            />
            <TextField
              sx={{ mb: 4 }}
              type="date"
              name="dob"
              label="DOB"
              onChange={handleChange}
              errorMessages={['this field is required']}
              validators={['required', 'minStringLength:16', 'maxStringLength: 16']}
            />
           
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="number"
              name="blood_group"
              label="Bood Group"
              onChange={handleChange}
              validators={['required']}
              errorMessages={['this field is required']}
            />
            <FormControl fullWidth style={{marginBottom:"20px"}}>
              <InputLabel id="demo-simple-select-label">Gender </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="gender"
                label="Choose Division"
                // value={selectedDivision}
               
              >
                
                  <MenuItem value="Full Time">Male</MenuItem>
                  <MenuItem value="Full Time">Female</MenuItem>
               
              </Select>
            </FormControl>
            <TextField
              name="marital_status"
              type="email"
              label="Marital Status"
              onChange={handleChange}
              validators={['required']}
              errorMessages={['this field is required']}
            />
            <TextField
              type="text"
              name="pan_no"
              // onChange={handleChange}
              label="Pan Number"
              validators={['required', 'isPasswordMatch']}
              errorMessages={['this field is required', "password didn't match"]}
            />
            <TextField
              type="text"
              name="adhar_no"
              // onChange={handleChange}
              label="Adhar Number"
              validators={['required', 'isPasswordMatch']}
              errorMessages={['this field is required', "password didn't match"]}
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
