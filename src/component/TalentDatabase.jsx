import { useState, useEffect, useMemo } from 'react'

//MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
  createRow,
} from 'material-react-table'
import PropTypes from 'prop-types'
//Material UI Imports
import {
  Box,
  Button,
  ListItemIcon,
  MenuItem,
  lighten,
} from '@mui/material'

//Icons Imports
import { AccountCircle, Send } from '@mui/icons-material'

//Mock Data
//import { data } from './makeData';
const canBaseUrl = "http://172.20.10.3:8080"
const tanBaseUrl = "http://172.20.10.3:8080"
const NameCell = ({ renderedCellValue }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
      <span>{renderedCellValue}</span>
    </Box>
  )
}
NameCell.propTypes = {
  renderedCellValue: PropTypes.node.isRequired,
  row: PropTypes.shape({
    original: PropTypes.shape({}).isRequired,
  }).isRequired,
}


const DateHeader = ({ column }) => {
  return <em>{column.columnDef.header}</em>
}

DateHeader.propTypes = {
  column: PropTypes.shape({
    columnDef: PropTypes.shape({
      header: PropTypes.node.isRequired,
    }).isRequired,
  }).isRequired,
}

const Example = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    // Make API call to fetch data
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${tanBaseUrl}/cpm/talents/alltalent`,
        )
        let jsonData = await response.json()
        jsonData = jsonData.slice(0, jsonData.length)
        setData(jsonData)
        console.log(jsonData) // Log the fetched data
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])
  const columns = useMemo(
    () => [
      {
        id: 'talent', //id used to define `group` column
        header: 'Candidate',
        columns: [
          {
            accessorKey: 'talentId', //hey a simple column for once
            header: 'Talent Id',
            enableEditing: false,
            size: 100,
            muiEditTextFieldProps: {
              helperText: "Auto Generated",
            },
          },
          {
            accessorKey: 'talentName', //accessorFn used to join multiple data into a single cell
            header: 'Name',
            size: 100,
          },
          {
            accessorKey: 'collegeName', //hey a simple column for once
            header: 'College Name',
            size: 100,
          },
          {
            accessorKey: 'department', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            filterVariant: 'select',
            header: 'Branch',
            size: 100,
          },
          {
            accessorKey: 'email', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: 'autocomplete',
            header: 'Email',
            size: 100,
          },
          {
            accessorKey: 'phoneNumber', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableColumnFilter: false,
            header: 'Phone Number',
            size: 100,
          },
          {
            accessorKey: 'alternateNumber', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            header: 'Alt Phone Number',
            enableColumnFilter: false,
            size: 100,
          },
          {
            accessorKey: 'tenthPercent', //hey a simple column for once
            header: 'Tenth Percent',
            filterVariant: 'range',
            size: 100,
          },
          {
            accessorKey: 'twelthPercent', //hey a simple column for once
            header: 'Twelth Percent',
            filterVariant: 'range',
            size: 100,
          },
          {
            accessorKey: 'cgpaMasters', //hey a simple column for once
            header: 'CGPA M',
            filterVariant: 'range',
            size: 100,
          },
          {
            accessorKey: 'cgpaUndergrad', //hey a simple column for once
            header: 'CGPA U',
            filterVariant: 'range',
            size: 100,
          },
          {
            accessorKey: 'currentLocation', //hey a simple column for once
            header: 'Current Location',
            filterVariant: 'autocomplete',
            size: 100,
          },
          {
            accessorKey: 'permanentAddress', //hey a simple column for once
            header: 'Permanent Address',
            size: 100,
          },
          {
            accessorKey: 'panNumber', //hey a simple column for once
            header: 'Pan Number',
            size: 100,
          },
          {
            accessorKey: 'aadhaarNumber', //hey a simple column for once
            header: 'Aadhaar Number',
            size: 100,
          },
          {
            accessorKey: 'fatherName', //hey a simple column for once
            header: 'Father Name',
            enableColumnFilter: false,
            size: 100,
          },
          {
            accessorKey: 'motherName', //hey a simple column for once
            header: 'Mother Name',
            enableColumnFilter: false,
            size: 100,
          },
          {
            accessorKey: 'dob', //convert to Date for sorting and filtering
            id: 'dob',
            header: 'DOB',
            //filterVariant:'date',
             //render Date as a string
            Header: DateHeader, //custom header markup
            muiFilterTextFieldProps: {
              sx: {
                minWidth: '250px',
              },
            },
          },
          {
            accessorKey: 'talentSkills', //hey a simple column for once
            header: 'Skills',
            enableColumnFilter: false,
            size: 100,
          },
          {
            accessorKey: 'talentEmploymentType', //hey a simple column for once
            header: 'Employment Type',
            enableColumnFilter: false,
            size: 100,
          },
          {
            accessorKey: 'reportingManager', //hey a simple column for once
            header: 'Reporting Manager',
            enableColumnFilter: false,
            size: 100,
          },
          {
            accessorKey: 'plOwner', //hey a simple column for once
            header: 'P&L Owner',
            enableColumnFilter: false,
            size: 100,
          },
          {
            accessorKey: 'talentCategory', //hey a simple column for once
            header: 'Category',
            enableColumnFilter: false,
            size: 100,
          },
          {
            accessorKey: 'ekYear', //hey a simple column for once
            header: 'EK Year',
            enableColumnFilter: false,
            size: 100,
          },
        ],
      },
    ],
    [],
  )

  const table  = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnFilterModes: true,
    createDisplayMode: 'modal',
    enableColumnOrdering: true,
    enableGrouping: true,
    enableHiding: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: true,
    enableRowSelection: true,
    enableEditing:true,
    onCreatingRowCancel: () => {},
    onCreatingRowSave:  async ({ values, table }) => {
      try {
        const response = await fetch(`${tanBaseUrl}/cpm/talents/createtalent`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        if (!response.ok) {
          throw new Error('Failed to update candidate');
        }
        //save data to api
        table.setEditingRow(null); //exit editing mode
      } catch (error) {
        console.error(error);
        //handle error
      }
      window.location.reload();
      
      table.setCreatingRow(null); //exit creating mode
    },
    onEditingRowSave: async ({ table, values }) => {
      //validate data
      //save data to api
      try {
        const response = await fetch(`${tanBaseUrl}/cpm/talents/updatetalent/${values.talentId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        if (!response.ok) {
          throw new Error('Failed to update candidate');
        }
        //save data to api
        table.setEditingRow(null); //exit editing mode
      } catch (error) {
        console.error(error);
        //handle error
      }
    },
    onEditingRowCancel: () => {
      //clear any validation errors
    },
    initialState: {
      showColumnFilters: true,
      showGlobalFilter: true,
      columnVisibility: { talentName: true,tenthPercent:false,twelthPercent:false }
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
    renderRowActionMenuItems: ({ closeMenu }) => [
      <MenuItem
        key={0}
        onClick={() => {
          // View profile logic...
          closeMenu()
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        View Profile
      </MenuItem>,
      <MenuItem
        key={1}
        onClick={() => {
          // Send email logic...
          closeMenu()
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Send />
        </ListItemIcon>
        Send Email
      </MenuItem>,
    ],
    renderTopToolbar: ({ table }) => {
      const handleDeactivate = () => {
        const confirmed = window.confirm(
          'Are you sure you want to delete the data?',
        )
        if (confirmed) {
          table.getSelectedRowModel().flatRows.map(async row => {
            //alert('deactivating ' + row.getValue('name'))
            const response = await fetch(
              `${tanBaseUrl}/cpm/talents/deletetalent/${row.getValue('talentId')}`,
              {
                method: 'DELETE',
              },
            )
            window.location.reload()
          })
        }
      }

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [selectedFile, setSelectedFile] = useState(null)
      const handleFileChange = event => {
        setSelectedFile(event.target.files[0])
      }
         

      return (
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-300 scrollbarr-thumb-slate-300'>
          <div className='flex justify-between mb-2 bg-[#F9FAFB] rounded-md'>
            <h2 className={`text-3xl text-[#0087D5] font-bold my-auto p-2`}>
              Talents
            </h2>
            <div className='my-auto mr-2'></div>
          </div>
          <Box
            sx={theme => ({
              backgroundColor: lighten(theme.palette.background.default, 0.05),
              display: 'flex',
              gap: '0.5rem',
              p: '8px',
              justifyContent: 'space-between',
            })}
          >
            <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              {/* import MRT sub-components */}
              <MRT_GlobalFilterTextField table={table} />
              <MRT_ToggleFiltersButton table={table} />
            </Box>
            <Box>
            <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                <Button
                  color="primary"
                  onClick={() => {
                    table.setCreatingRow(true);
                  }}
                  variant='contained'
                >
                  Add Talent
              </Button>
                <Button
                  color='error'
                  onClick={handleDeactivate}
                  variant='contained'
                >
                  Delete
                </Button>

              </Box>
            </Box>
          </Box>
        </div>
      )
    },
  })

  return <MaterialReactTable table={table} />
}

//Date Picker Imports - these should just be in your Context Provider
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

const ExampleWithLocalizationProvider = () => (
  //App.tsx or AppProviders file
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Example />
  </LocalizationProvider>
)

export default ExampleWithLocalizationProvider
