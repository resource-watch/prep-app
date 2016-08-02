import React from 'react';
import Button from './Button';
import LoadingSpinner from './LoadingSpinner';

class ShareUrl extends React.Component {

  componentDidMount() {
    this.props.getShortLink(window.location.href);
  }

  onCopyClick() {
    const copyTextarea = this.refs.url;
    copyTextarea.select();

    try {
      document.execCommand('copy');
    } catch (err) {
      console.warn('Oops, unable to copy');
    }
  }

  render() {
    const shortUrl = this.props.links[window.location.href]
      ? this.props.links[window.location.href]
      : false;
    let content = !shortUrl
      ? <LoadingSpinner transparent />
      : <div className="url-container">
        <input ref="url" defaultValue={shortUrl} className="url" readOnly />
        <Button click={() => this.onCopyClick()} fill border>
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
