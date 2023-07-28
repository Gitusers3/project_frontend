import {
  Button,

  Grid,

  styled
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Span } from 'app/components/Typography';
import { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import url from 'global';
const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px'
}));

export default function Fees_Reciept({ Fid, count, setCentredModal }) {
    console.log('FEES ID from prop : ' + Fid);
    const [state, setState] = useState({ date: new Date() });
    const [one, setOne] = useState('');
    const [divid, setDivid] = useState('');
    const [totfees, setTotfees] = useState('');
    const [fees, setFees] = useState();
   
    // const [centredModal, setCentredModal] = useState(false);
    // State to control the modal open/close
    const toggleClose = () => {
      setCentredModal(false);
    };
  
    const nav = useNavigate();
    useEffect(() => {
      url.get(`fees/view_one_fees/${Fid}`)
        .then((res) => {
          // console.log(res?.data?.s1?.student_name);
          // console.log(res?.data?.s1?.division_id?.d_name);
          console.log("resdata",res.data)
          let a = res.data.div_id.d_name;
          let divid = res.data.div_id;
          setOne(a);
          setDivid(divid);
          let b = res.data?.st_id?.pending_fees;
          setTotfees(b);
          console.log(a,b,divid)
          setFees(res.data)
  
          
        })
        .catch((err) => {
          console.log(err);
        });
    }, [count]);
  
    useEffect(() => {
      ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
        if (value !== state.password) return false;
  
        return true;
      });
      return () => ValidatorForm.removeValidationRule('isPasswordMatch');
    }, [state.password]);
  


    const formSubmit = (event) => {
      event.preventDefault();
     
     
      // console.log(event);
    };
  

  

    const [currentDate, setCurrentDate] = useState('');
    // const [changeDate, changeDate] = useState('');
  
    console.log("fees",fees);
  
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
       
      <ValidatorForm onSubmit={formSubmit} onError={() => null}>
      
        <p>
          <b>Reciept Number :{fees?.rec_num}</b>
          <br></br>
          <b>Division Name :{one} </b>
        </p>
        <Grid container spacing={6}>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
          <small>Fees Type</small>
          <TextField
              type="text"
              name="fees_type"
             
              value={fees?.fees_type}
           
           
       
            />
             
            <p>
              <b>Pending Fees :{totfees}</b>
            </p>
            <small>Paid Amount</small>
              <TextField
              type="number"
              name="amount"
            
             
              value={fees?.amount}
          // Make the field readonly if totfees is equal to or less than 0
            />
               <small>Paid date</small>
            <TextField
              type="text"
              name="fdate"
              value={fees?.f_date}
              // onChange={(e) => setCurrentDate()}
            />
            <small>Payment Type</small>
            <TextField
              type="text"
              name="pay_type"
              
              value={fees?.pay_type}
         
            
       
            />
            

            <TextField
              id="outlined-multiline-static"
              multiline
              rows={4}
             
              name="remark"
              value={fees?.remark}
              defaultValue="Remark about receipt"
            />
          </Grid>
        </Grid>


        <Button color="primary" variant="contained" type="submit" >
          <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Print</Span>
        </Button>
        <Button
          onClick={() => toggleClose()}
          color="warning"
          variant="contained"
          sx={{ float: 'right' }}
        >
          <Span sx={{ pl: 1, textTransform: 'capitalize' }}>cancel</Span>
        </Button>
      </ValidatorForm>
    </div>
  )
}
