import React, { useState, useEffect } from 'react';
import CategoryPage from '../components/CategoryPage';

// Mock news data for Business
const businessNews = [
  {
    id: 1,
    headline: "Major tech company reports record quarterly earnings",
    source: "Financial Post",
    time: "2 hours ago",
    imageUrl: "https://via.placeholder.com/800x400?text=Quarterly+Earnings",
    description: "The company's performance exceeded analyst expectations, driven by strong product sales and service growth.",
    relatedArticles: [
      { id: 11, title: "Analyst reactions to earnings report", source: "Market Watch" },
      { id: 12, title: "What the results mean for industry competition", source: "Business Insight" }
    ]
  },
  {
    id: 2,
    headline: "Retail giant announces expansion into new markets",
    source: "Commerce Daily",
    time: "4 hours ago",
    imageUrl: "https://via.placeholder.com/800x400?text=Retail+Expansion",
    description: "The expansion plan includes opening hundreds of new locations across emerging markets.",
    relatedArticles: [
      { id: 21, title: "The company's global growth strategy explained", source: "Retail Analyst" },
      { id: 22, title: "Impact on local economies and job markets", source: "Economic Times" }
    ]
  },
  {
    id: 3,
    headline: "Oil prices fluctuate amid supply chain uncertainties",
    source: "Energy Markets",
    time: "7 hours ago",
    imageUrl: "https://via.placeholder.com/800x400?text=Oil+Prices",
    description: "Global energy markets are responding to geopolitical tensions and production challenges.",
    relatedArticles: [
      { id: 31, title: "How energy price volatility affects consumer goods", source: "Consumer Reports" },
      { id: 32, title: "Expert predictions for future oil market trends", source: "Commodities Weekly" }
    ]
  },
  {
    id: 4,
    headline: "Major merger creates new industry powerhouse",
    source: "Business Journal",
    time: "1 day ago",
    imageUrl: "https://via.placeholder.com/800x400?text=Corporate+Merger",
    description: "The combined entity will become one of the largest companies in its sector.",
    relatedArticles: [
      { id: 41, title: "Regulatory challenges facing the merger", source: "Compliance Today" },
      { id: 42, title: "What changes consumers can expect after the merger", source: "Consumer Focus" }
    ]
  }
];

const Business = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setArticles(businessNews);
      setIsLoading(false);
    }, 800);
  }, []);

  return (
    <CategoryPage
      title="Business"
      category="business"
      description="Business news covering markets, economy, finance, corporate strategies, and global trade developments."
      articles={articles}
      isLoading={isLoading}
      
    />
  );
};

export default Business;
