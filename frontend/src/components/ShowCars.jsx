import React from 'react'
import ListCars from './ListCars'

const ShowCars = ({data, loading}) => {

  return (
    <div>
      {
        loading ? <p className='text-center mt-5'>Loading...</p> : (
          <ListCars data={data} />
        )
      }
      
    </div>
  )
}

export default ShowCars