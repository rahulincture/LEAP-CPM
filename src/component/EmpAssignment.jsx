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

//work in progress

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
        const response = await fetch('http://localhost:3057/admin/viewData')
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
        'http://localhost:3057/admin/insertCollegeData',
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
        `http://localhost:3057/admin/updateData/${parseInt(
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
        `http://localhost:3057/admin/deleteData/${collegeId}`,
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
  
    
  
    try {
    for (const row of selectedRows) {
        console.log(row)
        await deleteCollege(row.collegeId)
      }
    } catch (error) {
       setError()
       setError(`Failed to delete colleges: ${error.message}`)
    }
  
    setRowSelection([])
    setOpenSnackbar(`Successfully deleted colleges`)
  
  }

  const columns = useMemo(() => [
    {
      accessorKey: 'assignmentId',
      header: 'Assignment ID',
      enableEditing: true,
      size: 150,
      hide: true,
    },
    {
      accessorKey: 'assignmentWeek',
      header: 'Week',
      enableEditing: true,
      size: 150,
    },
    {
      accessorKey: 'assignmentName',
      header: 'Assignment Name',
      enableEditing: true,
      size: 150,
    },
    {
      accessorKey: 'assignmentDuedate',
      header: 'Due Date',
      enableEditing: true,
      size: 150,
    },
    {
      accessorKey: 'assignmentType',
      header: 'Assignment Type',
      enableEditing: true,
      size: 150,
    },
    {
      accessorKey: 'assignmentScore',
      header: 'Assignment Score',
      enableEditing: true,
      size: 150,
    },
    {
      accessorKey: 'assignmentTechnology',
      header: 'Assignment Technology',
      enableEditing: true,
      size: 150,
    },
    {
      accessorKey: 'assignmentStatus',
      header: 'Assignment Status',
      enableEditing: true,
      size: 150,
    },
    {
      accessorKey: 'assignmentFile',
      header: 'Assignment File',
      enableEditing: true,
      size: 150,
    },
  ], []);

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
        autoHideDuration={2000}
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
        autoHideDuration={2000}
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
