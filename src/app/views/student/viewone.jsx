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
import StudentsAll from './studentDetails';
import AdditionalDetails from './AdditionalDetails';
import FeesDetails from './FeesDetails';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { useEffect, useState } from 'react';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));
const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

export default function Viewone() {
  let param = useParams();
  console.log('Id : ' + param.id);
  const [student, setStudent] = useState({});
  useEffect(() => {
    Axios.get(`http://localhost:4000/api/student/view/${param.id}`)
      .then((res) => {
        // console.log(res?.data?.s1?.student_name);
        console.log(res?.data);
        let a = res.data.s1;
        setStudent(a);
        // alert(one);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // console.log(student);

  return (
    <div>
      <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: 'Student' }]} />
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <StudentsAll studentD={student} setStudent={setStudent} />
          </Grid>
          <Grid item xs={4}>
            <AdditionalDetails studentD={student} setStudent={setStudent} />
          </Grid>
          <Grid item xs={4}>
            <FeesDetails studentD={student} setStudent={setStudent} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
