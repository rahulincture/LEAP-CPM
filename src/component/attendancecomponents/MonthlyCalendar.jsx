import React, { useEffect, useState } from 'react';
import { Calendar, Badge, Typography, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import axios from 'axios';
import { format } from 'date-fns';
const MonthlyCalendar = () => {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const [mode, setMode] = useState('month');
    const [startDate, setStartDate] = useState(() => {
      const today = new Date();
      return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-01`;
    });
    const [attendanceData, setAttendanceData] = useState([]);
    const perBaseUrl = "http://172.20.10.3:8080"
    useEffect(() => {
      const fetchAttendanceData = async () => {
        try {
          // it is talentid from attendance table on front edn to give your own value directly give in fetched
            const urlParams = new URLSearchParams(window.location.search);
            const fetched = urlParams.get('talentId');
            const start = new Date(startDate);
            const end = new Date(start.getFullYear(), start.getMonth() + 1, 0); // Calculate the last day of the month
            const formattedStartDate = format(start, 'yyyy-MM-dd');
            const formattedEndDate = format(end, 'yyyy-MM-dd');
           console.log(`${perBaseUrl}/cpm/attendance/getAttendanceByDateRangeAndTalent?startDate=${formattedStartDate}&endDate=${formattedEndDate}&talentId=${fetched}`)
            const response = await axios.get(`${perBaseUrl}/cpm/attendance/getAttendanceByDateRangeAndTalent?startDate=${formattedStartDate}&endDate=${formattedEndDate}&talentId=${fetched}`);
            
            setAttendanceData(response.data);
        } catch (error) {
            console.error('Error fetching attendance data:', error);
        }
    };


        
            fetchAttendanceData();
        

    }, [startDate]);

    const onPanelChange = (value, mode) => {
        setMode(mode);
    };


    const getListData = (value) => {
        const listData = attendanceData.filter((data) => data.date === value.format('YYYY-MM-DD'));
        return listData.map((data, index) => (
            <li key={index}>
                <Badge status={data.status === 'present' ? 'success' : 'error'} text={data.status} />
            </li>
        ));
    };

    const cellRender = (value) => {
        const listData = getListData(value);
        return <ul>{listData}</ul>;
    };

    const renderHeader = ({ value, onChange, type }) => {
        const year = value.year();
        const month = value.month();
        const headerText = `${months[month]}, ${year}`;

        const prevMonth = () => {
            const newValue = value.clone().subtract(1, 'month');
            onChange(newValue, 'month');
            setStartDate(newValue.clone().startOf('month').format('YYYY-MM-01'));
        };

        const nextMonth = () => {
            const newValue = value.clone().add(1, 'month');
            onChange(newValue, 'month');
            setStartDate(newValue.clone().startOf('month').format('YYYY-MM-01'));
           
        };

        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 8, color: 'white', gap: 15 }}>
                <Button shape="circle" icon={<LeftOutlined />} onClick={prevMonth} />
                <Typography.Text style={{ fontWeight: 'bold' }} className='text-white bg-blue-500 p-4 rounded-full'>{headerText}</Typography.Text>
                <Button shape="circle" icon={<RightOutlined />} onClick={nextMonth} />
            </div>
        );
    };

    return (
        <div>
            <Calendar cellRender={cellRender} mode={mode} onPanelChange={onPanelChange} headerRender={renderHeader} />
        </div>
    );
};

export default MonthlyCalendar;
