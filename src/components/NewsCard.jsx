import React from 'react';

const NewsCard = ({
  headline,
  source,
  time,
  imageUrl,
  imageAlt,
  description,
  relatedArticles,
  isFeature = false
}) => {
  return (
    <div className={`news-card bg-card ${isFeature ? 'feature-card' : ''}`}>
      <div className="row g-0">
        {imageUrl && (
          <div className={isFeature ? 'col-12 mb-3' : 'col-md-4 col-sm-4 col-5'}>
            <img
              src="https://t4.ftcdn.net/jpg/02/09/53/11/360_F_209531103_vL5MaF5fWcdpVcXk5yREBk3KMcXE0X7m.jpg"
              alt={imageAlt || headline}
              className={`img-fluid rounded m-1 ${isFeature ? 'w-100' : 'h-100 object-fit-cover'}`}
              style={{ maxHeight: isFeature ? '300px' : '150px', objectFit: 'cover' }}
            />
          </div>
        )}

        <div className={imageUrl ? (isFeature ? 'col-12' : 'col-md-8 col-sm-8 col-7') : 'col-12'}>
          <div className="card-body px-md-3 py-2">
            <div className="d-flex align-items-center mb-1">
              {source && <span className="news-source me-2">{source}</span>}
              {time && <span className="news-time">• {time}</span>}
            </div>

            <h3 className={`news-headline mb-2 ${isFeature ? 'fs-4' : ''}`}>
              {headline}
            </h3>

            {description && (
              <p className="text-secondary mb-2 small">
                {description}
              </p>
            )}

            {relatedArticles && relatedArticles.length > 0 && (
              <div className="related-articles mt-3">
                <span className="text-secondary small d-block mb-2">Related coverage:</span>
                <ul className="list-unstyled">
                  {relatedArticles.map((article, index) => (
                    <li key={index} className="mb-1">
                      <div className="d-flex">
                        <div className="flex-shrink-0">
                          <i className="bi bi-dot fs-4 text-secondary"></i>
                        </div>
                        <div>
                          <a href="#" className="small">
                            {article.title}
                          </a>
                          <div className="d-flex align-items-center">
                            <span className="news-source me-2 small">{article.source}</span>
                            {article.time && <span className="news-time small">• {article.time}</span>}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
