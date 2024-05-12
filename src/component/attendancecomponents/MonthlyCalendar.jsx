import React, { useState } from 'react';
import { Calendar, Badge, Typography, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const MonthlyCalendar = () => {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
  const [mode, setMode] = useState('month');
  const [attendanceData, setAttendanceData] = useState([
    {
      date: '2023-05-10',
      status: 'present',
    },
    {
      date: '2023-05-12',
      status: 'absent',
    },
    {
      date: '2023-05-15',
      status: 'present',
    },
  ]);

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
    const start = value.clone().startOf('month');
    const end = value.clone().endOf('month');
  
    const headerText = `${months[month]}, ${year}`;
  
    const prevMonth = () => {
      const newValue = value.clone().subtract(1, 'month');
      onChange(newValue, 'month');
    };
  
    const nextMonth = () => {
      const newValue = value.clone().add(1, 'month');
      onChange(newValue, 'month');
    };
  
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 8, color: 'white', gap:15}}>
        <Button shape="circle" icon={<LeftOutlined />} onClick={prevMonth}  />
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