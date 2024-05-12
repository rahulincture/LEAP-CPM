import React, { useState, useMemo,useEffect } from 'react';
import { AccountCircle } from '@mui/icons-material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Link } from 'react-router-dom'; // Import Link
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
//import {data } from makeData
//MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from 'material-react-table';
import PropTypes from 'prop-types';
//Material UI Imports
import {
  Box,
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
  lighten,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

//Mock Data
import { data } from './makeData';
const attd='http://172.20.10.3:8080'
const Attendance1 = ({ employees }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };
  // const [data,setData] = useState([])
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const date = '2024-05-10'
  //       const response = await axios.get(`http://172.20.10.3:8080/cpm/attendance/getAttendanceByDate`, {
  //       params: {
  //         date,
  //       },
  //     });
  //       setAttendanceData(response.data);
  //       setLoading(false);
  //     }
  //     catch (error) {
  //       setError(error);
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []); 
  const [data, setData] = useState([])
  const currentDate = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).split('/').reverse().join('-');
  
  const [value, setValue] = React.useState(dayjs(currentDate)); 
  useEffect(() => {
    // Make API call to fetch data
    const fetchData = async () => {  
      console.log(`http://172.20.10.3:8080/cpm/attendance/getAttendanceByDate?date=${value.format('YYYY-MM-DD')}`)
      try {
        const response = await fetch(
          `${attd}/cpm/attendance/getAttendanceByDate?date=${value.format('YYYY-MM-DD')}`,
        )
        let jsonData = await response.json()
        setData(jsonData)
        console.log(jsonData) // Log the fetched dataA
      } catch (error) {
        console.error('Error fetching data:', error)
      }
      // location.reload();
    }
 
    fetchData()
  }, [value])
  const columns = useMemo(
    () => [
      {
        id: 'attendance', 
        header: 'Attendance',
        columns: [
          {
            accessorKey: 'talentId', 
            header: 'Employee Id',
            enableColumnFilter: false,
            size: 100,
          },
          {
            accessorKey: 'talentName', //accessorFn used to join multiple data into a single cell
            id: 'Name', //id is still required when using accessorFn instead of accessorKey
            header: 'Name',
            enableColumnFilter: false,
            size: 100,
          },
          {
            accessorKey: 'talentCategory', //hey a simple column for once
            filterVariant: 'autocomplete',
            header: 'Category',
            size: 100,
          },
          {
            accessorKey: 'ekYear', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            filterVariant: 'autocomplete',
            header: 'Batch',
            size: 100,
          },
          {
            accessorKey: 'officeLocation', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: 'autocomplete',
            header: 'Location',
            size: 100,
          },
          {
            accessorKey: 'checkin', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            filterVariant: 'autocomplete',
            enableColumnFilter: false,
            header: 'Check In Time',
            size: 100,
          },
          {
            accessorKey: 'checkout', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            filterVariant: 'autocomplete',
            enableColumnFilter: false,
            header: 'Check Out Time',
            size: 100,
          },
          {
            accessorKey: 'date', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            filterVariant: 'autocomplete',
            enableColumnFilter: false,
            header: 'Date',
            size: 100,
          },
          {
            accessorKey: 'status', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            filterVariant: 'autocomplete',
            enableColumnFilter: false,
            header: 'Status',
            size: 100,
          },
        ],
      },
    ],
    []
  ); //hook

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: true,
    enableRowSelection: true,
    enableCellActions: true,
    initialState: {
      showColumnFilters: true,
      showGlobalFilter: true,
      columnPinning: {
        left: ['mrt-row-expand', 'mrt-row-select'],
        right: ['mrt-row-actions'],
      },
    },
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    muiSearchTextFieldProps: {
      size: 'small',
      variant: 'outlined',
    },
    muiPaginationProps: {
      color: 'secondary',
      rowsPerPageOptions: [10, 20, 30],
      shape: 'rounded',
      variant: 'outlined',
    },

    renderRowActionMenuItems: ({ closeMenu ,row}) => [
      <MenuItem
        key={0}
        onClick={() => {
          handleModalOpen();
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        <Link to={`/dashboard?tab=DetailedAttendanceView&talentId=${row.original.talentId}`}>
          <Typography variant="inherit">Attendance Details</Typography>
        </Link>
      </MenuItem>,
    ],
    renderTopToolbar: ({ table }) => {
      const handleDeactivate = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('deactivating ' + row.getValue('talentName'));
        });
      };
      
      
      return (
        <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-300 scrollbarr-thumb-slate-300">
          <div className="flex justify-between mb-2 bg-[#F9FAFB] rounded-md">
            <h2 className={`text-3xl text-[#0087D5] font-bold my-auto p-2`}>
              Attendance
            </h2>

            <div className="my-auto mr-2">
              <Box sx={{ display: 'flex', gap: '0.5rem' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
  <DemoContainer components={['DatePicker', 'DatePicker']}>
    <DatePicker
      label="Select Date"
      value={value}
      onChange={(newValue) =>{ setValue(newValue)}}
      format="YYYY-MM-DD" // Set the format here
    />
  </DemoContainer>
</LocalizationProvider>
                <Link to='/dashboard?tab=regularization'>

                  <Button
                    color="success"
                    // disabled={!table.getIsSomeRowsSelected()}
                    // onClick={handleActivate}
                    variant="contained"
                  >
                    Regularization Requests
                  </Button>
                </Link>
              </Box>
            </div>
          </div>

          <Box
            sx={(theme) => ({
              backgroundColor: lighten(theme.palette.background.default, 0.05),
              display: 'flex',
              gap: '0.5rem',
              p: '8px',
              justifyContent: 'space-between',
            })}
          >
            <div className="my-auto mr-2">

              <Typography variant="body1" color="textSecondary" fontWeight="bold">
               
              </Typography>
            </div>
            <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <MRT_GlobalFilterTextField table={table} />
              <MRT_ToggleFiltersButton table={table} />
            </Box>
          </Box>
        </div>
      );
    },
  });

  return (
    <>

      {/* Render the table once data is fetched */}
     
        <>
          <MaterialReactTable table={table} />
        </>
      
    </>
  );
};
export default Attendance1;