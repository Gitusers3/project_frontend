import {
    Box,
    Icon,
    IconButton,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button
  } from "@mui/material";
import { Link } from "react-router-dom";
  
  const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: "pre",
    "& thead": {
      "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
    },
    "& tbody": {
      "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
    },
  }));
  
  const subscribarList = [
    {
      name: "john doe",
      date: "18 january, 2019",
      amount: 1000,
      status: "close",
      company: "ABC Fintech LTD.",
    }
  
  ];

export default function CogSimpleTable() {
  return (
    <Box width="100%" overflow="auto">
    <StyledTable>
      <TableHead>
        <TableRow>
          <TableCell align="left">Day</TableCell>
          <TableCell align="left">Session 1[9:30-1:30]</TableCell>
       
          <TableCell align="center">Session 2[2:30-5:30]</TableCell>
      
          
          
          <TableCell align="right">Action</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
   
        {subscribarList.map((subscriber, index) => (
          <TableRow key={index}>
           
            <TableCell align="left">Mon</TableCell>
            <TableCell align="left">{subscriber.name}</TableCell>
            <TableCell align="center">{subscriber.company}</TableCell>
       
            <TableCell align="right">
              <IconButton>
                <Icon color="error">close</Icon>
              </IconButton>
            </TableCell>
          </TableRow>
          
        ))}
      </TableBody>
    </StyledTable>
    <Link to="../../time_table/cognitive">
     <Button fullWidth sx={{ marginTop: '10px' }} variant="outlined">
       Create TimeTable
     </Button>
   </Link>
  </Box>
  )
}
