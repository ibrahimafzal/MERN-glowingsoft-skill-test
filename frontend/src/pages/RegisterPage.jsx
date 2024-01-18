import React, { useState } from 'react'
import LOGO from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'


const RegisterPage = () => {
  const [data, setData] = useState({ name: "", email: "", mobile: "", password: "", pic: "" })
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()


  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  // START upload pic
  const postDetails = (pic) => {
    setLoading(true)
    if (pic === undefined) {
      toast.warn("Please select an image!")
    }

    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const formData = new FormData()
      formData.append('file', pic)
      formData.append('upload_preset', 'upload')
      formData.append('cloud_name', 'cloudinaryphoto')
      fetch("https://api.cloudinary.com/v1_1/cloudinaryphoto/image/upload", {
        method: 'post',
        body: formData
      })
        .then((res) => res.json())
        .then((res) => {
          setData({ ...data, pic: res.url.toString() })
          toast.success('Picture uploaded successfully!')
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
        })
    } else {
      toast.warn("Please select an image!")
      setLoading(false)
    }
  }
  // END upload pic


  // Sign up //
  const registerHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!data?.name || !data?.email || !data?.password || !data?.mobile) {
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

      const response = await axios.post("http://localhost:5000/user/register", data, config)
      toast('Registeration Successfully!')

      localStorage.setItem("user", JSON.stringify(response))
      setLoading(false)
      navigate("/")
    } catch (error) {
      console.log(error)
      toast.error('Error occured, Check your Email / Mobile')
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
          Register
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Full Name
            </label>
            <div className="mt-1">
              <input
                id="name"
                name="name"
                type="text"
                value={data?.name}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* Email */}
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
          {/* Mobile */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Mobile
            </label>
            <div className="mt-1">
              <input
                id="mobile"
                name="mobile"
                type="text"
                value={data?.mobile}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* Password */}
          <div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type='password'
                value={data?.password}
                onChange={handleChange}
                required
                className="block relative w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Upload your Picture
              </label>
            </div>
            <div className="mt-1">
              <input
                id="pic"
                name="pic"
                type='file'
                accept='image/*'
                onChange={(e) => postDetails(e.target.files[0])}

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
            onClick={registerHandler}
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage