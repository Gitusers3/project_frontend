import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';


import CogSimpleTable from './CogSimpleTable';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

export default function Cognitive_TimeTable() {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Cognitive', path: '/batches' }, { name: 'Time Table' }]} />
      </Box>

      <SimpleCard title="Time Table">
        <CogSimpleTable/>
      </SimpleCard>

    
    </Container>
  )
}
