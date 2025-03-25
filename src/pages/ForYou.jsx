import React, { useState } from 'react';
import NewsCard from '../components/NewsCard';

// Sample news data - in a real app, this would come from an API
const forYouData = [
  {
    id: 1,
    headline: 'Simcast unveils new AI features for Maps, Search and more at I/O 2024',
    source: 'Tech Crunch',
    time: '3 hours ago',
    imageUrl: 'https://via.placeholder.com/400x200/eee?text=Simcast+I/O',
    description: 'Simcast announced several new AI-powered features across its products at its annual developer conference.',
    isFeature: true,
    relatedArticles: [
      {
        title: 'Everything announced at Simcast I/O 2024',
        source: 'The Verge',
        time: '2 hours ago'
      },
      {
        title: 'Simcast Gemini gets major update with multimodal capabilities',
        source: 'Wired',
        time: '1 hour ago'
      }
    ]
  },
  {
    id: 2,
    headline: 'Scientists discover potential new treatment for Alzheimer\'s disease',
    source: 'Science Daily',
    time: '5 hours ago',
    imageUrl: 'https://via.placeholder.com/400x200/eee?text=Medical+Research',
    description: 'Researchers have identified a compound that could potentially slow the progression of Alzheimer\'s disease.'
  },
  {
    id: 3,
    headline: 'Global markets react to central bank announcements on interest rates',
    source: 'Financial Times',
    time: '1 hour ago',
    imageUrl: 'https://via.placeholder.com/400x200/eee?text=Stock+Market',
    description: 'Markets around the world responded to major central bank decisions on monetary policy.'
  },
  {
    id: 4,
    headline: 'SpaceX launches 25 more Starlink satellites into orbit',
    source: 'Space News',
    time: '6 hours ago',
    imageUrl: 'https://via.placeholder.com/400x200/eee?text=Rocket+Launch',
    description: 'The company continues its rapid deployment of its global satellite internet constellation.'
  },
  {
    id: 5,
    headline: 'Climate report warns of accelerating sea level rise',
    source: 'Environmental Journal',
    time: '12 hours ago',
    description: 'New data suggests sea levels are rising faster than previous models predicted.',
    relatedArticles: [
      {
        title: 'Coastal cities prepare for future flooding scenarios',
        source: 'Urban Planning Today',
        time: '10 hours ago'
      }
    ]
  },
  {
    id: 6,
    headline: 'Major tech companies announce quarterly earnings results',
    source: 'Business Insider',
    time: '2 hours ago',
    imageUrl: 'https://via.placeholder.com/400x200/eee?text=Financial+Results',
    description: 'Apple, Microsoft, and Amazon reported their latest financial performance.'
  }
];

// Generate additional news items by duplicating and modifying the existing ones
const generateMoreNews = (currentLastId) => {
  return forYouData.slice(1).map((news, index) => {
    const newId = currentLastId + index + 1;
    return {
      ...news,
      id: newId,
      headline: news.headline + ' (Updated)',
      time: Math.floor(Math.random() * 24) + ' hours ago', // Random time between 0-24 hours
    };
  });
};

const ForYou = () => {
  const [displayedNews, setDisplayedNews] = useState(forYouData.slice(1)); // Start with the original news (excluding featured)
  const [lastId, setLastId] = useState(forYouData[forYouData.length - 1].id); // Track the last ID used

  const handleLoadMore = () => {
    const moreNews = generateMoreNews(lastId);
    setDisplayedNews([...displayedNews, ...moreNews]);
    setLastId(lastId + moreNews.length);
  };

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="section-title mb-3">For you</h1>
          <p className="text-secondary mb-4">
            Personalized top stories based on your interests and reading history.
          </p>

          {/* Featured News */}
          <NewsCard
            headline={forYouData[0].headline}
            source={forYouData[0].source}
            time={forYouData[0].time}
            imageUrl={forYouData[0].imageUrl}
            description={forYouData[0].description}
            relatedArticles={forYouData[0].relatedArticles}
            isFeature={true}
          />
        </div>
      </div>

      {/* Regular News Grid */}
      <div className="row">
        {displayedNews.map((news) => (
          <div className="col-lg-6 mb-4" key={news.id}>
            <NewsCard
              headline={news.headline}
              source={news.source}
              time={news.time}
              imageUrl={news.imageUrl}
              description={news.description}
              relatedArticles={news.relatedArticles}
            />
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="row mb-5">
        <div className="col-12 text-center">
          <button className="btn btn-outline-secondary px-4 hover:bg-gray-200" onClick={handleLoadMore}>
            Load more stories
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForYou;
