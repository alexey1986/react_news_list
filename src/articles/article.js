import React from 'react';

const Article = ({article, handleClick}) => (
    <div className="article-item" onClick={() => handleClick(article)} >
        {article.urlToImage && (
            <img className="article-image" src={article.urlToImage} alt={article.source.name} />
        )}
        <h2 className="article-title">{article.title}</h2>
        <p className="article-description">{article.description}</p>
    </div>
)

export default Article;
