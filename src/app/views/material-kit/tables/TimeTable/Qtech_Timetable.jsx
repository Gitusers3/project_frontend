import { Box, styled,Grid } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import {IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';



import QtechSimpletable from './QtechSimpletable';
import { Link } from 'react-router-dom';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

function Qtech_Timetable() {
  return (
    <Container>
    <Box className="breadcrumb">
      <Breadcrumb routeSegments={[{ name: 'Cognitive', path: '/batches' }, { name: 'Time Table' }]} />
    </Box>
<Grid >
    <Tooltip title="Add TimeTable">
        <Link to="../time_table/qtech">
    <IconButton aria-label="delete" size="large">
 <AddIcon fontSize="inherit" color="success"  sx={{ fontSize: 40 }} />
</IconButton>
</Link>
    </Tooltip>

<SimpleCard title="Time Table">
<QtechSimpletable/>
</SimpleCard>
</Grid>

 
    

  
  </Container>
  )
}

export default Qtech_Timetable