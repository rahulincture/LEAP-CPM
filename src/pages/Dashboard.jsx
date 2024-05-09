import { useLocation } from 'react-router-dom'
import CollegeDatabase from '../component/CollegeDatabase'
import DashSidebar from '../component/DashSidebar'

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
    
    </div>
  )
}
