import React from 'react';
import Button from './Button';
import LoadingSpinner from './LoadingSpinner';

class ShareUrl extends React.Component {

  componentDidMount() {
    this.props.getShortLink(window.location.href);
  }

  render() {
    const shortUrl = this.props.links[window.location.href]
      ? this.props.links[window.location.href]
      : false;
    let content = !shortUrl
      ? <LoadingSpinner />
      : <div className="url-container">
        <span className="url">{shortUrl}</span>
        <Button fill border>
          Copy
        </Button>
      </div>;
    return (
      <div className="c-share-url">
        {content}
      </div>
    );
  }
}

ShareUrl.propTypes = {
  /**
   * Function to get the short link url
   */
  getShortLink: React.PropTypes.func.isRequired,
  /**
   * Short urls generated
   */
  links: React.PropTypes.object
};


export default ShareUrl;
