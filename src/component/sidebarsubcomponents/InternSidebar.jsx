import { Sidebar } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoIosClose } from 'react-icons/io'

export default function InternSidebar({ setShowInternSidebar }) {
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
          className='hover:cursor-pointer h-6 w-6 mb-0  hover:bg-gray-300'
          onClick={() => setShowInternSidebar(false)}
        />
      </div>
      <Sidebar
        aria-label='Sidebar with multi-level dropdown example'
        className='w-full md:w-56'
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup>
              <Sidebar.Item
                as={'div'}
                label='Admin'
                labelColor='dark'
              >
                Rahul Kumar
              </Sidebar.Item>

            <Link to='?tab=college-and-contact'>
              <Sidebar.Item as={'div'} active={tab === 'college-and-contact'}>
                Interns
              </Sidebar.Item>
            </Link>
            <Link to='?tab=campus-calendar'>
              <Sidebar.Item as={'div'} active={tab === 'campus-calendar'}>
                Assessment
              </Sidebar.Item>
            </Link>
            <Link to='?tab=candidates'>
              <Sidebar.Item as={'div'} active={tab === 'candidates'}>
                Attendance
              </Sidebar.Item>
            </Link>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  )
}
