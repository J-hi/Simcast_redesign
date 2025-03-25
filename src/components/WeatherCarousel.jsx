import React, { useState, useEffect } from 'react';
import WeatherWidget from './WeatherWidget';

const WeatherCarousel = ({ cities }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  // Adjust visible cards based on window width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 576) {
        setVisibleCards(1);
      } else if (window.innerWidth < 768) {
        setVisibleCards(2);
      } else if (window.innerWidth < 992) {
        setVisibleCards(3);
      } else {
        setVisibleCards(4);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrev = () => {
    setActiveIndex(prevIndex => {
      const newIndex = prevIndex === 0 ? Math.max(0, cities.length - visibleCards) : Math.max(0, prevIndex - 1);
      return newIndex;
    });
  };

  const handleNext = () => {
    setActiveIndex(prevIndex => {
      const maxIndex = Math.max(0, cities.length - visibleCards);
      const newIndex = prevIndex >= maxIndex ? 0 : Math.min(maxIndex, prevIndex + 1);
      return newIndex;
    });
  };

  // Calculate which cities to show
  const visibleCities = [];
  for (let i = 0; i < visibleCards; i++) {
    const index = (activeIndex + i) % cities.length;
    if (index < cities.length) {
      visibleCities.push(cities[index]);
    }
  }

  // Create indicator buttons - one for each "page" of cards
  const pageCount = Math.ceil(cities.length / visibleCards);
  const indicators = Array.from({ length: pageCount }, (_, i) => {
    const pageIndex = i * visibleCards;
    return (
      <button
        key={i}
        type="button"
        className={`carousel-indicator-dot ${activeIndex === pageIndex ? 'active' : ''}`}
        onClick={() => {
          setActiveIndex(pageIndex);
        }}
        aria-label={`Page ${i + 1}`}
      />
    );
  });

  return (
    <div className="weather-carousel-container position-relative mb-3">
      <div className="weather-carousel">
        <div className="carousel-track d-flex overflow-hidden">
          {visibleCities.map((city, index) => (
            <div
              key={index}
              className="carousel-card px-1"
              style={{
                flex: `0 0 ${100 / visibleCards}%`,
                maxWidth: `${100 / visibleCards}%`,
              }}
            >
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
      </div>

      {/* Carousel Controls - make them smaller and more subtle */}
      <button
        className="carousel-control-prev"
        type="button"
        onClick={handlePrev}
        aria-label="Previous"
        style={{ width: '24px', height: '24px', top: '50%', transform: 'translateY(-50%)', color:'var(--gray-300)' }}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true">
          
        </span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        onClick={handleNext}
        aria-label="Next"
        style={{ width: '24px', height: '24px', top: '50%', transform: 'translateY(-50%)', color:'var(--gray-300)' }}
      >
        <span className="carousel-control-next-icon" aria-hidden="true">
          
        </span>
      </button>

      {/* Indicators - smaller dots */}
      <div className="carousel-indicators" style={{ marginTop: '0.5rem' }}>
        {indicators}
      </div>
    </div>
  );
};

export default WeatherCarousel;
