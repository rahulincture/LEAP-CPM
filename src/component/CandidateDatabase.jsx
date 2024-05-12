import { useState, useEffect, useMemo } from 'react'

//MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from 'material-react-table'
import PropTypes from 'prop-types'
//Material UI Imports
import {
  Box,
  Button,
  ButtonGroup,
  ListItemIcon,
  MenuItem,
  lighten,
} from '@mui/material'

//Icons Imports
import { AccountCircle, Send } from '@mui/icons-material'

//Mock Data
//import { data } from './makeData';
const colBaseUrl = "http://172.20.10.3:8080"
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

const SalaryCell = ({ cell }) => {
  return (
    <Box
      component='span'
      sx={theme => ({
        backgroundColor:
          cell.getValue() < 0
            ? theme.palette.error.dark
            : cell.getValue() >= 0 && cell.getValue() < 70
            ? theme.palette.warning.dark
            : theme.palette.success.dark,
        borderRadius: '0.25rem',
        color: '#fff',
        maxWidth: '9ch',
        p: '0.25rem',
      })}
    >
      {cell.getValue()?.toLocaleString?.('en-US', {})}
    </Box>
  )
}
SalaryCell.propTypes = {
  cell: PropTypes.shape({
    getValue: PropTypes.func.isRequired,
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
          `${canBaseUrl}/candidates/getAll`,
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
        id: 'candidate', //id used to define `group` column
        header: 'Candidate',
        columns: [
          {
            accessorKey: 'candidateId', //hey a simple column for once
            header: 'Candiate Id',
            size: 100,
          },
          {
            accessorKey: 'candidateName', //accessorFn used to join multiple data into a single cell
            header: 'Name',
            size: 100,
          },
          {
            accessorKey: 'status', //hey a simple column for once
            header: 'Status',
            editVariant: 'select',
            filterVariant: 'select',
            editSelectOptions: ['Interview pending','Interviewed','Rejected','Selected'],
            muiEditTextFieldProps: {
              select: true,
              helperText: 'select',
            },
            size: 100,
          },
          {
            accessorKey: 'candidateCollege', //hey a simple column for once
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
            accessorKey: 'tenthPercent',
            // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
            enableColumnFilter: false,
            header: 'Tenth Percent',
            size: 100,
            //custom conditional format and styling
            Cell: SalaryCell,
          },
          {
            accessorKey: 'twelthPercent',
            // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
            enableColumnFilter: false,
            filterFn: 'between',
            header: 'Twelth Percent',
            size: 50,
            //custom conditional format and styling
            Cell: SalaryCell,
          },
          {
            accessorKey: 'cgpau', //hey a simple column for once
            header: 'CGPA U',
            filterVariant: 'range',
            size: 100,
          },
          {
            accessorKey: 'cgpam', //hey a simple column for once
            header: 'CGPA M',
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
            filterVariant:'date',
             //render Date as a string
            Header: DateHeader, //custom header markup
            muiFilterTextFieldProps: {
              sx: {
                minWidth: '250px',
              },
            },
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
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: true,
    enableRowSelection: true,
    enableEditing:true,
    onEditingRowSave: async ({ table, values }) => {
      //validate data
      //save data to api
      try {
        const response = await fetch(`${canBaseUrl}/candidates/${values.candidateId}`, {
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
              `${canBaseUrl}/candidates/${row.getValue('candidateId')}`,
              {
                method: 'DELETE',
              },
            )
            window.location.reload()
          })
        }
      }

      const handleActivate = () => {
        table.getSelectedRowModel().flatRows.map(async row => {
          //alert('deactivating ' + row.getValue('name'))
          const response = await fetch(`${tanBaseUrl}/cpm/talents/addtalentfromcandidate`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(row.original)
          })
        })
      }
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [selectedFile, setSelectedFile] = useState(null)
      const handleFileChange = event => {
        setSelectedFile(event.target.files[0])
      }
      

      const handleUpload = async () => {
        try {
          if (!selectedFile) {
            alert('Please select a file.')
            return
          }

          const formData = new FormData()
          formData.append('file', selectedFile)

          const response = await fetch(`${canBaseUrl}/candidates/upload`, {
            method: 'POST',
            body: formData,
          })
          console.log(response);
          if (response.ok) {
            alert('File uploaded successfully.')
            window.location.reload();
          } else {
            alert('Failed to upload file.')
          }
        } catch (error) {
          console.error('Error uploading file:', error)
        }
      }      

      return (
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-300 scrollbarr-thumb-slate-300'>
          <div className='flex justify-between mb-2 bg-[#F9FAFB] rounded-md'>
            <h2 className={`text-3xl text-[#0087D5] font-bold my-auto p-2`}>
              Candidates
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
                  color='error'
                  // disabled={!table.getIsSomeRowsSelected()}
                  onClick={handleDeactivate}
                  variant='contained'
                >
                  Delete
                </Button>
                <Button
                  color='success'
                  disabled={!table.getIsSomeRowsSelected()}
                  onClick={handleActivate}
                  variant='contained'
                >
                  Convert to Talent
                </Button>
                <div>
                  <ButtonGroup>
                  <Button variant ='contained'>
                  <label htmlFor='excelFile' className='excel-file-label'>
                  {selectedFile ? `File Selected: ${selectedFile.name}` : 'Add via Excel'}
                    <input
                      type='file'
                      id='excelFile'
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />
                  </label>
                  </Button>
                  <Button  onClick={handleUpload} color='success' variant ='contained'>Upload File</Button>
                  </ButtonGroup>
                </div>
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
