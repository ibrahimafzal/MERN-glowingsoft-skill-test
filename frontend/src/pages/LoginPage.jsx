import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios'
import LOGO from '../assets/logo.png'


const LoginPage = () => {
    const [data, setData] = useState({ email: "", password: "" })
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()


    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const loginHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (!data?.email || !data?.password) {
            toast.warn('Please Fill all the Fields!')
            setLoading(false)
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            const response = await axios.post("http://localhost:5000/user/login", data, config)
            setLoading(false)
            toast('Login Successfully!')

            localStorage.setItem("user", JSON.stringify(response))
            navigate("/")

        } catch (error) {
            toast.error('Something went wrong, Please try again!')
        }

        setLoading(false)
    }


    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                className='mx-auto w-[9.5rem]'
                 src={LOGO}
                  alt="logo"
                   />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Login
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email
                        </label>
                        <div className="mt-1">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={data?.email}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-1">
                            <input
                                id="password"
                                type='password'
                                name="password"
                                value={data?.password}
                                onChange={handleChange}
                                required
                                className="block relative w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            disabled={loading}
                            onClick={loginHandler}
                        >
                            Login
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage