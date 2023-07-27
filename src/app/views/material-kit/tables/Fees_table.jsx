import Axios from 'axios';
import { MDBDataTable } from 'mdbreact';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import URL from '../../../../global';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Fform from '../forms/Feesform';
import Fees_Reciept from '../forms/Fees_Reciept';
import Swal from 'sweetalert2';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter
} from 'mdb-react-ui-kit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));


export default function Fees_table(divprop) {
    const [display, setDisplay] = useState([]);
    
    console.log("divprop",divprop);
    useEffect(() => {
    
      URL.get('fees/view_fees')
        .then((res) => {
          
          console.log("datafees",res.data);
          setDisplay(res.data);
      
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
    console.log("display",display);
    const [centredModal, setCentredModal] = useState(false);
    const [fid, setFid] = useState();
  
    const [deleteID, setDeleteID] = useState('');
    const [count, setCount] = useState(1);
  
    const toggleShow = (fid) => {
      setCentredModal(!centredModal);
      setCount((prevCount) => prevCount + 1);
      return setFid(fid);
    };
    const toggleClose = () => {
      setCentredModal(!centredModal);
    };
    const DeleteStudent = (id) => {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success mx-2',
          cancelButton: 'btn btn-danger mx-2'
        },
        buttonsStyling: false
      });
  
      swalWithBootstrapButtons
        .fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true
        })
        .then((result) => {
          if (result.isConfirmed) {
            Axios.delete(`http://localhost:4000/api/student/delete/${id}`)
              .then((res) => {
                console.log(res);
                let newDisplay = display.filter((item) => {
                  return item._id !== id;
                });
                setDisplay(newDisplay);
              })
              .catch((err) => {
                console.log(err);
              });
            swalWithBootstrapButtons.fire('Deleted!', 'Student has been deleted.', 'success');
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire('Cancelled', 'Student record is safe :)', 'error');
          }
        });
    };

    console.log("datatta",datta)
  
    const datta = display?.filter((va) => {
        return divprop?.divprop?.props ? va?.div_id?.d_name === divprop?.divprop?.props : true;
      })
      .map((item, index) => {
        console.log(item._id);
        return {
          serial: index + 1,
         
          student: item.std_id?.student_name,
         
          division: item?.div_id?.d_name,
          date: item?.f_date,
          fees: item.amount,
        

          actions: (
            <div>
             
               
                <Grid item xs={4}>
                  <Item>
                    <CurrencyRupeeIcon
                      style={{ color: 'green' }}
                      onClick={() => toggleShow(item._id)}
                    />
                  </Item>
                </Grid>
                
            
            </div>
          )
        };
      });
    const data = {
      columns: [
        {
          label: 'Sl No',
          field: 'serial',
          sort: 'asc',
          width: 150
        },
      
        {
          label: 'Student',
          field: 'student',
          sort: 'asc',
          width: 200
        },
       
        {
          label: 'Division',
          field: 'division',
          sort: 'asc',
          width: 150
        },
        {
            label: 'Paid Date',
            field: 'date',
            sort: 'asc',
            width: 100
          },
        {
          label: 'Amount Paid',
          field: 'fees',
          sort: 'asc',
          width: 50
        },
      
      

       
        {
          label: 'Actions',
          field: 'actions',
          sort: 'asc',
          width: 100
        }
      ],
      rows: datta
    };
  
  return (
    <>
    <MDBDataTable striped data={data} />
    <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
      <MDBModalDialog centered>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Make Reciepts</MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={() => toggleClose()}></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <Fees_Reciept Fid={fid} count={count} setCentredModal={setCentredModal} />
          </MDBModalBody>
          {/* <MDBModalFooter>
            <MDBBtn color="secondary" onClick={toggleShow}>
              Close
            </MDBBtn>
            <MDBBtn>Save</MDBBtn>
          </MDBModalFooter> */}
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  </>
  )
}
