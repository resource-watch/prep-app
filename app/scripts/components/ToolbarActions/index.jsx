import React from 'react';
import { Link } from 'react-router';

import ShareModal from '../Modal/ShareModal';
import Button from '../Button/Button';

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
            <svg className="icon" width="7" height="10" viewBox="0 0 7 10"><title>icon-back</title><path d="M.707 4.243L0 4.95 4.95 9.9l1.414-1.415L2.828 4.95l3.536-3.536L4.95 0 .707 4.243z" fillRule="evenodd" /></svg>
            {currentSectionTitle}
          </Link>
        </div>
        <div className="right">
          {this.props.currentSection === 'explore' && this.props.downloadUrl &&
            <a href={this.props.downloadUrl} target="_blank" className="c-button -action -alternative" >
              <svg className="icon" width="10" height="12" viewBox="0 0 10 12" ><title>
                Download</title>
                <g fill="none" fillRule="evenodd" >
                  <path d="M4 0h2v7H4zM0 10h10v2H0z" />
                  <path d="M4.243 8.192l.707.707L9.9 3.95 8.484 2.537 4.95 6.07 1.414 2.536 0 3.95l4.243 4.242z" />
                </g>
              </svg>
              Download
            </a>
          }

          <Button click={() => this.setShareModal(window.location.href, 'page')} alternative border="alternative" action >
            <svg className="icon" width="10" height="12" viewBox="0 0 10 12"><title>icon-share</title><g fill="none" fillRule="evenodd"><path d="M6.45 1l1.414 1.414-4.95 4.95L1.5 5.95zM0 10h10v2H0z" /><path d="M9 1V0H2v2h5v5h2V1z" /></g></svg>
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
  insightUrl: React.PropTypes.string
};

export default ToolbarActions;
