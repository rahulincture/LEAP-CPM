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
import axios from 'axios';
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

export default function WeeklyCalendar() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [startDate, setStartDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState([]);
  const perBaseUrl = "http://172.20.10.3:8080"
  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
                  // it is talentid from attendance table on front edn to give your own value directly give in fetched

        const urlParams = new URLSearchParams(window.location.search);
        const fetched = urlParams.get('talentId');
        const start = new Date(startDate); 
        const end= new Date(startDate);
        end.setDate(start.getDate() + 6);
        console.log(`${perBaseUrl}/cpm/attendance/getAttendanceByDateRangeAndTalent?startDate=${formatDate(start)}&endDate=${formatDate(end)}&talentId=${fetched}`)
       
        const response = await axios.get(`${perBaseUrl}/cpm/attendance/getAttendanceByDateRangeAndTalent?startDate=${formatDate(start)}&endDate=${formatDate(end)}&talentId=${fetched}`);
        setAttendanceData(response.data);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };
  
    
      fetchAttendanceData();
    
  }, [startDate]);

  const rows = attendanceData.map((attendance) =>
    createData(
      attendance.talentName,
      attendance.talentCategory,
      attendance.officeLocation,
      attendance.ekYear,
      attendance.status,
      attendance.date,
      attendance.checkin,
      attendance.checkout
    )
  );

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

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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
                        let cellStyle = {};
                        if (column.id === 'status') {
                          cellStyle = { color: value === 'Present' ? 'green' : 'red' };
                        }
                        if (column.id === 'checkin') {
                          cellStyle = { color: 'green' };
                        }
                        if (column.id === 'checkout') {
                          cellStyle = { color: 'red' };
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