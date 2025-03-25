import React, { useState, useEffect } from 'react';
import CategoryPage from '../components/CategoryPage';

// Mock news data for Technology
const technologyNews = [
  {
    id: 1,
    headline: "SpaceX launches 25 more Starlink satellites",
    source: "Space News",
    time: "6 hours ago",
    imageUrl: "https://via.placeholder.com/800x400?text=SpaceX+Starlink",
    description: "SpaceX successfully deployed 25 more Starlink satellites to orbit, expanding its internet constellation.",
    relatedArticles: [
      { id: 11, title: "Starlink now available in 45 countries", source: "Tech Today" },
      { id: 12, title: "How Starlink is changing rural internet access", source: "Digital Trends" }
    ]
  },
  {
    id: 2,
    headline: "Apple unveils new MacBook with improved battery life",
    source: "Tech Chronicle",
    time: "10 hours ago",
    imageUrl: "https://via.placeholder.com/800x400?text=New+MacBook",
    description: "Apple's latest MacBook boasts 20 hours of battery life and a new M2 chip.",
    relatedArticles: [
      { id: 21, title: "M2 chip performance benchmarks revealed", source: "Processor Weekly" },
      { id: 22, title: "How the new MacBook compares to competitors", source: "Laptop Magazine" }
    ]
  },
  {
    id: 3,
    headline: "Microsoft acquires AI startup for $1 billion",
    source: "Tech Insider",
    time: "1 day ago",
    imageUrl: "https://via.placeholder.com/800x400?text=Microsoft+Acquisition",
    description: "The acquisition will bolster Microsoft's AI capabilities across its product lineup.",
    relatedArticles: [
      { id: 31, title: "What this means for Microsoft's AI strategy", source: "AI Journal" },
      { id: 32, title: "The startup's journey from garage to billion-dollar exit", source: "Entrepreneur Today" }
    ]
  },
  {
    id: 4,
    headline: "Google announces new privacy features for search",
    source: "Search Engine Journal",
    time: "2 days ago",
    imageUrl: "https://via.placeholder.com/800x400?text=Google+Privacy",
    description: "New features will give users more control over their data and search history.",
    relatedArticles: [
      { id: 41, title: "How to use Google's new privacy dashboard", source: "Digital Privacy" },
      { id: 42, title: "Tech companies stepping up privacy efforts", source: "Tech Policy Today" }
    ]
  }
];

const Technology = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setArticles(technologyNews);
      setIsLoading(false);
    }, 800);
  }, []);

  return (
    <CategoryPage
      title="Technology"
      category="technology"
      description="The latest news and developments in technology, from AI and computing to space exploration and gadgets."
      articles={articles}
      isLoading={isLoading}
      
    />
  );
};

export default Technology;
