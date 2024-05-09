import { Avatar, Dropdown, Navbar } from 'flowbite-react'
import { TbLogout } from 'react-icons/tb'
import { Link, useLocation } from 'react-router-dom'
export default function Header() {
  const path = useLocation().pathname
  return (
    <>
      <Navbar fluid rounded className='shadow-md'>
        <Navbar.Brand as={'div'}>
          <Link to={'/signin'}>
            <img
              src='https://incture.com/wp-content/uploads/2022/02/Incture-Logo-Blue-150x34-px.svg'
              className='mr-3 h-6 sm:h-9 p-1'
              alt='Incture Logo'
            />
          </Link>
          <span className='self-center whitespace-nowrap text-xl text-gray-700 font-semibold hidden lg:block'>
            {' '}
            | Campus Management Program
          </span>
        </Navbar.Brand>
        <div className='flex md:order-2'>
          <span className='text-md my-auto mr-2'>Hi, Rahul Kumar</span>
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt='User settings'
                img='https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?t=st=1714456930~exp=1714460530~hmac=7615ea45a09625b4c166c6233ece24749c78362f76d29e1429e3b5d3b035156f&w=740'
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>INC02763</span>
              <span className='block truncate text-sm font-medium'>
                rahulkumar@incture.com
              </span>
            </Dropdown.Header>
            <Dropdown.Item icon={TbLogout} className='text-red-500 font-medium'>
              Sign out
            </Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
      </Navbar>
    </>
  )
}
