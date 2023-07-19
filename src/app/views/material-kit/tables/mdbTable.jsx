// import React, { useEffect, useState } from 'react';
// import Axios from 'axios';
// import { MDBDataTable } from 'mdbreact';
// import URL from '../../../../global';
// const DatatablePage = () => {
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     URL.get('student/view')
//       .then((res) => {
//         console.log(res);
//         setData(res.data);
//         console.log(data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);
//   console.log(data?.st, 32322);

//   return <MDBDataTable striped bordered small data={data?.st} />;
// };

// export default DatatablePage;

import { MDBDataTable } from 'mdbreact';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import URL from '../../../../global';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
const DatatablePage = (divprop) => {
  const [display, setDisplay] = useState([]);
  console.log(divprop);
  useEffect(() => {
    URL.get('student/view')
      .then((res) => {
        console.log(res);
        setDisplay(res.data.st);
        console.log(display);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(display);

  const datta = display
    .filter((va) => {
      return divprop?.divprop?.props ? va?.division_id?.d_name === divprop?.divprop?.props : true;
    })
    .map((item, index) => {
      console.log(item._id);
      return {
        serial: index + 1,
        college: item.college_id.c_name,
        student: item.student_name,
        contact: item.whatsup,
        division: item.division_id.d_name,
        fees: item.fees,
        actions: (
          <div>
            <Link to={`view/${item._id}`}>
              <RemoveRedEyeIcon />
            </Link>
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
        label: 'College',
        field: 'college',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Student',
        field: 'student',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Contact',
        field: 'contact',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Division',
        field: 'division',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Fees',
        field: 'fees',
        sort: 'asc',
        width: 100
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

  return <MDBDataTable striped data={data} />;
};

export default DatatablePage;
