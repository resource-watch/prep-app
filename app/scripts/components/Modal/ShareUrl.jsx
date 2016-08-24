import React from 'react';
import Button from '../Button/Button';
import LoadingSpinner from '../Loading/LoadingSpinner';

class ShareUrl extends React.Component {

  constructor() {
    super();
    this.state = {
      copied: false
    };
  }

  componentDidMount() {
    this.props.getShortLink(this.props.url);
  }

  onCopyClick() {
    const copyTextarea = this.refs.url;
    copyTextarea.select();

    try {
      document.execCommand('copy');
      this.setState({ copied: true });
    } catch (err) {
      console.warn('Oops, unable to copy');
    }
  }

  render() {
    let shortUrl = this.props.links[this.props.url]
      ? this.props.links[this.props.url]
      : false;
    if ( this.props.iframe ) {
      shortUrl = `<iframe src="${shortUrl}"></iframe>`;
    }

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
   * Urls to generate
   */
  url: React.PropTypes.string,
  /**
   * Short urls generated
   */
  links: React.PropTypes.object
};


export default ShareUrl;
