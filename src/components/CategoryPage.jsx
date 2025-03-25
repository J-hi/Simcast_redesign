import React from 'react';
import NewsFeed from './NewsFeed';

const CategoryPage = ({
  title,
  category,
  description,
  articles = [],
  isLoading = false,
  customIconUrl = null
}) => {

  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex align-items-center mb-2">
            {customIconUrl && (
              <div className="category-icon me-3">
                <img
                  src={customIconUrl}
                  alt={`${title} icon`}
                  className="category-icon-img"
                  width="32"
                  height="32"
                />
              </div>
            )}
            <h1 className="section-title mb-4">{title}</h1>
          </div>
          {description && <p className="text-secondary mb-4">{description}</p>}
        </div>
      </div>

      <NewsFeed
        category={category}
        articles={articles}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CategoryPage;
