import React, { useState, useEffect } from "react";
import './WeatherApp.css';
import clear from '../Assets/clear.png';
import cloud from '../Assets/cloud.png';
import snow from '../Assets/snow.png';
import rain from '../Assets/rain.png';
import drizzle from '../Assets/drizzle.png';
import humidity from '../Assets/humidity.png';
import wind from '../Assets/wind.png';
import question from '../Assets/question.png'

const WeatherApp = () => {
    const [cityNotFound, setCityNotFound] = useState(false);
    const [cityNotSelected, setCityNotSelected] = useState(false);
    const [humidities, setHumidities] = useState('');
    const [winds, setWinds] = useState('');
    const [temprature, setTemprature] = useState('');
    const [location, setLocation] = useState('');
    const [icon, setIcon] = useState(clear);

    useEffect(() => {
       searchByCountry('syria');
       setCityNotSelected(false);
    }, []);
    let api_key = '8763ca1db3f32c21fbade214f9e358ba';
    const searchByCountry = async (city) => {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;
        let response = await fetch(url);
        let data = await response.json();
        if(data.cod && data.cod === 200){
            setCityNotFound(false);
            setHumidities(data.main.humidity);
            setWinds(data.wind.speed);
            setTemprature(data.main.temp);
            setLocation(data.name);
            if(data.weather && data.weather[0].icon === '01d' || data.weather[0].icon === '01n' ) {
                setIcon(clear);
            } else if(data.weather && data.weather[0].icon === '02d' || data.weather[0].icon === '02n' ) {
                setIcon(cloud);
            } else if(data.weather && data.weather[0].icon === '03d' || data.weather[0].icon === '03n' ) {
                setIcon(drizzle);
            } else if(data.weather && data.weather[0].icon === '04d' || data.weather[0].icon === '04n' ) {
                setIcon(drizzle);
            } else if(data.weather && data.weather[0].icon === '09d' || data.weather[0].icon === '09n' ) {
                setIcon(rain);
            } else if(data.weather && data.weather[0].icon === '10d' || data.weather[0].icon === '10n' ) {
                setIcon(rain);
            } else if(data.weather && data.weather[0].icon === '13d' || data.weather[0].icon === '13n' ) {
                setIcon(snow);
            }
        } else {
            setCityNotFound(true);
            setIcon(question);
            setHumidities('');
            setWinds('');
            setTemprature('');
            setLocation('');
        }
    };

    const search = async (e) => {
        const inputValue = e.target.value;
        if(inputValue !== '') {
            searchByCountry(inputValue);
            setCityNotSelected(false);
        } else {
            setCityNotSelected(true);
            setCityNotFound(false);
        }
    };

    return (
        <div className="container">
            <div className="top-bar">
                <input type="search" onChange={(e) => search(e)} placeholder="search" />
            </div>
            {cityNotFound && <div className="city-not-found">*City Not Found</div>}
            {cityNotSelected && <div className="city-not-found">*There Is No City Selected</div>}
            <div className="weather-image">
                <img src={icon} alt="" />
            </div>
            <div className="weather-temp">{temprature}ْC</div>
            <div className="weather-location">{location}</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity} alt="" className="icon"/>
                    <div className="data">
                        <div className="humidity-percent">{humidities} %</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind} alt="" className="icon"/>
                    <div className="data">
                        <div className="wind-rate">{winds} km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;