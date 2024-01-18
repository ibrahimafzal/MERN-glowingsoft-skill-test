import React, { useEffect, useState } from 'react'
import NewCar from '../components/NewCar'
import ShowCars from '../components/ShowCars'
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword') || '';


  const getCars = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `http://localhost:5000/car/all-cars?keyword=${keyword}`
      );
      setLoading(false)
      setData(response?.data);
    } catch (error) {
      setLoading(false)
      console.error('Error fetching cars:', error.message);
    }
  };

  useEffect(() => {
    getCars();
  }, [keyword]);


  return (
    <div className='container mx-auto'>
      <NewCar />
      <ShowCars data={data} loading={loading} />
    </div>
  )
}

export default HomePage