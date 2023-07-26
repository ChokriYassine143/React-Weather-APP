import React from "react";
import Day from "./Day";
import getfivedata from "../5daysdata";
import { useState,useEffect } from "react";
import Detail from "./Detail";
import { getWeatherData } from "../weather";
import Footer from "./Footer";
function App() {
 
  function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
  }
  
  const [{late,long},changecountry]=useState({late:48.864716,long:2.349014});
  const [inputValue,setinputvalue]=useState("");
  const [country,changecountryname]=useState("Paris");
  async function getCityDataFromLatLng(latitude, longitude) {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
  
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch location data.');
      }
  
      const data = await response.json();
      const city = data.address.city || data.address.town || data.address.village || data.address.hamlet || data.address.locality || '';
      const country = data.address.country || '';
  
      return {city,country} ;
    } catch (error) {
      console.error('Error getting city data:', error.message);
      return null;
    }
  }
 
  function changecurrent(){
    const successCallback = (position) => {
      console.log(position);
      changecountry({late:position.coords.latitude,long:position.coords.longitude});
      getCityDataFromLatLng(position.coords.latitude, position.coords.longitude).then((data) => {
        if (data) {
          data.city? changecountryname(data.city):changecountryname(data.country);
        } else {
          changecountryname(country);
        }
      });
    };
    
    const errorCallback = (error) => {
      alert("allow location");
    };
    
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    
  
  }  
  function handleInputChange(event){
    setinputvalue(event.target.value);
  }
  function changecountryv(){
    const cityName = inputValue;
const apiUrl = `https://nominatim.openstreetmap.org/search?q=${cityName}&format=json&limit=1`;

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    const latitude = data[0].lat;
    const longitude = data[0].lon;
    changecountry({late:latitude,long:longitude})
    getCityDataFromLatLng(latitude, longitude).then((datas) => {
      if (datas) { 
       datas.city? changecountryname(datas.city):changecountryname(datas.country);
      } else {
        changecountryname(country);
      }
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error.message);
  });

   
    setdiv(!defaultdiv);

  }
  const [forecastData, setForecastData] = useState(null);
  const latitude = late;
  const  longitude= long;

  useEffect(() => {
    async function fetchWeatherData() {
      try {
        const data = await getfivedata(latitude, longitude);
        setForecastData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error.message);
      }
    }

    fetchWeatherData();
  }, [latitude, longitude]);
  const [weatherData, setWeatherData] = useState(null);
 

    useEffect(() => {
      async function fetchWeatherData() {
        try {
          const data = await getWeatherData(latitude, longitude);
          setWeatherData(data);
        } catch (error) {
          console.error('Error fetching weather data:', error.message);
        }
      }
  
      fetchWeatherData();
    }, [latitude, longitude]);
    const [defaultdiv,setdiv]=useState(true);
    function changediv(){
        setdiv(!defaultdiv);
    }

    let today = new Date();
    let options = {
      weekday: "short",
      day: "numeric",
      month: "long",
    };
    let day = today.toLocaleDateString("en-US", options).slice(0, 12);
    const [unistState,setunitState]=useState(true);
    function changeunitf(){
      setunitState(false);
    }
    function changeunitc(){
      setunitState(true);
    }
  return (
   <div className="app"> 
<div class="temperature-circle">
  <div class="temperature-unit-circle">
    <span onClick={changeunitf} className="temperature-unit">&deg;F</span>
  </div>
  <div class="temperature-unit-circle">
    <span onClick={changeunitc} className="temperature-unit">&deg;C</span>
  </div>
</div>

   { defaultdiv?   <div className="todayweather">
      <div>
        <button onClick={changediv}>Search for places</button>
        <img className="location-icon" onClick={changecurrent} src="img/1549624.png" alt="Location Icon" />
      </div>
      {weatherData && ( 
        <>
          <img className="imgtoday"  src={weatherData.icon} alt="Weather Icon" />
          <div className="valuedegtod">
            <h1 className="degtoday">{unistState? Math.ceil(weatherData.degree )+" °C":celsiusToFahrenheit( Math.ceil(weatherData.degree ))+"°F"} </h1>
            x
          </div>
          <h1 className="weathertype">{weatherData.description}</h1>
        </>
      )}
      <h1 className="todayvalue">Today - {day}</h1>
      <p className="location-city">{country}</p>
      <img src="img/city.png" className="city-icon" alt="cityimage"/>
    </div>:
    <div class="search-container">
    <img src="img/exit.png" onClick={changediv} className="exit-icon" alt="exit"/>
    <div className="search-div">
  <input id="searchInput" placeholder="Search country..."  type="text"
        value={inputValue}
        onChange={handleInputChange}/>
  <button id="searchButton" onClick={changecountryv}>Search</button>
</div>
</div>
  } 

   <div className="days">
   
        {forecastData &&
          forecastData.map((item) => (
            <Day key={item.date} date={item.date} icon={item.icon} maxTemp={unistState? Math.ceil(item.maxTemp )+" °C":celsiusToFahrenheit( Math.ceil(item.maxTemp ))+"°F"} minTemp={unistState? Math.ceil(item.minTemp )+" °C":celsiusToFahrenheit( Math.ceil(item.minTemp))+"°F"}/>
          ))}
      </div>
      <div className="grid-container">
      {weatherData ? (
    <>
      <Detail name="Wind status" src="img/navigation.png"value={weatherData.windSpeed +" mph"} />
      <Detail name="Humidity" value={weatherData.humidity +"%" } inp="range" />
      <Detail name="Visibility" classn={true} value={weatherData.visibility/10 +" miles"} />
      <Detail name=" Air Pressure" classn={true}   value={weatherData.pressure +" mb"} />
    </>
  ) : null
}
           
      </div>
      <Footer/>
 </div>
 
  );
}

export default App;
