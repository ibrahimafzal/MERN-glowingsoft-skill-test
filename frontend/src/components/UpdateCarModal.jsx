import axios from 'axios';
import React, { useState } from 'react'
import Modal from 'react-modal';
import { toast } from 'react-toastify';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '400px'
    },
};


const UpdateCarModal = ({ children, car }) => {

    const [modalIsOpen, setIsOpen] = useState(false);

    const [updatedCar, setUpdatedCar] = useState({
        name: car?.name,
        condition: car?.condition,
        price: car?.price
    })

    const [loading, setLoading] = useState(false)

    const openModal = () => {
        setIsOpen(true);
    }


    const closeModal = () => {
        setIsOpen(false);
    }

    const { name, condition, price } = updatedCar

    const onChange = (e) => {
        setUpdatedCar({ ...updatedCar, [e.target.name]: e.target.value })
    }

    const token = JSON.parse(localStorage.getItem("user")).data.token

    const updateCar = async (id) => {
        try {
            setLoading(true)
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            await axios.put(`http://localhost:5000/car/${id}`, updatedCar, config)
            setLoading(false)
            toast.success("Updated successfully!")
        } catch (error) {
            toast.error(error?.message)
        }
    }

    return (
        <div>
            <button onClick={openModal}>{children}</button>
            <Modal
                isOpen={modalIsOpen}
                // onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='flex justify-between mb-4'>

                    <h2 className='capitalize font-bold text-xl'>{car.name}</h2>
                    <button className='font-bold' onClick={closeModal}>X</button>
                </div>

                <form onSubmit={() => updateCar(car?._id)}>
                    <div>
                        <label htmlFor="name" className='text-sm font-semibold mb-1'>Model Name</label>
                        <input
                            type="text"
                            name='name'
                            value={name}
                            onChange={onChange}
                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>

                    <div className='my-3'>
                        <label htmlFor="condition" className='text-sm font-semibold mb-1'>Model Name</label>
                        <input
                            type="text"
                            name='condition'
                            value={condition}
                            onChange={onChange}
                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>

                    <div>
                        <label htmlFor="price" className='text-sm font-semibold mb-1'>Model Name</label>
                        <input
                            type="text"
                            name='price'
                            value={price}
                            onChange={onChange}
                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    <button type='submit' className='btn w-full bg-green-200 px-3 py-2 mt-3'>{loading ? "Updating..." : "Update"}</button>
                </form>
            </Modal>
        </div>
    )
}

export default UpdateCarModal