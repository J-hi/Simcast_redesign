import React from 'react';
import WeatherWidget from './WeatherWidget';
import WeatherCarousel from './WeatherCarousel';

const Sidebar = () => {
  // Sample weather data for multiple cities
  const weatherData = [
    {
      location: 'New Delhi, IN',
      temperature: '35°C',
      condition: 'Sunny',
      high: '38°C',
      low: '27°C'
    },
    {
      location: 'Ujjain, IN',
      temperature: '32°C',
      condition: 'Partly Cloudy',
      high: '34°C',
      low: '26°C'
    },
    {
      location: 'Indore, IN',
      temperature: '33°C',
      condition: 'Clear',
      high: '35°C',
      low: '25°C'
    },
    {
      location: 'Ahmedabad, IN',
      temperature: '36°C',
      condition: 'Sunny',
      high: '39°C',
      low: '28°C'
    },
    {
      location: 'Bhopal, IN',
      temperature: '31°C',
      condition: 'Cloudy',
      high: '33°C',
      low: '24°C'
    }
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
