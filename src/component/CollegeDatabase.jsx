import { useEffect, useMemo, useState } from 'react'

import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table'
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
  Tooltip,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'


//Module completed testing done
const colBaseUrl = "http://172.20.10.3:8080"
const CandidateTable = () => {
  const [collegeList, setCollegeList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [validationErrors, setValidationErrors] = useState({})
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [error, setError] = useState()
  
  const indStates = [
    'Andaman and Nicobar Islands',
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chandigarh',
    'Chhattisgarh',
    'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jammu and Kashmir',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Ladakh',
    'Lakshadweep',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Puducherry',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
  ]

  const selectTier = [
    'Government Tier 1',
    'Government Tier 2',
    'Private Tier 1',
    'Private Tier 2',
    'NIT',
  ]

  const selectRegion = ['North', 'South', 'East', 'West']

  const [collegeIdToDelete, setCollegeIdToDelete] = useState(null)
  const [openSnackbar, setOpenSnackbar] = useState(null)
  const [rowSelection, setRowSelection] = useState({})
  const [selectedRows, setSelectedRows] = useState(null)
  const [openDeleteRowsModal, setOpenDeleteRowsModal] = useState(false)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    if (error) {
      setError(null)
    }

    setOpenSnackbar(false)
  }

  const handleDelete = async () => {
    await deleteCollege(collegeIdToDelete)
    setOpenDeleteModal(false)
  }

  const renderDeleteModal = () => (
    <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
      <DialogTitle>Delete College</DialogTitle>
      <DialogContent>
        <p>Are you sure you want to delete this college?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDeleteModal(false)}>Cancel</Button>
        <Button onClick={handleDelete} color='error'>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
  const renderDeleteRowsModal = () => (
    <Dialog open={openDeleteRowsModal} onClose={() => setOpenDeleteRowsModal(false)}>
      <DialogTitle>Delete Colleges</DialogTitle>
      <DialogContent>
        <p>Are you sure you want to delete selected colleges?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDeleteRowsModal(false)}>Cancel</Button>
        <Button onClick={handleDeleteSelectedRows} color='error'>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        console.log(`${colBaseUrl}/admin/viewData`)
        const response = await fetch(`${colBaseUrl}/admin/viewData`)
        const data = await response.json()
        setCollegeList(data)
      } catch (error) {
        console.error('Error fetching data:', error)
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const createCollege = async newCollege => {
    setIsLoading(true)
    setError(null)
    setOpenSnackbar(null)

    try {
      const response = await fetch(
        `${colBaseUrl}/admin/insertCollegeData`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCollege),
        },
      )
      if (response.ok) {
        setError(null)
        const data = await response.json()
        setCollegeList(prevColleges => [...prevColleges, data])
        setOpenSnackbar('College added successfully!')
      }
    } catch (error) {
      console.error('Error creating college:', error)
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const updateCollege = async collegeToUpdate => {
    setIsLoading(true)
    setError(null)
    setOpenSnackbar(null)
    try {
      const response = await fetch(
        `${colBaseUrl}/admin/updateData/${parseInt(
          collegeToUpdate.collegeId,
        )}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(collegeToUpdate),
        },
      )

      if (response.ok) {
        const data = await response.json()

        setCollegeList(prevColleges =>
          prevColleges.map(college =>
            college.collegeId === data.collegeId ? data : college,
          ),
        )
        setOpenSnackbar('College updated successfully!')
        console.log('khul gayaa sncakbar??')
        setError(null)
      }
    } catch (error) {
      console.error('Error updating college:', error)
      setError(null)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteCollege = async collegeId => {
    setIsLoading(true)
    setError(null)
    setOpenSnackbar(null)
    try {
      const response = await fetch(
        `${colBaseUrl}/admin/deleteData/${collegeId}`,
        {
          method: 'DELETE',
        },
      )

      if (response.ok) {
        setCollegeList(prevColleges =>
          prevColleges.filter(college => college.collegeId !== collegeId),
        )
        setOpenSnackbar('College deleted successfully!')
        setError(null)
      }
    } catch (error) {
      console.error('Error deleting college:', error)
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteSelectedRows = async () => {
    setOpenSnackbar(null)
    setError(null)
    setIsLoading(true)
    setOpenDeleteRowsModal(false)
  
    
    let count =0;
    try {
    for (const row of selectedRows) {

        await deleteCollege(row.collegeId)
        count++
      }
    } catch (error) {
       setError()
       setError(`Failed to delete college(s): ${error.message}`)
    }
  
    setRowSelection([])
    setOpenSnackbar(`${count} college(s) deleted successfully.`)
  
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: 'collegeId',
        header: 'College Id',
        enableEditing: false,
        size: 150,
      },
      {
        accessorKey: 'collegeName',
        header: 'College Name',
        enableEditing: true,
        size: 150,
      },
      {
        accessorKey: 'region',
        header: 'Region',
        editVariant: 'select',
        editSelectOptions: selectRegion,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.region,
          helperText: validationErrors?.region,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              region: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: 'location',
        header: 'Location',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.location,
          helperText: validationErrors?.location,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              location: undefined,
            }),
        },
      },
      {
        accessorKey: 'state',
        header: 'State',
        editVariant: 'select',
        editSelectOptions: indStates,
        muiEditTextFieldProps: {
          required: true,
          select: true,
          error: !!validationErrors?.state,
          helperText: validationErrors?.state,
        },
      },
      {
        accessorKey: 'tier',
        header: 'Tier',
        editVariant: 'select',
        editSelectOptions: selectTier,
        muiEditTextFieldProps: {
          required: true,
          select: true,
          error: !!validationErrors?.tier,
          helperText: validationErrors?.tier,
        },
      },
      {
        accessorKey: 'tpoName',
        header: 'TPO Contact Name',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.tpoName,
          helperText: validationErrors?.tpoName,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              tpoName: undefined,
            }),
        },
      },
      {
        accessorKey: 'primaryEmail',
        header: 'TPO Email',
        muiEditTextFieldProps: {
          type: 'email',
          required: true,
          error: !!validationErrors?.primaryEmail,
          helperText: validationErrors?.primaryEmail,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              primaryEmail: undefined,
            }),
        },
      },

      {
        accessorKey: 'primaryContact',
        header: 'Primary Contact',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.primaryContact,
          helperText: validationErrors?.primaryContact,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              primaryContact: undefined,
            }),
        },
      },
      {
        accessorKey: 'secondaryContact',
        header: 'Secondary Contact',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.secondaryContact,
          helperText: validationErrors?.secondaryContact,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              secondaryContact: undefined,
            }),
        },
      },
      {
        accessorKey: 'addressLine1',
        header: 'Address Line 1',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.addressLine1,
          helperText: validationErrors?.addressLine1,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              addressLine1: undefined,
            }),
        },
      },
      {
        accessorKey: 'addressLine2',
        header: 'Address Line 2',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.addressLine2,
          helperText: validationErrors?.addressLine2,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              addressLine2: undefined,
            }),
        },
      },
      {
        accessorKey: 'pinCode',
        header: 'Pin Code',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.pinCode,
          helperText: validationErrors?.pinCode,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              pinCode: undefined,
            }),
        },
      },

      {
        accessorKey: 'collegeOwner',
        header: 'College Owner',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.collegeOwner,
          helperText: validationErrors?.collegeOwner,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              collegeOwner: undefined,
            }),
        },
      },
      {
        accessorKey: 'compensation',
        header: 'Compensation',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.compensation,
          helperText: validationErrors?.compensation,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              compensation: undefined,
            }),
        },
      },
    ],
    [validationErrors],
  )

  const table = useMaterialReactTable({
    columns,
    data: collegeList,
    enableRowSelection: true,
    initialState: { columnVisibility: { collegeId: false } },
    isLoading,
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    enableEditing: true,
    onRowSelectionChange: setRowSelection,

    state: { rowSelection },
    getRowId: row => row.collegeId,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),

    onCreatingRowSave: async ({ values, table }) => {
      setValidationErrors({})
      await createCollege(values)
      table.setCreatingRow(null)
    },

    onEditingRowCancel: () => setValidationErrors({}),

    onEditingRowSave: async ({ values, table }) => {
      setValidationErrors({})

      await updateCollege(values)
      table.setEditingRow(null)
    },
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant='h5' sx={{ textAlign: 'center' }}>
          Create New College
        </DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant='text' table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant='h5' sx={{ textAlign: 'center' }}>
          Edit College Details
        </DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant='text' table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title='Edit'>
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Delete'>
          <IconButton
            color='error'
            onClick={() => {
              setCollegeIdToDelete(row.original.collegeId)
              setOpenDeleteModal(true)
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => {
      const selectedRows = table
        .getSelectedRowModel()
        .flatRows.map(row => row.original)
        console.log(selectedRows);

      return (
        <div className='flex gap-5'>
          <Button
            variant='contained'
            onClick={() => {
              table.setCreatingRow(true)
            }}
          >
            Create New College
          </Button>

          <Button
            variant='contained'
            color='error'
            onClick={() => {
              setSelectedRows(selectedRows)
              setOpenDeleteRowsModal(true)
            }}
            disabled={selectedRows.length === 0}
          >
            Delete Selected
          </Button>
        </div>
      )
    },
  })

  return (
    <div className='flex flex-col w-full mx-5 mt-2 overflow-x-auto max-w-100%'>
      <h2 className={`text-2xl text-[#0087D5] font-bold mb-3`}>
        College and Contacts
      </h2>

      <MaterialReactTable
        table={table}
        updateCollege={updateCollege}
        createCollege={createCollege}
      />
      {renderDeleteModal()}
      {renderDeleteRowsModal()}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity='success'
          variant='filled'
          sx={{ width: '100%' }}
        >
          {openSnackbar}
        </Alert>
      </Snackbar>

      <Snackbar
        open={error}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity='error'
          variant='filled'
          color='error'
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default CandidateTable
  