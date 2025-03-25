import React from 'react';

const WeatherWidget = ({ location, temperature, condition, high, low }) => {
  // Map weather conditions to appropriate icons
  const getWeatherIconUrl = () => {
    const conditionLower = condition ? condition.toLowerCase() : '';

    if (conditionLower.includes('sun') || conditionLower.includes('clear')) {
      return 'bi bi-sun-fill';
    } else if (conditionLower.includes('cloud') || conditionLower.includes('overcast')) {
      return 'bi bi-cloud-fill';
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return 'bi bi-cloud-rain-fill';
    } else if (conditionLower.includes('snow') || conditionLower.includes('sleet')) {
      return 'bi bi-snow';
    } else if (conditionLower.includes('wind') || conditionLower.includes('gust')) {
      return 'bi bi-wind';
    } else if (conditionLower.includes('fog') || conditionLower.includes('mist')) {
      return 'bi bi-cloud-haze-fill';
    } else if (conditionLower.includes('thunder') || conditionLower.includes('storm')) {
      return 'bi bi-cloud-lightning-fill';
    } else {
      return 'bi bi-thermometer-half';
    }
  };

  return (
    <div className="card border-0 shadow-sm bg-weather-card weather-card">
      <div className="card-body p-2">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <h6 className="card-title mb-0 text-weather">{location}</h6>
          <div className="weather-icon">
            <i className={`${getWeatherIconUrl()} text-weather`} style={{ fontSize: '1.5rem' }}></i>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end">
          <div>
            <p className="text-weather mb-0 small">{condition}</p>
            <div className="text-weather small">H: {high} L: {low}</div>
          </div>
          <h3 className="mb-0 text-weather">{temperature}</h3>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
