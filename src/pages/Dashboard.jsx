import { useLocation } from 'react-router-dom'
import CollegeDatabase from '../component/CollegeDatabase'
import CandidateDatabase from '../component/CandidateDatabase'
import TalentDatabase from '../component/TalentDatabase'
import DashSidebar from '../component/DashSidebar'
import Performance from '../component/Performance'
import Attendance1 from '../component/attendancecomponents/Attendance1';
import Regularization from '../component/attendancecomponents/Regularization';
import DetailedAttendanceView from '../component/attendancecomponents/DetailedAttendanceView';

import { useEffect, useState } from 'react'

export default function Dashboard() {
  const location = useLocation()
  const [tab, setTab] = useState('')

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search])
  return (
    <div className='flex md:flex-row'>
      <DashSidebar />

      {tab === 'college-and-contact' && <CollegeDatabase />}
      {tab === 'candidates' && <CandidateDatabase />}
      {tab === 'talent' && <TalentDatabase />}
      {tab === 'performance' && <Performance />}
      {tab === 'attendance' && <Attendance1  />}
      {tab === 'regularization' && <Regularization/>}
      {tab === 'DetailedAttendanceView' && <DetailedAttendanceView/>}
    
    </div>
  )
}
