import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
const reg='http://172.20.10.3:8080'
const columns = [
  { id: 'regularizeId', label: 'Ticket ID', minWidth: 80 ,  },
  { id: 'talentId', label: 'Employee ID', minWidth: 100 },
  { id: 'talentName', label: 'Employee Name', minWidth: 170 },
  { id: 'date', label: 'Date', minWidth: 100 },
  { id: 'checkin', label: 'Check-in', minWidth: 100 },
  { id: 'checkout', label: 'Check-out', minWidth: 100 },
  { id: 'approvalManager', label: 'Approval Manager', minWidth: 170 },
  { id: 'action', label: 'Actions', minWidth: 100 }
];



const Regularization = ({ data, handleApproval, handleDecline }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredData = Array.isArray(data) ? data.filter(row =>
    (row.talentId && typeof row.talentId === 'string' && row.talentId.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (row.talentName && typeof row.talentName === 'string' && row.talentName.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (row.date && typeof row.date === 'string' && row.date.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (row.approvalManager && typeof row.approvalManager === 'string' && row.approvalManager.toLowerCase().includes(searchQuery.toLowerCase()))
  ) : [];
  


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <br/>
      <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '1rem', marginLeft: '1rem', width: '20rem' }}
      />
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              
              {
                
                columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="left"
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow hover key={index}>
                <TableCell>{row.regularizeId}</TableCell>
                <TableCell>{`INC${row.talentId}`}</TableCell>
                <TableCell>{row.talentName}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.checkin}</TableCell>
                <TableCell>{row.checkout}</TableCell>
                <TableCell>{row.approvalManager}</TableCell>
                <TableCell>
                <Button variant="contained" color="success" onClick={() => handleApproval(row.regularizeId, row.checkin, row.checkout)}>Approval</Button>{" "}
                  <Button variant="contained" color="error" onClick={() => handleDecline(row.regularizeId)}>Decline</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get(`${reg}/cpm/regularize/getAll`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleApproval = async (id, checkin, checkout) => {
    try {
      const response = await axios.put(`${reg}/cpm/regularize/updateRegularize/${id}`, {
        checkin: checkin,
        checkout: checkout
      });
      console.log(`Approval action successful for row with id: ${id}`);
    } catch (error) {
      console.error(`Error approving row with id ${id}:`, error);
    }
    location.reload();
  };
  
  const handleDecline = async (id) => {
    try {
      const response = await axios.delete(`${reg}/cpm/regularize/deleteRegularize/${id}`);
      console.log(`Decline action successful for row with id: ${id}`);
    } catch (error) {
      console.error(`Error declining row with id ${id}:`, error);
    }
    location.reload();
  };

  return (
    <Regularization data={data} handleApproval={handleApproval} handleDecline={handleDecline} />
  );
};

export default App;
