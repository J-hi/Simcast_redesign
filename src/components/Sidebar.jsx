import React from 'react';
import WeatherWidget from './WeatherWidget';
import WeatherCarousel from './WeatherCarousel';

const Sidebar = () => {
  // Sample weather data for multiple cities
  const weatherData = [
   
    {
      location: 'Ujjain, IN',
      temperature: '32°C',
      condition: 'Partly Cloudy',
      high: '34°C',
      low: '26°C'
    },
  
  ];

  return (
    <div className="sidebar">
      {/* Weather Section Title */}
      <h6 className="fw-bold mb-2 text-weather h4">Weather Updates</h6>

      {/* Desktop Weather Section */}
      <div className="weather-section mb-4 d-none d-md-block">
        {weatherData.map((city, index) => (
          <div key={index} className="mb-2">
            <WeatherWidget
              location={city.location}
              temperature={city.temperature}
              condition={city.condition}
              high={city.high}
              low={city.low}
            />
          </div>
        ))}
      </div>

      {/* Mobile Weather Carousel */}
      <div className="d-md-none">
        <WeatherCarousel cities={weatherData} />
      </div>
    </div>
  );
};

export default Sidebar;
