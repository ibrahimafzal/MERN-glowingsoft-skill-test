import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import UpdateCarModal from './UpdateCarModal'

const CarItem = ({ car }) => {

    const user = JSON.parse(localStorage.getItem("user"))?.data

    const token = user?.token

    const deleteTheCar = async (id) => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            await axios.delete(`http://localhost:5000/car/${id}`, config)
            toast.success("Car deleted.")
            window.location.reload(true);
        } catch (error) {
            toast.error(error?.message)
        }
    }


    return (
        <div className="relative mb-3 h-[16rem] flex w-full max-w-[20rem] flex-col overflow-hidden rounded-lg border border-gray-100 bg-[#CCFFD4] shadow-md">
            <div className="mt-2 mx-2">
                <div className='flex justify-between mb-2'>
                    <Link to={`/details/${car?._id}`}>
                        <h5 className="tracking-tight text-slate-900 hover:text-blue-600 text-lg font-bold capitalize">{car?.name}</h5>
                    </Link>
                    <div className="flex items-center gap-3">
                        {user?.role === 'admin' &&
                            <>
                                <button
                                    onClick={() => { deleteTheCar(car?._id) }}
                                    className='btn rounded-full bg-red-500 p-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                                <UpdateCarModal car={car}>
                                    <button className='btn rounded-full bg-red-500 p-1'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                        </svg>
                                    </button>
                                </UpdateCarModal>
                            </>
                        }
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <img
                        className="object-cover w-[15rem] h-[9rem]"
                        src={car?.pics[0] ? car?.pics[0] : "/images/default_product.png"}
                        alt="product"
                    />
                    <div className='text-xs text-gray-500 font-semibold'>
                        <p>${car?.price}</p>
                        <p className='flex gap-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                            </svg>
                            {car?.condition}
                        </p>
                        <p className='flex gap-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                            </svg>
                            doc
                        </p>
                    </div>

                </div>
                <div>
                    <div className='flex gap-2 overflow-x-scroll overflow-hidden hide-scrollbar'>
                        {
                            car?.pics.map((pic, idx) => (
                                <img key={idx} src={pic} alt="pic" className='w-14 p-1 mt-2' />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CarItem