import React, { useState } from 'react';
import NewsCard from './NewsCard';

// Sample news data - in a real app, this would come from an API
const newsData = [
  {
    id: 1,
    headline: 'Google unveils new AI features for Maps, Search and more at I/O 2024',
    source: 'Tech Crunch',
    time: '3 hours ago',
    imageUrl: 'https://via.placeholder.com/400x200/eee?text=Google+I/O',
    description: 'Google announced several new AI-powered features across its products at its annual developer conference.',
    isFeature: true,
    relatedArticles: [
      {
        title: 'Everything announced at Google I/O 2024',
        source: 'The Verge',
        time: '2 hours ago'
      },
      {
        title: 'Google Gemini gets major update with multimodal capabilities',
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
    imageUrl: 'https://t4.ftcdn.net/jpg/02/09/53/11/360_F_209531103_vL5MaF5fWcdpVcXk5yREBk3KMcXE0X7m.jpg',
    description: 'Researchers have identified a compound that could potentially slow the progression of Alzheimer\'s disease.'
  },
  {
    id: 3,
    headline: 'Global markets react to central bank announcements on interest rates',
    source: 'Financial Times',
    time: '1 hour ago',
    imageUrl: 'https://t4.ftcdn.net/jpg/02/09/53/11/360_F_209531103_vL5MaF5fWcdpVcXk5yREBk3KMcXE0X7m.jpg',
    description: 'Markets around the world responded to major central bank decisions on monetary policy.'
  },
  {
    id: 4,
    headline: 'SpaceX launches 25 more Starlink satellites into orbit',
    source: 'Space News',
    time: '6 hours ago',
    imageUrl: 'https://t4.ftcdn.net/jpg/02/09/53/11/360_F_209531103_vL5MaF5fWcdpVcXk5yREBk3KMcXE0X7m.jpg',
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
    imageUrl: 'https://t4.ftcdn.net/jpg/02/09/53/11/360_F_209531103_vL5MaF5fWcdpVcXk5yREBk3KMcXE0X7m.jpg',
    description: 'Apple, Microsoft, and Amazon reported their latest financial performance.'
  },
  {
    id: 7,
    headline: 'New electric vehicle breaks range record in efficiency test',
    source: 'Auto World',
    time: '4 hours ago',
    imageUrl: 'https://t4.ftcdn.net/jpg/02/09/53/11/360_F_209531103_vL5MaF5fWcdpVcXk5yREBk3KMcXE0X7m.jpg',
    description: 'The prototype vehicle traveled over 800 miles on a single charge under test conditions.'
  },
  {
    id: 8,
    headline: 'International film festival announces award winners',
    source: 'Entertainment Weekly',
    time: '8 hours ago',
    description: 'The prestigious event recognized outstanding achievements in global cinema.'
  }
];

// Additional news data to load when "Load more" is clicked
const moreNewsData = [
  {
    id: 9,
    headline: 'Tech startup raises record funding for AI healthcare solution',
    source: 'Tech Investor',
    time: '9 hours ago',
    imageUrl: 'https://via.placeholder.com/400x200/eee?text=Tech+Startup',
    description: 'The company plans to use the funds to expand its AI-driven diagnostic platform to more hospitals.'
  },
  {
    id: 10,
    headline: 'New study finds benefits of intermittent fasting for longevity',
    source: 'Health Journal',
    time: '11 hours ago',
    imageUrl: 'https://via.placeholder.com/400x200/eee?text=Health+Study',
    description: 'Researchers documented significant improvements in various biomarkers related to aging.'
  },
  {
    id: 11,
    headline: 'Major airline announces expansion with 50 new international routes',
    source: 'Travel Weekly',
    time: '7 hours ago',
    imageUrl: 'https://via.placeholder.com/400x200/eee?text=Airline+News',
    description: 'The expansion represents the largest route increase in the company\'s history.'
  },
  {
    id: 12,
    headline: 'Renewable energy production exceeds coal for first time in history',
    source: 'Energy Today',
    time: '14 hours ago',
    imageUrl: 'https://via.placeholder.com/400x200/eee?text=Renewable+Energy',
    description: 'This milestone marks a significant shift in the global energy landscape.'
  }
];

const NewsFeed = () => {
  // State to track if more stories have been loaded
  const [showMoreStories, setShowMoreStories] = useState(false);

  // Get the first item for the featured spot
  const featuredNews = newsData.find(item => item.isFeature) || newsData[0];
  // Filter out the featured item from the regular list
  const regularNews = newsData.filter(item => item.id !== featuredNews.id);

  // Combined news array that includes original + more stories if showMoreStories is true
  const displayNews = showMoreStories
    ? [...regularNews, ...moreNewsData]
    : regularNews;

  // Handler for load more button click
  const handleLoadMore = () => {
    setShowMoreStories(true);
  };

  return (
    <div className="container mt-4">
      {/* Featured News */}
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="section-title mb-3">Top Stories</h2>
          <NewsCard
            headline={featuredNews.headline}
            source={featuredNews.source}
            time={featuredNews.time}
            imageUrl={featuredNews.imageUrl}
            description={featuredNews.description}
            relatedArticles={featuredNews.relatedArticles}
            isFeature={true}
          />
        </div>
      </div>

      {/* Regular News Grid */}
      <div className="row">
        {displayNews.map((news) => (
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

      {/* Load More Button - only show if more stories haven't been loaded yet */}
      {!showMoreStories && (
        <div className="row mb-5">
          <div className="col-12 text-center">
            <button
              className="btn btn-outline-secondary px-4"
              onClick={handleLoadMore}
            >
              Load more stories
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
