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
import { API_HEADER, notifyError, notifySuccess } from '../redux/Constants';
import AlertMesages from './AlertMesages';
import { useDispatch } from 'react-redux';
import { setListData } from '../redux/slice/ListSlice';
import { useSelector } from 'react-redux';
import RemoveCustomer from './RemoveCustomer';
import { Spinner } from 'flowbite-react';


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

  const [isLoading, setIsLoading] = useState(false)
  
  const options = {
    headers: { "Access-Control-Allow-Headers": "Content-Type" }
  }
  const columns = [
    { title: 'No', field: 'No', editable: 'never', render: rowData => rowData.tableData.id + 1 },
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
    setIsLoading(true)

    get_list().then((res) => {
      setIsLoading(false)
      const convertedData = res?.data?.payload?.map(item => {
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
      dispatch(setListData(res?.data?.payload))
    }).catch((e) => {
      setIsLoading(false)
      console.log(e)
    })
  }

  const handleFileChange = (event) => {
    const fileExcel = event.target.files[0]

    const formData = new FormData();
    formData.append('fileExcel', fileExcel);

    upload_excel(formData).then((response) => {
      Table()
      notifySuccess(response?.data?.message);
    })
      .catch((error) => {
        // Handle errors if any
        console.error('Error uploading file:', error);
      });
  };

  const handleFileUpload = () => {
    // if (!selectedFile) {
    //   alert('Please select a file before uploading.');
    //   return;
    // }

    const fileInput = document.querySelector('input[name="fileExcel"]');
    fileInput.click();


  };

  return (
    <>
      <AlertMesages />
      <input
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        name="fileExcel"
      />
      <RemoveCustomer Table={Table} />


      {/* table list */}
      {
        isLoading ? (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <MaterialTable
            columns={columns}
            title={null}
            icons={tableIcons}
            data={listCustomers}
            editable={{

              // add function
              onRowAdd: (newRow) => new Promise((resolve, reject) => {
                add_list(newRow, options).then((res) => {
                  if (res?.status == 200) {
                    notifySuccess("Inserted Successfully.")
                  } else {
                    notifyError("Invaid Information.")
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
                  if (res?.status == 200) {
                    notifySuccess("Updated Successfully.")
                  }
                  Table()
                })
                setTimeout(() => resolve(), 500)
              }),

              // delete function
              onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
                delete_list(selectedRow?.no).then((res) => {
                  if (res?.status == 200) {
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
        )
      }
    </>
  )
}

export default TableList
