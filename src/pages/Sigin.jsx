import { Link, Navigate, useNavigate } from 'react-router-dom'; // Import useHistory hook
import { useState } from 'react';
import { TextInput, Button, Checkbox, Label, Spinner } from 'flowbite-react';
import { RiCompassDiscoverFill } from 'react-icons/ri';
import { HiCheck } from 'react-icons/hi';

function Signin() {
    const navigate = useNavigate();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const history = useNavigate(); // Access history for redirection
    const signBaseUrl = "http://172.20.10.8:3057"
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(`${signBaseUrl}/user/login`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                // Redirect to dashboard upon successful authentication
                navigate('/dashboard');
            } else {
                setIsLoading(false);
                setErrorMessage('Invalid email or password. Please try again.');
            }
            setTimeout(() => {
                setIsLoading(false);
                setErrorMessage('Invalid email or password. Please try again.');
            }, 1500);
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img
                        className="mx-auto h-12 w-auto"
                        src="https://incture.com/wp-content/uploads/2022/02/Incture-Logo-Blue-150x34-px.svg"
                        alt="Incture Logo"
                    />
                    <h4 className="mt-4 text-center text-xl text-gray-900">Sign in to your account</h4>
                </div>
                <form className="mt-8 mb-10" onSubmit={handleSubmit}>
                    <div className="rounded-md">
                        <div>
                            <Label value="Email address" />
                            <TextInput
                                type="email"
                                placeholder="Email address"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoFocus
                                className="appearance-none rounded-none relative block w-full placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-3"
                            />
                        </div>
                        <div>
                            <Label value="Password" />
                            <TextInput
                                type={isPasswordVisible ? 'text' : 'password'}
                                placeholder="Password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="appearance-none rounded-none relative block w-full placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <Checkbox
                            onChange={() => setIsPasswordVisible(!isPasswordVisible)}
                            checked={isPasswordVisible}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <Label value="Show password" className="ml-2 text-sm text-gray-600" />
                    </div>

                    <div>
                        <Button
                            gradientDuoTone={['#657DE9', '#C23BD7']}
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-2"
                        >
                            {isLoading ? <Spinner /> : 'Signin'}
                        </Button>
                    </div>
                </form>

                {errorMessage && (
                    <p className="mt-2 text-sm text-red-600 text-center">{errorMessage}</p>
                )}

                <p className="text-sm text-gray-600 text-center">
                    Don&apos;t have an account?{' '}
                    <Link to='/sign-up' className="font-medium text-indigo-600 hover:text-indigo-500">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Signin;
