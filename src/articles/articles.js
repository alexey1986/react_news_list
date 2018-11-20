import React, { Component } from 'react';
import NewsAPI from 'newsapi';
import { DebounceInput } from 'react-debounce-input';
import Button from '../components/button/button.js';
import Article from './article.js';
import SelectedArticle from './selected-article.js';
import './style.scss';

const API_KEY = new NewsAPI('204141cf2b5443618d7531afb82b6bac');
const CATEGORIES = ["business", "entertainment", "general", "health", "science", "sports", "technology"];

class Articles extends Component {
  state = {
    articles: [],
    article: null,
    isLoading: true
  }
  
  handleChangeCategory = e => {
    this.getNews(e.target.innerText.toLowerCase())
      .then(() => this.selectFirstArticle());
  }

  handleSearchByKeyWord = e => {
    this.getNews(null, e.target.value)
      .then(() => this.selectFirstArticle());
  }

  selectArticle = selected => {
    this.setState({
      article: selected
    });
  };

  selectFirstArticle = () => {
    this.selectArticle(this.state.articles[0]);
  }

  getNews(category, q) {
    return API_KEY.v2.topHeadlines({
      country: 'us',
      category: category || '',
      q: q || '' // keywords or a phrase to search for
    }).then(response => {
        this.setState({
          articles: response.articles
        });
      }
    );
  }

  componentDidMount() {
    this.getNews().then(() => {
      // hide loader
      this.state.isLoading = !this.state.isLoading;
      // show first article as default
      this.selectFirstArticle();
    });
  }
  
  render() {
    const { articles, article, isLoading } = this.state;

    if (isLoading) {
      return (
        <div class="spinner">
          <div class="dot1"></div>
          <div class="dot2"></div>
        </div>
      )
    }

    return (
      <div className="article-body">
        <aside className="article-sidebar">
          <div className="article-filter">
            {/* Categories */}
            <h2>Chose category:</h2>
            {CATEGORIES.map((category, i) => <Button key={"cat_" + i} title={category} handleClick={this.handleChangeCategory} />)}
            {/* Search field */}         
            <h2>Search news by key words:</h2>
            <DebounceInput
              minLength={2}
              debounceTimeout={300}
              onChange={this.handleSearchByKeyWord} />
          </div>
          {/* articles list */}
          <ul className="article-list">
            {articles.map((article, index) => (
              <li className="article-item" key={index + "_" + article.source.id}>
                <Article article={article} handleClick={this.selectArticle} />
              </li>
            ))}
          </ul>
        </aside>
        {/* show selected/first article */}
        <div className="article-content">
          {article && (
            <SelectedArticle article={article} />
          )}
        </div>
      </div>    
    )
  }
}

export default Articles;
