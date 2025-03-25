import React, { useState, useEffect } from 'react';
import CategoryPage from '../components/CategoryPage';

// Mock news data for World
const worldNews = [
  {
    id: 1,
    headline: "Global markets react to central bank announcements on interest rates",
    source: "Financial Times",
    time: "1 hour ago",
    imageUrl: "https://via.placeholder.com/800x400?text=Global+Markets",
    description: "Markets around the world responded to major central bank decisions on monetary policy.",
    relatedArticles: [
      { id: 11, title: "How interest rate changes affect global economies", source: "Economic Review" },
      { id: 12, title: "Market analysts predict future rate adjustments", source: "Market Watch" }
    ]
  },
  {
    id: 2,
    headline: "Climate summit reaches historic agreement on emissions",
    source: "International Herald",
    time: "5 hours ago",
    imageUrl: "https://via.placeholder.com/800x400?text=Climate+Summit",
    description: "World leaders have agreed on unprecedented measures to address climate change.",
    relatedArticles: [
      { id: 21, title: "The key points of the climate agreement explained", source: "Climate Journal" },
      { id: 22, title: "Industry reactions to new emissions targets", source: "Energy News" }
    ]
  },
  {
    id: 3,
    headline: "Diplomatic tensions rise over trade dispute between major economies",
    source: "Global Affairs",
    time: "8 hours ago",
    imageUrl: "https://via.placeholder.com/800x400?text=Trade+Dispute",
    description: "A deepening trade conflict threatens to disrupt international commerce and diplomatic relations.",
    relatedArticles: [
      { id: 31, title: "History of trade relations between the disputing nations", source: "Trade Review" },
      { id: 32, title: "Economic impacts of escalating trade barriers", source: "Business Analysis" }
    ]
  },
  {
    id: 4,
    headline: "International aid reaches regions affected by natural disaster",
    source: "World Relief",
    time: "1 day ago",
    imageUrl: "https://via.placeholder.com/800x400?text=Disaster+Relief",
    description: "Humanitarian assistance is being deployed to help communities recovering from devastating natural events.",
    relatedArticles: [
      { id: 41, title: "How to contribute to relief efforts", source: "Humanitarian Daily" },
      { id: 42, title: "Long-term recovery plans for affected regions", source: "Development Focus" }
    ]
  }
];

const World = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setArticles(worldNews);
      setIsLoading(false);
    }, 800);
  }, []);

  return (
    <CategoryPage
      title="World"
      category="world"
      description="Global news and events happening around the world, from politics and diplomacy to humanitarian issues and international relations."
      articles={articles}
      isLoading={isLoading}
      
    />
  );
};

export default World;
