import React from 'react'
import CarItem from './CarItem'
import CustomPagination from "../components/CustomPagination"

const ListCars = ({ data }) => {
    return (
        <div>
            <h1 className='text-2xl font-bold my-5'>Show Cars</h1>
            <div className='flex md:justify-start justify-center gap-3 flex-wrap'>
                {
                    data.cars?.map((car) => (
                        <CarItem car={car} key={car?._id} />
                    ))
                }
            </div>
            {data?.cars && (
                <CustomPagination
                    resPerPage={data?.resPerPage}
                    carCount={data?.carCount}
                />
            )}
        </div>
    )
}

export default ListCars