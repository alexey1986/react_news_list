import React, { Component } from 'react';
import NewsAPI from 'newsapi';
import './style.scss';

const API_KEY = new NewsAPI('204141cf2b5443618d7531afb82b6bac');
const CATEGORIES = "business entertainment general health science sports technology";

class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      article: null
    };
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleSearchByKeyWord = this.handleSearchByKeyWord.bind(this);    
  }

  handleChangeCategory(e) {
    this.getNews(null, e.target.innerText.toLowerCase()).then(() => this.selectFirstArticle());
  }

  handleSearchByKeyWord(e) {
    this.getNews(null, null, e.target.value).then(() => this.selectFirstArticle());
  }

  componentDidMount() {
    this.getNews().then(() => {
      // show first article as default
      this.selectFirstArticle();
    });
  }

  async getNews(country, category, q) {
    return API_KEY.v2.topHeadlines({
      country: country || 'us',
      category: category || '',
      q: q || '' // keywords or a phrase to search for
    }).then(response => {
        this.setState({
          articles: response.articles
        });
      }
    );
  }
  
  selectArticle = selected => {
    this.setState({
      article: selected
    });
  };

  selectFirstArticle = () => {
    this.selectArticle(this.state.articles[0]);
  }

  render() {
    const { articles, article } = this.state;
    const categories = CATEGORIES.split(" ");

    return (
      <div className="article-body">      
        <aside className="article-sidebar">
          {/* search filter */}
          <div className="article-filter">
            <h2>Chose category:</h2>
            {categories.map((category, i) => <button key={"cat_" + i} onClick={this.handleChangeCategory}>{category}</button>)}
            <h2>Search news by key words:</h2>
            <input type="text" onChange={this.handleSearchByKeyWord} />
          </div>
          {/* articles list */}
          <ul className="article-list">
            {articles.map((article, index) => (
              <li className="article-item" onClick={() => this.selectArticle(article)} key={index + "_" + article.source.id}>
                <img className="article-image" src={article.urlToImage} alt={article.source.name} />
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
              <h3 className="article-title">{article.title}</h3>
              <p><small>Source: <a href={article.url}>{article.source.name}</a> Date: {article.publishedAt} </small></p>
              <p>{article.content}</p>
              <img src={article.urlToImage} alt={article.source.name} />              
            </div>
          )}
        </div>
      </div>    
    )
  }
}

export default Articles;
