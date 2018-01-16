import React from 'react';
import { Link } from 'react-router';

import ShareModal from '../Modal/ShareModal';
import Button from '../Button/Button';
import Icon from '../ui/Icon';

class ToolbarActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShare: false,
      shareUrl: '',
      shareTitle: ''
    };
  }

  setShareModal(url, section) {
    this.setState({
      modalShare: true,
      shareUrl: url,
      shareTitle: `Share this ${section}`
    });
  }

  render() {
    let currentSectionTitle = this.props.currentSection.split('/');
    if (currentSectionTitle.length) {
      currentSectionTitle = currentSectionTitle[0];
    }
    return (
      <div className="c-toolbar-actions">
        <div className="left">
          <Link to={`/${this.props.currentSection}`} className="action -alternative" >
            <svg className="icon" width="7" height="10" viewBox="0 0 7 10">
              <title>icon-back</title>
              <path
                d="M.707 4.243L0 4.95 4.95 9.9l1.414-1.415L2.828 4.95l3.536-3.536L4.95 0 .707 4.243z"
                fillRule="evenodd"
              />
            </svg>
            {currentSectionTitle}
          </Link>
        </div>
        <div className="right">
          {this.props.currentSection === 'explore' && this.props.downloadUrl &&
            <a
              href={this.props.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="c-button -action -alternative"
            >
              <Icon name="icon-download" className="-medium" />
              Download
            </a>
          }

          <Button
            click={() => this.setShareModal(window.location.href, 'page')}
            alternative
            action
          >
            <Icon name="icon-share" className="-medium" />
            Share
          </Button>

          <ShareModal
            title={this.state.shareTitle}
            url={this.state.shareUrl}
            opened={this.state.modalShare}
            close={() => this.setState({ modalShare: false })}
          />
        </div>
      </div>
    );
  }
}

ToolbarActions.propTypes = {
  /**
   * Current section to use in the back button
   * Required
   */
  currentSection: React.PropTypes.string.isRequired,
  /**
   * Url to embed the insight
   */
  // insightUrl: React.PropTypes.string,
  downloadUrl: React.PropTypes.string
};

export default ToolbarActions;
