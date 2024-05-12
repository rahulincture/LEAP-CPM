import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useState } from 'react';

import { useEffect } from 'react';
const columns = [
  { id: 'talentName', label: 'Talent Name', minWidth: 170 },
  { id: 'talentCategory', label: 'Talent Category', minWidth: 170 },
  { id: 'officeLocation', label: 'Office Location', minWidth: 170 },
  { id: 'ekYear', label: 'Ek Year', minWidth: 170 },
  { id: 'status', label: 'Status', minWidth: 170 },
  { id: 'date', label: 'Date', minWidth: 170 },
  { id: 'checkin', label: 'Check In', minWidth: 170 },
  { id: 'checkout', label: 'Check Out', minWidth: 170 },
];

function createData(talentName, talentCategory, officeLocation, ekYear, status, date, checkin, checkout) {
  return { talentName, talentCategory, officeLocation, ekYear, status, date, checkin, checkout };
}

const rows = [
  createData('John Doe', 'Developer', 'New York', '2022', 'Present', '2024-05-01', '09:00', '18:00'),
  createData('Jane Doe', 'Designer', 'Los Angeles', '2023', 'Absent', '2024-05-02', '09:30', '17:30'),
];

export default function WeeklyCalendar() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [startDate, setStartDate] = useState(new Date());
  const [fetchedtalentId, setfetchedTalentId] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const fetched = urlParams.get('talentId');
    setfetchedTalentId(fetched);
  }, []);

  const decreaseWeek = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(newStartDate.getDate() - 7);
    setStartDate(newStartDate);
  };

  const increaseWeek = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(newStartDate.getDate() + 7);
    setStartDate(newStartDate);
  };

  const startOfWeek = new Date(startDate);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  const endOfWeek = new Date(startDate);
  endOfWeek.setDate(startOfWeek.getDate() + 6);


  return (
    <div>
      <Paper sx={{ width: '100%' }}>
        <TableContainer sx={{ maxHeight: 440, marginTop: 12 }}>
          <div className='flex flex-row mt-4 justify-center items-center gap-4'>
            <Button shape="circle" icon={<LeftOutlined />} onClick={decreaseWeek} />
            <div className='text-white bg-blue-500 p-4 rounded-full font-bold'>{`${startOfWeek.toLocaleDateString()} - ${endOfWeek.toLocaleDateString()}`}</div>
            <Button onClick={increaseWeek} shape="circle" icon={<RightOutlined />} />
          </div>
          <Table stickyHeader aria-label="sticky table" className='mt-4'>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        // Conditionally apply different styles based on the value of the 'Status' column
                        let cellStyle = {}; // Default style
                        if (column.id === 'status') {
                          cellStyle = { color: value === 'Present' ? 'green' : 'red' };
                        }
                        if (column.id === 'checkin') {
                          cellStyle = { color:'green' };
                        }
                        if (column.id === 'checkout') {
                          cellStyle = { color:'red' };
                        }
                        return (
                          <TableCell key={column.id} align={column.align} style={cellStyle}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
