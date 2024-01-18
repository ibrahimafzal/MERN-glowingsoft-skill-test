import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import defaultPic from "../assets/default_product.png"

const CarDetails = () => {

    const [carDetails, setCarDetails] = useState({})

    const params = useParams()
    const imgRef = useRef(null)

    const user = JSON.parse(localStorage.getItem("user"))?.data


    const getCarDetails = async (id) => {
        try {
            const { data } = await axios.get(`http://localhost:5000/car/${id}`)
            console.log("data => ", data)
            setCarDetails(data)
            
        } catch (error) {
            console.log(error)
        }
    }

    const setImgPreview = (url) => {
        imgRef.current.src = url
      }

    useEffect(() => {
        getCarDetails(params.id)
    }, [params.id])


    return (

        <section className="bg-white py-10">
            <div className="container max-w-screen-xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-5">
                    <aside>
                        <div className="border border-gray-200 shadow-sm p-3 text-center rounded mb-5">
                            <img
                                className="object-fill hover:object-none inline-block"
                                src={carDetails?.car?.pics[0]}
                                alt={carDetails?.car?.name}
                                width="340"
                                height="340"
                                ref={imgRef}
                            />
                        </div>
                        <div className="space-x-2 overflow-auto text-center whitespace-nowrap">
                            {
                                carDetails?.car?.pics?.map((img, idx) => (
                                    <a key={idx} className="inline-block border border-gray-200 p-1 rounded-md cursor-pointer"
                                        onClick={() => setImgPreview(img)}
                                    >
                                        <img
                                            className="w-14 h-10"
                                            src={carDetails?.car?.pics ? img : defaultPic}
                                            alt="Product title"
                                            width="600"
                                            height="400"
                                        />
                                    </a>
                                ))
                            }
                        </div>
                    </aside>
                    <main>
                        <h2 className="font-semibold text-2xl mb-4 capitalize">{carDetails?.car?.name}</h2>

                        <p className="mb-4 font-semibold text-xl">Price: ${carDetails?.car?.price}</p>

                        <p className="mb-4 text-gray-500 text-sm">
                            condition: {carDetails?.car?.condition}/10
                        </p>

                        {user && <ul className="mb-5">
                            <li className="mb-1">
                                {" "}
                                <b className="font-medium w-36 inline-block">
                                    Buy this Car:
                                </b>
                                <span className="text-gray-500">{user?.mobile}</span>
                            </li>
                        </ul>}
                    </main>
                </div>
            </div>
        </section>
    )
}

export default CarDetails