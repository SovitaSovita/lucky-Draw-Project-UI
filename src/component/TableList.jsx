import { React, useState, useEffect, useRef } from 'react'
import MaterialTable, { MTablePagination, MTableToolbar } from 'material-table'
import axios from 'axios';
import { forwardRef } from 'react';
import '../style/style.css'
import XLSX from 'xlsx';


import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { add_list, delete_list, get_list, update_list, upload_excel } from '../redux/service/TableListService';
import { API_HEADER, notifySuccess } from '../redux/Constants';
import AlertMesages from './AlertMesages';
import { useDispatch } from 'react-redux';
import { setListData } from '../redux/slice/ListSlice';


const tableIcons = {
  NoteAddOutlinedIcon: forwardRef((props, ref) => <NoteAddOutlinedIcon color='success' {...props} ref={ref} />),
  Add: forwardRef((props, ref) => <AddBoxOutlinedIcon {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check className='text-green-500 ' {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear className='text-red-500 ' {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutlineRoundedIcon className='text-red-500 bg-red-100 py-1 rounded-full' {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <EditOutlinedIcon className='text-blue-500 bg-blue-100 py-1 rounded-full' {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const TableList = () => {
  const options = {
    headers: { "Access-Control-Allow-Headers": "Content-Type" }
  }
  const columns = [
    { title: 'No', field: 'No', editable: 'never' },
    { title: 'Order Date', field: 'dateOfOrder', type: 'date' },
    { title: 'Name', field: 'name' },
    { title: 'Telephone', field: 'phoneNumber' },
    { title: 'OrderNo', field: 'orderNo' },
  ]

  useEffect(() => {
    Table()
  }, [])
  const [listCustomers, setListCustomers] = useState([]);
  const dispatch = useDispatch()


  const Table = () => {
    get_list().then((res) => {
      const convertedData = res.data.payload.map(item => {
        // Convert the timestamp to a JavaScript Date object
        const dateObject = new Date(item.dateOfOrder);
        const formattedDate = dateObject.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });

        // Return a new object with the updated dateOfOrder field
        return {
          ...item,
          dateOfOrder: formattedDate
        };
      });
      setListCustomers(convertedData);
      dispatch(setListData(res.data.payload))
    }).catch((e) => {
      console.log(e)
    })
  }

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (!selectedFile) {
      alert('Please select a file before uploading.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    // Replace 'your-api-endpoint' with the actual endpoint to which you want to upload the file
    // Replace 'your-access-token' with the actual authentication token
    axios
      .post('http://localhost:8080/api/v1/info/file-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzb3ZpdGEyOCIsImV4cCI6MTY5MDUwNDE0MCwiaWF0IjoxNjg5ODk5MzQwfQ.qGZG1FV3aTQotSvFBhekePXw4qP0tUlYmm5ufo3_Nl7DncN13r8y8NmMEQY9O7i0LzK5GvIPM8NWoiFBsrbVqA`, // Include the token in the 'Authorization' header
        },
      })
      .then((response) => {
        // Handle the response data from the API if needed
        console.log('File upload successful:', response.data);
      })
      .catch((error) => {
        // Handle errors if any
        console.error('Error uploading file:', error);
      });
  };

  return (
    <>
      <AlertMesages />
      <input
        type="file"
        // style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <MaterialTable
        columns={columns}
        title={null}
        icons={tableIcons}
        data={listCustomers}
        editable={{

          // add function
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            add_list(newRow, options).then((res) => {
              if (res.status == 200) {
                notifySuccess("Inserted Successfully.")
              }
              Table()
            })
            setTimeout(() => resolve(), 500)

          }),

          // update function
          onRowUpdate: (newRow, oldRow) => new Promise((resolve, reject) => {
            let newUpdateRow = {
              name: newRow.name,
              dateOfOrder: new Date(newRow.dateOfOrder).getTime(),
              orderNo: newRow.orderNo,
              phoneNumber: newRow.phoneNumber
            }

            update_list(newUpdateRow, oldRow).then((res) => {
              if (res.status == 200) {
                notifySuccess("Updated Successfully.")
              }
              Table()
            })
            setTimeout(() => resolve(), 500)
          }),

          // delete function
          onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
            delete_list(selectedRow.No).then((res) => {
              if (res.status == 200) {
                notifySuccess("Deleted Successfully.")
              }
              Table()
            })
            setTimeout(() => resolve(), 1000)
          })
        }}
        // onSelectionChange={(selectedRows) => console.log(selectedRows)}
        options={{
          paging: true,
          sorting: true,
          search: true,
          exportAllData: true, exportFileName: "TableData", addRowPosition: "first", actionsColumnIndex: -1,
          // selection: true,
          // showSelectAllCheckbox: false, showTextRowsSelected: true, selectionProps: rowData => ({
          //   color: "primary"
          // }),
          // rowStyle: (data, index) => index % 2 === 0 ? { background: "#f5f5f5" } : null,
          headerStyle: { background: "#f5f5f5", color: "#000", borderTop: "1px solid #D2D5DB" },
          searchFieldAlignment: 'left',
          searchFieldStyle: { background: "#f5f5f5", padding: "2px", marginRight: "18px", borderRadius: "8px 8px 0 0", borderBottom: 'none' }
        }}
        actions={[
          {
            icon: NoteAddOutlinedIcon,
            tooltip: 'Import excel',
            isFreeAction: true,
            onClick: handleFileUpload
          }
        ]}

      />
    </>
  )
}

export default TableList
