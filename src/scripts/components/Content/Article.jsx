import React from 'react';

class Article extends React.Component {
  render() {
    return (
      <article className={`c-article ${this.props['no-border'] ? '-no-border': ''} ${this.props.floating ? '-floating' : ''}`}>
        <div className="row align-center">
          <div className={`column ${this.props.grid || 'small-12 medium-8'}`}>
            {this.props.children}
          </div>
        </div>
      </article>
    );
  }
}

export default Article;
