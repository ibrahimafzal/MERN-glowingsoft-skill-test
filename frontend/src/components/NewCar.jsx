import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const NewCar = () => {

    const [car, setCar] = useState({
        name: "",
        condition: "",
        price: "",
        docs: "",
        pics: []
    })

    const token = JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user"))?.data?.token : ""

    const { name, condition, price, pics, docs } = car

    // upload car pics //
    const postDetails = (files) => {
        if (!files || files.length === 0) {
            toast.warn("Please select image(s)!");
            return;
        }

        const uploadedUrls = [];

        // Process each selected file
        const uploadPromises = Array.from(files).map((file) => {
            return new Promise((resolve, reject) => {
                if (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg") {
                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('upload_preset', 'upload');
                    formData.append('cloud_name', 'cloudinaryphoto');

                    fetch("https://api.cloudinary.com/v1_1/cloudinaryphoto/image/upload", {
                        method: 'post',
                        body: formData
                    })
                        .then((res) => res.json())
                        .then((res) => {
                            uploadedUrls.push(res.url.toString());
                            toast.success('Pics uploaded successfully!')
                            resolve();
                        })
                        .catch((err) => {
                            console.log(err);
                            reject(err);
                        });
                } else {
                    reject("Please select images in JPEG/JPG or PNG format only!");
                }
            });
        });

        Promise.all(uploadPromises)
            .then(() => {
                // All uploads completed, update the pics array
                setCar({ ...car, pics: [...car.pics, ...uploadedUrls] });
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    // upload car docs starts //
    const uploadDocs = (file) => {

        console.log("files => ", file)
        if (file === undefined) {
            toast.warn("Please select a document!")
        }

        if (file.type === "application/pdf") {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('upload_preset', 'upload')
            formData.append('cloud_name', 'cloudinaryphoto')
            fetch("https://api.cloudinary.com/v1_1/cloudinaryphoto/image/upload", {
                method: 'post',
                body: formData
            })
                .then((res) => res.json())
                .then((res) => {
                    setCar({ ...car, docs: res.url.toString() })
                    toast.success('Document uploaded successfully!')
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            toast.warn("Please select document in pdf or word format!")
        }
    };
    // upload car docs ends //

    const onChange = (e) => {
        setCar({ ...car, [e.target.name]: e.target.value })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await axios.post("http://localhost:5000/car/", car, config)


            if (data) {
                toast.success("Car Added Successfully")
                window.location.reload(true);
            }
        } catch (error) {
            toast.success(error?.response?.data?.message)
            console.log(error?.response?.data?.message)
        }
    }

    return (
        <div className=' bg-white lg:h-44 h-full mt-6 rounded-xl p-4 shadow-lg '>
            <div className="mb-8">
                <h1 className="text-md md:text-2xl font-semibold text-black">
                    Add Car
                </h1>

            </div>

            {/* Model name */}
            <div className='flex flex-col md:flex-row gap-6 md:justify-start justify-center items-center'>
                <input
                    type="text"
                    name='name'
                    value={name}
                    placeholder='Model Name'
                    onChange={onChange}
                    className='rounded-md w-full md:mb-0 mb-3 lg:w-56 md:w-44 border border-1 text-sm px-3 py-6'
                    required
                />
                {/* Price */}
                <input
                    type="text"
                    placeholder='Price'
                    className='rounded-md md:mb-0 mb-3 w-full lg:w-56 md:w-44 border border-1 text-sm px-3 py-6'
                    value={price}
                    name='price'
                    onChange={onChange}
                    required
                />
                {/* Condition */}
                <input
                    type="text"
                    placeholder='Condition (out of 10)'
                    className='rounded-md md:mb-0 mb-3 w-full lg:w-56 md:w-44 border border-1 text-sm px-3 py-6'
                    value={condition}
                    name='condition'
                    onChange={onChange}
                    required
                />
                {/* Docs */}
                <label htmlFor="docInput" className="flex items-center justify-between cursor-pointer md:mb-0 mb-3 rounded-md w-full lg:w-56 md:w-44 border border-1 text-sm px-3 py-4">
                    <span className="block text-gray-400">Docs</span>
                    <div className="flex items-center flex-col">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>
                        <span className='text-gray-400 text-[8px]'>pdf format</span>
                    </div>
                    <input
                        id="docInput"
                        type="file"
                        className="hidden"
                        onChange={(e) => uploadDocs(e.target.files[0])}
                        accept=".pdf, .doc, .docx"
                        required
                    />
                </label>
                {/* pics */}
                <label htmlFor="fileInput" className="flex items-center justify-between cursor-pointer md:mb-0 mb-3 rounded-md w-full lg:w-56 md:w-44 border border-1 text-sm px-3 py-4">
                    <span className="text-gray-400">Pictures</span>
                    <div className="flex items-center flex-col">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>
                        <span className='text-gray-400 text-[8px]'>min 3 / Max 9</span>
                    </div>
                    <input
                        id="fileInput"
                        type="file"
                        className="hidden"
                        accept='image/jpeg, image/png, image/jpg'
                        onChange={(e) => postDetails(e.target.files)}
                        multiple
                        min={3}
                        max={9}
                        required
                    />
                </label>
                <button
                    className='btn bg-[#2E9E91] w-full md:w-auto px-28 md:py-5 py-2 rounded text-white'
                    onClick={submitHandler}
                >
                    Add
                </button>
            </div>
        </div>
    )
}

export default NewCar