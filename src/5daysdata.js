

async function getWeatherData(latitude, longitude) {
    const apiKey =process.env.REACT_APP_API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    const  options = {
      weekday: "short",
      day: "numeric",
      month: "long",
    };
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
       
      const  forecastData = data.list.filter((item, index) => index % 8 === 0).map(item => {
     
        return {
          date: new Date(item.dt * 1000).toLocaleDateString("en-US",options), 
          icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
          minTemp: item.main.temp_min,
          maxTemp: item.main.temp_max
        };
      });
  
      console.log('Forecast Data:', forecastData);
      return forecastData;
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
      return null;
    }
  }
  export default getWeatherData;