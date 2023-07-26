
async function getWeatherData(latitude, longitude) {
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const weatherDegree = data.main.temp;
    const weatherDescription = data.weather[0].description;
    const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const visibility = data.visibility;
    const pressure = data.main.pressure;

    console.log('Weather Degree:', weatherDegree);
    console.log('Weather Description:', weatherDescription);
    console.log('Weather Icon:', weatherIcon);
    console.log('Humidity:', humidity);
    console.log('Wind Speed:', windSpeed);
    console.log('Visibility:', visibility);
    console.log('Pressure:', pressure);

    return {
      degree: weatherDegree,
      description: weatherDescription,
      icon: weatherIcon,
      humidity: humidity,
      windSpeed: windSpeed,
      visibility: visibility,
      pressure: pressure
    };
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    return null;
  }
}

const latitude = 36.8065;
const longitude = 10.1815;

getWeatherData(latitude, longitude);
export { getWeatherData };
