import React, { useEffect, useState } from 'react'
import './middle.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function GlobalInfo() {
  const [changedValue, setChangedValue] = useState('');
  const [searchedValue, setSearchedValue] = useState('');
  const [weather, setWeather] = useState();
  const [count, setCount] = useState(0)
  const handleChange = (event) => {
    setChangedValue(event.target.value)
  }
  const handleClick = () => {
    setSearchedValue(changedValue);

    setCount(count + 1)
  }

  useEffect(() => {
    if (!searchedValue && searchedValue === ""  && count > 0) {
      toast.error("Enter an area's name first!")
    }

  }, [searchedValue, count])

  useEffect(() => {
    const apikey = '73b62d39eb2b4ebe49ea36120892ace3'
    if (searchedValue) {
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchedValue}&appid=${apikey}`).then((res) => {
        return res.json();
      }).then((res) => {
        setWeather(res)
      })
    }
  }, [searchedValue])

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        type="error"
      />
      <h1 className='text-center'>Global</h1>
      <div className='underline-mid'>
      </div>

      <div className='input-div'>
        <label htmlFor="title">Input area's name : </label>
        <input type="text" placeholder="Enter here..." onChange={handleChange} value={changedValue} />
        <button className='button' onClick={handleClick}> Search</button>
      </div>

      <div>
        <h3>Weather information of the searched : </h3>
        {searchedValue ? (
          <h4>({searchedValue.toUpperCase()})</h4>
        ) : <h4>(No name found!)</h4>}
        <div className='underline'>

        </div>
        {weather && weather.list && weather.list[0] && weather.list[0].main && weather.list[0].main.feels_like ? (
          <h4> ⭐ Feels like : ({(weather.list[0].main.feels_like - 272.15).toFixed(2)}) <sup>o</sup>C</h4>
        ) : searchedValue === "" ? (
          <h4>Enter area name first!</h4>
        ) : (
          <h4>Loading Information..</h4>
        )}

        {weather && weather.list && weather.list[0] && weather.list[0].main && weather.list[0].main.temp_max ? (
          <h4> ⭐ Max-tempreture : ({(weather.list[0].main.temp_max - 272.15).toFixed(2)}) <sup>o</sup>C</h4>
        ) : searchedValue === "" ? (
          <h4>Enter area name first!</h4>
        ) : (
          <h4>Loading Information..</h4>
        )}

        {weather && weather.list && weather.list[0] && weather.list[0].main && weather.list[0].main.temp_min ? (
          <h4> ⭐ Min-tempreture : ({(weather.list[0].main.temp_min - 272.15).toFixed(2)}) <sup>o</sup>C</h4>
        ) : searchedValue === "" ? (
          <h4>Enter area name first!</h4>
        ) : (
          <h4>Loading Information..</h4>
        )}

        {weather && weather.list && weather.list[0] && weather.list[0].main && weather.list[0].main.humidity ? (
          <h4> ⭐ Humidity : {weather.list[0].main.humidity}</h4>
        ) : searchedValue === "" ? (
          <h4>Enter area name first!</h4>
        ) : (
          <h4>Loading Information..</h4>
        )}

        {weather && weather.list && weather.list[1] && weather.list[1].weather && weather.list[1].weather[0].description ? (
          <h4> ⭐ Weather : {weather.list[1].weather[0].description}</h4>
        ) : searchedValue === "" ? (
          <h4>Enter area name first!</h4>
        ) : (
          <h4>Loading Information..</h4>
        )}
      </div>
    </div>
  )
}
