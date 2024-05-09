import { Sidebar } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoIosClose } from 'react-icons/io'

export default function EmployeesSidebar({ setShowEmployeesSidebar }) {
  const [tab, setTab] = useState('')

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search])
  return (
    <div className='md:w-56'>
      <div className='flex justify-end bg-[#F9FAFB] h-[14px]'>
        <IoIosClose
          className='hover:cursor-pointer h-6 w-6 mb-0 hover:bg-gray-300'
          onClick={() => setShowEmployeesSidebar(false)}
        />
      </div>
      <Sidebar
        aria-label='Sidebar with multi-level dropdown example'
        className='w-full md:w-56'
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item as={'div'} label='Admin' labelColor='dark'>
              Rahul Kumar
            </Sidebar.Item>
            <Sidebar.Collapse label='Attendance'>
              <Link to='#'>
                <Sidebar.Item as={'div'}>FTE&apos;s</Sidebar.Item>
              </Link>
              <Link to='#'>
                <Sidebar.Item as={'div'}>Interns</Sidebar.Item>
              </Link>
              <Link to='#'>
                <Sidebar.Item as={'div'}>Trainee</Sidebar.Item>
              </Link>
              <Link to='#'>
                <Sidebar.Item as={'div'}>Online Interns</Sidebar.Item>
              </Link>
            </Sidebar.Collapse>
            <Sidebar.Collapse label='Leave'>
              <Link to='#'>
                <Sidebar.Item as={'div'}>Interns</Sidebar.Item>
              </Link>
            </Sidebar.Collapse>
            <Sidebar.Collapse label='Performance'>
              <Link to='#'>
                <Sidebar.Item as={'div'}>FTE&apos;s</Sidebar.Item>
              </Link>
              <Link to='#'>
                <Sidebar.Item as={'div'}>Interns</Sidebar.Item>
              </Link>
              <Link to='#'>
                <Sidebar.Item as={'div'}>Trainee</Sidebar.Item>
              </Link>
              <Link to='#'>
                <Sidebar.Item as={'div'}>Online Interns</Sidebar.Item>
              </Link>
            </Sidebar.Collapse>
            <Link to='?tab=talent'>
              <Sidebar.Item as={'div'} active={tab === 'talent'}>
                Talent
              </Sidebar.Item>
            </Link>
            <Link to='?tab=training'>
              <Sidebar.Item as={'div'} active={tab === 'training'}>
                Training
              </Sidebar.Item>
            </Link>
            <Link to='?tab=daily-work-tracker'>
              <Sidebar.Item as={'div'} active={tab === 'daily-work-tracker'}>
                Daily Work Tracker
              </Sidebar.Item>
            </Link>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  )
}
