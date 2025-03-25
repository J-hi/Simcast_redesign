import React, { useState } from 'react';
import NewsCard from '../components/NewsCard';

// Sample data for Headlines page
const headlinesData = [
  {
    id: 101,
    headline: 'Breaking: Major economic policy changes announced',
    source: 'Financial Post',
    time: '1 hour ago',
    imageUrl: 'https://via.placeholder.com/400x200/eee?text=Economic+Policy',
    description: 'The government has announced sweeping changes to economic policies that will impact various sectors.'
  },
  {
    id: 102,
    headline: 'New COVID variant detected in several countries',
    source: 'Health News Network',
    time: '2 hours ago',
    imageUrl: 'https://via.placeholder.com/400x200/eee?text=COVID+Variant',
    description: 'Scientists are monitoring a new COVID variant that appears to be spreading in multiple regions.'
  },
  {
    id: 103,
    headline: 'Tech giants facing new regulatory challenges',
    source: 'Tech Today',
    time: '3 hours ago',
    imageUrl: 'https://via.placeholder.com/400x200/eee?text=Tech+Regulation',
    description: 'Major technology companies are encountering fresh regulatory hurdles in several key markets.'
  },
  {
    id: 104,
    headline: 'International summit addresses climate crisis',
    source: 'Global Monitor',
    time: '4 hours ago',
    imageUrl: 'https://via.placeholder.com/400x200/eee?text=Climate+Summit',
    description: 'World leaders have gathered for a critical summit on climate action and carbon reduction targets.'
  },
  {
    id: 105,
    headline: 'Sports federation announces major rule changes',
    source: 'Sports Journal',
    time: '5 hours ago',
    imageUrl: 'https://via.placeholder.com/400x200/eee?text=Sports+Rules',
    description: 'A prominent sports governing body has unveiled significant changes to gameplay rules.'
  }
];

// Generate additional headlines by duplicating and modifying the existing ones
const generateMoreHeadlines = (currentLastId) => {
  return headlinesData.slice(1).map((headline, index) => {
    const newId = currentLastId + index + 1;
    return {
      ...headline,
      id: newId,
      headline: headline.headline + ' (Latest Update)',
      time: Math.floor(Math.random() * 12) + ' hours ago', // Random time between 0-12 hours
    };
  });
};

const Headlines = () => {
  const [displayedHeadlines, setDisplayedHeadlines] = useState(headlinesData.slice(1)); // Start with the original headlines (excluding featured)
  const [lastId, setLastId] = useState(headlinesData[headlinesData.length - 1].id); // Track the last ID used

  const handleLoadMore = () => {
    const moreHeadlines = generateMoreHeadlines(lastId);
    setDisplayedHeadlines([...displayedHeadlines, ...moreHeadlines]);
    setLastId(lastId + moreHeadlines.length);
  };

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="section-title mb-4">Headlines</h1>
          <p className="text-secondary mb-4">
            Top stories and breaking news from around the world. Updated continuously throughout the day.
          </p>

          {/* Featured headline */}
          <NewsCard
            headline={headlinesData[0].headline}
            source={headlinesData[0].source}
            time={headlinesData[0].time}
            imageUrl={headlinesData[0].imageUrl}
            description={headlinesData[0].description}
            isFeature={true}
          />
        </div>
      </div>

      {/* Other headlines */}
      <div className="row">
        {displayedHeadlines.map((news) => (
          <div className="col-lg-6 mb-4" key={news.id}>
            <NewsCard
              headline={news.headline}
              source={news.source}
              time={news.time}
              imageUrl={news.imageUrl}
              description={news.description}
            />
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="row mb-5">
        <div className="col-12 text-center">
          <button className="btn btn-outline-secondary px-4 hover:bg-gray-300" onClick={handleLoadMore}>
            Load more headlines
          </button>
        </div>
      </div>
    </div>
  );
};

export default Headlines;
