import React, { Component } from 'react';
import NewsAPI from 'newsapi';
import './style.scss';

const api_key = new NewsAPI('204141cf2b5443618d7531afb82b6bac');

class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      article: null,
      filterText: ''
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.setState({
      filterText: e.target.value
    });
  }

  componentDidMount() {
    api_key.v2.topHeadlines({
      country: 'us'
    }).then(response => {
        this.setState({
          articles: response.articles
        });
        // show first article as default
        this.selectArticle(response.articles[0]);
      }
    );
  }
  
  selectArticle = selectedArticle => {
    this.setState({
      article: selectedArticle
    });
  };   

  render() {
    const { articles, article, filterText } = this.state;
    const filteredArticles = [];
    let lastTitle = null;

    articles.forEach((article) => {
      const title = article.title.toLowerCase();
      if (title.indexOf(filterText) === -1) {
        return;
      }
      if (title !== lastTitle) {
        filteredArticles.push(article);
      }
      lastTitle = title;
    });

    return (
      <div className="article-body">      
        <aside className="article-sidebar">
          {/* search filter */}
          <input
            type="text"
            className="article-filter"
            placeholder="Search..."
            value={this.props.filterText}
            onChange={this.handleFilterTextChange}
          />
          {/* articles list */}
          <ul className="article-list">
            {filteredArticles.map((article, index) => (
              <li className="article-item" onClick={() => this.selectArticle(article)} key={index + "_" + article.source.id}>
                <img className="article-image" src={article.urlToImage} />
                <h2 className="article-title">{article.title}</h2>
                <p className="article-description">{article.description}</p>
              </li>
            ))}
          </ul>
        </aside>
        {/* selected article */}
        <div className="article-content">
          {article && (
            <div>
              <h2 className="article-title">{article.title}</h2>
              <p><small>Source: <a href={article.url}>{article.source.name}</a> Date: {article.publishedAt} </small></p>
              <p>{article.content}</p>
              <img src={article.urlToImage} />              
            </div>
          )}
        </div>
      </div>    
    )
  }
}

export default Articles;
