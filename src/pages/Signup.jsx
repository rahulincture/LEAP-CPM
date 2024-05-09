import { Link } from 'react-router-dom'
import { useState } from 'react'
import { TextInput, Button, Label, Spinner } from 'flowbite-react'

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [passwordMatchError, setPasswordMatchError] = useState(false)
  const [otpVerification, setOtpVerification] = useState(false)
  const [otp, setOtp] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setPasswordMatchError(true)
      return
    }
    setPasswordMatchError(false)
    setIsLoading(true)
    try {
      const userData = {
        name,
        email,
        password,
        confirmPassword,
        phoneNumber,
      }
      // const response = await axios.post('http://your-backend-url/api/signup', userData);
      // console.log(response.data); // Log the response from backend
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }
  const isFormValid =
    name && email && password && confirmPassword && phoneNumber
  return (
    <div className='flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 '>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <img
            className='mx-auto h-12 w-auto'
            src='https://incture.com/wp-content/uploads/2022/02/Incture-Logo-Blue-150x34-px.svg'
            alt='Incture Logo'
          />
          <h4 className='mt-4 text-center text-xl text-gray-900'>
            Create your account
          </h4>
        </div>
        <form className='mt-4' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <div>
              <Label value='Full Name' />
              <TextInput
                type='text'
                placeholder='Full Name'
                id='name'
                value={name}
                onChange={e => setName(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div>
              <Label value='Email Address' />
              <TextInput
                type='email'
                placeholder='Email Address'
                id='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label value='Password' />
              <TextInput
                type='password'
                placeholder='Password'
                id='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <Label value='Confirm Password' />
              <TextInput
                type='password'
                placeholder='Confirm Password'
                id='confirmPassword'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {passwordMatchError && (
              <p className='text-red-500 text-sm'>Passwords do not match.</p>
            )}
            <div>
              <Label value='Phone Number' />
              <TextInput
                type='tel'
                placeholder='Phone Number'
                id='phoneNumber'
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Button
              type='button'
              disabled={!isFormValid || isLoading || otpVerification}
              onClick={() => setOtpVerification(true)}
              className='w-full flex justify-center  rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-gradient-to-r focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 mt-3'
            >
              {isLoading ? <Spinner /> : 'Verify Email'}
            </Button>
            {otpVerification && (
              <div className='flex flex-col gap-1'>
                <TextInput
                  type='number'
                  placeholder='Enter OTP here'
                  id='otp'
                  onChange={e => setOtp(e.target.value)}
                  Spinner={false}
                  className='mt-2'
                />
                <Button
                  type='submit'
                  disabled={!otp}
                  onClick={() => setOtpVerification(true)}
                  className='w-full flex justify-center  rounded-md text-sm font-medium text-white bg-blue-500 hover:bg-gradient-to-r focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 mt-3'
                >
                  {isLoading ? <Spinner /> : 'Submit'}
                </Button>
              </div>
            )}
          </div>
        </form>

        {errorMessage && (
          <p className='mt-2 text-sm text-red-600 text-center'>
            {errorMessage}
          </p>
        )}

        <p className='mt-2 text-sm text-gray-600 text-center'>
          Already have an account?{' '}
          <Link
            to='/signin'
            className='font-medium text-indigo-600 hover:text-indigo-500'
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
