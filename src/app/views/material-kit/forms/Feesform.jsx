import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
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
import Axios from 'axios';
import { Span } from 'app/components/Typography';
import { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import MenuItem from '@mui/material/MenuItem';

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px'
}));

const SimpleForm = ({ Sid }) => {
  console.log('Student ID from prop : ' + Sid);
  const [state, setState] = useState({ date: new Date() });
  const [one, setOne] = useState('');
  const [totfees, setTotfees] = useState('');
  useEffect(() => {
    Axios.get(`http://localhost:4000/api/student/view/${Sid}`)
      .then((res) => {
        console.log(res?.data?.s1?.student_name, 122);
        console.log(res?.data?.s1?.division_id?.d_name);
        let a = res.data.s1.division_id.d_name;
        setOne(a);
        let b = res.data.s1.fees;
        setTotfees(b);
        // alert(one);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [one, totfees]);
  console.log(one, totfees);

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

  const [feesType, setFeesType] = useState('');

  const SelectType = (event) => {
    setFeesType(event.target.value);
  };
  const [payType, setPayType] = useState('');

  const PaymentType = (event) => {
    setPayType(event.target.value);
  };
  const [currentDate, setCurrentDate] = useState('');

  // Function to get the current date in 'YYYY-MM-DD' format
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Add leading zero if month or day is less than 10
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  // Set the initial state to the current date when the component mounts
  useState(() => {
    setCurrentDate(getCurrentDate());
  }, []);

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <p>
          <b>Division Name :{one}</b>
        </p>
        <Grid container spacing={6}>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              select
              fullWidth
              onChange={SelectType}
              value={feesType}
              label="Choose fees type"
            >
              <MenuItem value={'Partial'}>Partial</MenuItem>
              <MenuItem value="Registration">Registration</MenuItem>
              <MenuItem value="Course Fees">Course Fees</MenuItem>
            </TextField>
            <p>
              <b>Pending Fees :{totfees}</b>
            </p>
            <TextField
              type="number"
              name="firstName"
              label="Paying fees"
              onChange={handleChange}
              validators={['required']}
              errorMessages={['this field is required']}
            />
            <small>Paid date</small>
            <TextField
              type="date"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
            />
            <TextField
              select
              fullWidth
              value={payType}
              onChange={PaymentType}
              label="Choose payment type"
            >
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="Bank">Bank</MenuItem>
            </TextField>

            <TextField
              id="outlined-multiline-static"
              multiline
              rows={4}
              defaultValue="Remark about receipt"
            />
          </Grid>
        </Grid>

        <Button color="primary" variant="contained" type="submit">
          <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Submit</Span>
        </Button>
        <Button color="warning" variant="contained" type="submit" sx={{ float: 'right' }}>
          <Span sx={{ pl: 1, textTransform: 'capitalize' }}>cancel</Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default SimpleForm;
