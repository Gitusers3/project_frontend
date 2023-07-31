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

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';

const filter = createFilterOptions();
// const mock = new MockAdapter(axios);

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px'
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};
function getStyles(name, selectedTechie, theme) {
  return {
    fontWeight:
      selectedTechie.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}
const Staffform = () => {
  const theme = useTheme();

  const nav = useNavigate();
  const [division, setDivision] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState('');
  const [batch, setBatch] = useState('');
  const [finalBatch, setFinalBatch] = useState({});
  const [techie, setTechie] = useState([]);
  const [status, setStatus] = useState('Assigned');
  const [selectedTechie, setSelectedTechie] = useState([]);

  useEffect(() => {
    url
      .get('http://localhost:4000/api/division/view_division')
      .then((res) => {
        console.log(res.data);
        setDivision(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, [selectedDivision]);
  const filteredDivision = division.filter(
    (t) => t.d_name === 'Cognitive Solution' || t.d_name === 'CodeLab Systems'
  );

  const handleSelectChangeofDivision = (event) => {
    setSelectedDivision(event.target.value);
    console.log(selectedDivision + ' Division ID');
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
  console.log(selectedTechie + ' Techies');

  const filteredTechie = techie.filter((t) => t.designation === 'Software Developer');

  const handleChange1 = (event) => {
    const {
      target: { value }
    } = event;

    // Get the selected techies as an array of objects with _id and staff_name properties
    const selectedTechiesWithNames = value.map((id) => {
      const staff = filteredTechie.find((tech) => tech._id === id);
      return staff ? { _id: staff._id, staff_name: staff.staff_name } : null;
    });

    setSelectedTechie(selectedTechiesWithNames);
    console.log(selectedTechiesWithNames); // Selected techies with names and IDs
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const a = {
      batch,
      d_id: selectedDivision,
      tech_id: selectedTechie,
      status: status
    };
    console.log(a);
    axios
      .post('http://localhost:4000/api/batch/insert', a)
      .then((res) => {
        console.log(res.data);
        alert('Batch created Successfully');
        // nav("/staffs")
      })
      .catch((err) => {
        alert(err);
      });
  };

  // console.log('sdfr', staffdetails);
  // console.log('staff', staff);

  const handleChange = (event) => {
    event.persist();
    setBatch(event.target.value);
    console.log(batch);
  };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit}>
        <h2 className="text-center">Batch Details</h2>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="b_name"
              id="standard-basic"
              onChange={handleChange}
              label="Batch Name"
            />
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="demo-simple-select-label">Choose Division</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Choose Division"
                value={selectedDivision}
                onChange={handleSelectChangeofDivision.bind(this)}
              >
                {filteredDivision.map((t) => (
                  <MenuItem key={t._id} value={t._id}>
                    {t.d_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Choose Techie</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Choose Techie"
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
          </Grid> */}
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Choose Techie</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={selectedTechie?.map((tech) => tech._id)} // Pass an array of IDs to the Select component
                onChange={handleChange1}
                input={<OutlinedInput id="select-multiple-chip" label="Choose Techie" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selectedTechie?.map((tech) => (
                      <Chip key={tech._id} label={tech.staff_name} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {filteredTechie.map((name) => (
                  <MenuItem
                    key={name._id}
                    value={name._id}
                    label={name.staff_name}
                    style={getStyles(
                      name,
                      selectedTechie?.map((tech) => tech._id),
                      theme
                    )} // Pass an array of IDs to getStyles
                  >
                    {name.staff_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button fullWidth color="primary" variant="contained" type="submit" sx={{ mt: '20px' }}>
          <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Submit</Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default Staffform;