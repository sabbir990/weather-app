import React, { useEffect, useState } from 'react';
import './middle.css'

export default function LocalInfo() {
  const [areaInfo, setAreaInfo] = useState();
  const [lati, setLati] = useState();
  const [longi, setLongi] = useState();
  const [weather, setWeather] = useState();
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  const showPosition = (position) => {
    setLati(position.coords.latitude);
    setLongi(position.coords.longitude);
  }
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition)
  }

  useEffect(() => {

    if (lati && longi) {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${lati}&lon=${longi}&format=json`;

      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setAreaInfo(res);

          if (res && res.address && res.address.town) {

            if (res.address.town) {
              const apikey = '73b62d39eb2b4ebe49ea36120892ace3';
              const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${res.address.town}&appid=${apikey}`;

              const fetchData = async () => {
                try {
                  const call = await fetch(weatherUrl);
                  const response = await call.json();
                  setWeather(response);
                } catch (error) {
                  console.error('Error fetching weather data:', error);
                }
              };

              fetchData();
            }
          }
        })
        .catch((error) => {
          console.error('Error fetching location data:', error);
        });
    }

  }, [lati, longi])

  useEffect(() => {

    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)

    return () => clearInterval(interval);

}, [time])


  return (
    <div>
      <h1 className='text-center'>Local</h1>
      <div className='underline-mid'>

      </div>
      <h3>Area Informations : </h3>
      <div className='underline'>

      </div>
      {areaInfo && areaInfo.display_name ? <h4> Current Area : {areaInfo.display_name}</h4> : <h4>Loading location...</h4>}
      <br /><br />
      <h3>Weather informations of current area</h3>
      <div className='underline'></div>
      {weather && weather.list && weather.list[0] && weather.list[0].main && weather.list[0].main.feels_like ? (
        <h4> ⭐ Feels like : ({(weather.list[0].main.feels_like - 272.15).toFixed(2)})<sup>o</sup> C </h4>
      ) : (
        <h4>Loading information..</h4>
      )}

      {weather && weather.list && weather.list[0] && weather.list[0].main && weather.list[0].main.temp_min ? (
        <h4> ⭐ Minimum Tempreture of the season : ({(weather.list[0].main.temp_min - 272.15).toFixed(2)})<sup>o</sup> C </h4>
      ) : (
        <h4>Loading information..</h4>
      )}

      {weather && weather.list && weather.list[0] && weather.list[0].main && weather.list[0].main.temp_max ? (
        <h4> ⭐ Maximum Tempreture of the season : ({(weather.list[0].main.temp_max - 272.15).toFixed(2)})<sup>o</sup> C </h4>
      ) : (
        <h4>Loading information..</h4>
      )}

      {weather && weather.list && weather.list[0] && weather.list[0].main && weather.list[0].main.humidity ? (
        <h4> ⭐ Humidity : {(weather.list[0].main.humidity)}</h4>
      ) : (
        <h4>Loading information..</h4>
      )}
      {weather && weather.list && weather.list[1] && weather.list[1].weather && weather.list[1].weather[0] && weather.list[1].weather[0].description ? (
        <h4> ⭐ Weather : {weather.list[1].weather[0].description}</h4>
      ) : <h4>Loading information..</h4>}

      {time ? (
        <h4> ⭐ Current time : {time}</h4>
      ) : <h4> Loading information..</h4>}
    </div>
  )
}
