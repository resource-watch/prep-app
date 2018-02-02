import React from 'react';
import PropTypes from 'prop-types';
import { logEvent } from 'helpers/analytics';
import Button from '../Button/Button';

class ShareUrl extends React.Component {
  constructor() {
    super();
    this.state = {
      copied: false
    };
  }

  componentDidMount() {
    if (!this.props.iframe) {
      this.props.getShortLink(this.props.url);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { url: nextUrl } = nextProps;
    const { url: prevUrl } = this.props;

    if (nextUrl !== prevUrl && !nextProps.iframe) {
      this.props.getShortLink(nextUrl);
    }
  }

  onCopyClick() {
    this.input.select();

    try {
      document.execCommand('copy');
      this.setState({ copied: true });

      if (this.props.analytics) {
        logEvent(this.props.analytics.category, this.props.analytics.action, `Clicks to copy ${this.props.iframe ? 'embed' : 'link'}`);
      }

      setTimeout(() => {
        this.setState({ copied: false });
        this.input.blur();
      }, 2000);
    } catch (err) {
      console.warn('Oops, unable to copy');
    }
  }

  render() {
    const { copied } = this.state;

    let url = this.props.links[this.props.url] || this.props.url;

    if (this.props.iframe) {
      url = `<iframe width="100%" height="600px" src="${url}"></iframe>`;
    }

    return (
      <div className="c-share-url">
        <div className="url-container">
          <input ref={(node) => { this.input = node; }} value={url} className="url" readOnly />
          <Button click={() => this.onCopyClick()} fill border>
            {copied ? 'Copied' : 'Copy'}
          </Button>
        </div>
      </div>
    );
  }
}

ShareUrl.propTypes = {
  /**
   * Function to get the short link url
   */
  getShortLink: PropTypes.func.isRequired,
  /**
   * Urls to generate
   */
  url: PropTypes.string,
  /**
   * Set if the url will be inside a iframe
   */
  iframe: PropTypes.bool,
  /**
   * Short urls generated
   */
  links: PropTypes.object,
  /**
   * Define the category and action for the analytics
   * event
   */
  analytics: PropTypes.shape({
    category: PropTypes.string,
    action: PropTypes.string
  })
};


export default ShareUrl;
