import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Icon } from '@mui/material';
import {IconButton} from '@mui/material';
import {TextField,FormControl,InputLabel,Select,MenuItem} from '@mui/material';

import { useEffect } from 'react';
import { useState } from 'react';
import url from 'global';
import EditIcon from '@mui/icons-material/Edit';
import { initial } from 'lodash';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CLbatchview({batchid}) {
 
    
    const [open, setOpen] = React.useState(false);
   

    const [staff,setStaff]=useState([])
    const [selectedtechie,setSelectedtechie]=useState([])
    const [batchname,setBatchname]=useState()
    const [bstatus,setBstatus]=useState()
    
   
    useEffect(()=>{
        url.get(`batch/viewbatch/${batchid}`).then((res)=>{
          
           
            setSelectedtechie(res.data.tech_id)
            setBatchname(res.data.b_name)
            setBstatus(res.data.status)

        }).catch((err)=>{
            alert(err)

        })
       

    },[])
    console.log("Status",bstatus)
    console.log("batch",batchname)

 
 
  
    useEffect(()=>{
        async function fetchdata(){
            const token=await localStorage.getItem("accessToken")
            url.get("staff/view",{headers:{"authToken":token}}).then((res)=>{
                
                const staff=res.data.filter((item)=>{
                    return item.designation=== "Software Developer" 
                    

                })
                setStaff(staff)
    
    
            }).catch((err)=>{
                alert(err)
    
            })
           

        }
        fetchdata()
       

    },[])
  

    const handleSelectChangeofTechie=(e)=>{
        setSelectedtechie(e.target.value)
    }
    const handleBatch=(e)=>{
        setBatchname(e.target.value)


    }

    const handleStatus=(e)=>{
        setBstatus(e.target.value)

    }


    

  
  



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    url.put("batch/update")
    setOpen(false);
  };
  return (
    <div>
         <IconButton>
                      <EditIcon  onClick={handleClickOpen} color="primary">
                        Edit
                      </EditIcon>
                    </IconButton>
   
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
       
      >
        <DialogTitle>{"Batch Details"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
       
                       <TextField
                        id="standard-basic"
                        value={batchname}
                        variant="standard"
                        name="project_client_name"
                        onChange={handleBatch}
                      
                        fullWidth
                      />
                        <FormControl variant="standard" fullWidth>
                      <InputLabel id="demo-simple-select-label">Choose Techie</InputLabel>
                      <Select
                        // disabled={ton}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Choose Techie"
                        value={selectedtechie}
                        onChange={handleSelectChangeofTechie}
                        multiple
                      >
                        {staff.map((s) => (
                          <MenuItem key={s._id} value={s._id} >
                            {s.staff_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl variant="standard" fullWidth>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                     
                      <Select
                        // disabled={ton}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Choose Division"
                        value={bstatus}
                        onChange={handleStatus}
                      >
                        
                          <MenuItem key="Assigned" value="Assigned">
                          Assigned
                          </MenuItem>
                          
                          <MenuItem key="Ongoing" value="Ongoing">
                            Ongoing
                          </MenuItem>
                          
                          <MenuItem key="Completed" value="Completed">
                            Completed
                          </MenuItem>
                      
                      </Select>
                    </FormControl>

                 
               
        
                    
                     
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{color:"red"}} >Close</Button>
          <Button onClick={handleSave} >Save</Button>
        </DialogActions>
      </Dialog>
    </div>
 
  )
}

export default CLbatchview