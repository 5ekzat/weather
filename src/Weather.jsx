import React, { useEffect } from 'react'
import axios from 'axios';
import './index.css'
import clearImage from './img/clear.png';
import rainImage from './img/rain.png';
import snowImage from './img/snow.png';
import cloudyImage from './img/cloudy.png';

const url ='https://api.openweathermap.org/data/2.5/weather?q='
// {city name}&appid={API key}
 const apiKey='f631ea87daddf959f8d7a12c30009e4c'
 console.log(url + 'japan' + '&appid=' + apiKey);

const Weather = () => {
    const [weatherData, setWeatherData]=React.useState(null)
    const [searchCity, setsearchCity]=React.useState('')
    const [error, setError] = React.useState(''); 


    const getWeather = async (city = 'japan') => {
      try {
          const { data } = await axios.get(`${url}${city}&appid=${apiKey}`);
          setWeatherData(data);
          setError(''); 
      } catch (error) {
          if (error.response && error.response.status === 404) {
              setError('404');
              setWeatherData(null); 
          } else {
              setError('Произошла ошибка при загрузке данных');
          }
      }
  };

  useEffect(() => {
      getWeather();
  }, []);

  if (error) {
      return <h1>{error}</h1>;
  }

  if (weatherData === null) {
      return <h1>Loading...</h1>;
  }
      console.log(weatherData);
      
      const changeSearchCity=(event)=>{
        console.log(event.target.value);
        setsearchCity(event.target.value)

      }
      const getCustomWeatherImage = (weatherData) => {
        const weatherType = weatherData.weather[0].main.toLowerCase();
        switch (weatherType.toLowerCase()) {
            case 'clear':
                return clearImage;
            case 'rain':
                return rainImage;
            case 'snow':
                return snowImage;
            case 'clouds':
                return cloudyImage;
            default:
                return `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
        }
    }
    

    //   getWeather();
      
  return (
    <div className='weather'>
      <div className="header">
        <h1>Прогноз погоды</h1>
      <form 
        onSubmit={(e) => {
             e.preventDefault(); 
             getWeather(searchCity) }}>
            <input 
            className='header-input'
            type="text" 
            value={searchCity} 
            onChange={changeSearchCity} 
            placeholder='Введите название города'/>
            <input
            className='header-btn'
             type="submit" />
        </form>
      </div>
      <div className="card">
        <div className="card-item">
        <h3>{weatherData.name}</h3>
        <h1> {Math.round(weatherData.main.temp - 273.15)}°C</h1>
        <p>{weatherData.weather[0].main}</p>
        <p>Ветер: {weatherData.wind.speed} км/ч</p> 
        <p>Влажность: {weatherData.main.humidity}%</p>
        </div>
      
        <img src={getCustomWeatherImage(weatherData)} alt="Weather icon" />


      </div>
       
    </div>
  )
}

export default Weather;