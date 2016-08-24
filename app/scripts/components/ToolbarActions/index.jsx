import React from 'react';
import { Link } from 'react-router';

import Modal from '../Modal/Modal';
import ShareModal from '../Modal/ShareModal';

class ToolbarActions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalDevelop: false,
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
    return (
      <div className="c-toolbar-actions">
        <div className="left">
          <Link to={`/${this.props.currentSection}`} className="action" >
            <svg className="icon" width="7" height="10" viewBox="0 0 7 10"><title>icon-back</title><path d="M.707 4.243L0 4.95 4.95 9.9l1.414-1.415L2.828 4.95l3.536-3.536L4.95 0 .707 4.243z" fillRule="evenodd" /></svg>
            {this.props.currentSection}
          </Link>
        </div>
        <div className="right">
          <button className="action" onClick={() => this.setState({ modalDevelop: true })}>
            <svg className="icon" width="10" height="12" viewBox="0 0 10 12"><title>icon download</title><g fill="none" fillRule="evenodd"><path d="M4 0h2v7H4zM0 10h10v2H0z" /><path d="M4.243 8.192l.707.707L9.9 3.95 8.484 2.537 4.95 6.07 1.414 2.536 0 3.95l4.243 4.242z" /></g></svg>
            Download
          </button>

          {this.props.currentSection === 'insights' &&
            <button className="action" onClick={() => this.setShareModal(this.props.insightUrl, 'embed')}>
              <svg className="icon" width="10" height="12" viewBox="0 0 10 12"><title>Embed</title><path d="M0 10h10v2H0v-2zM0 0h10v8H0V0zm2 2h6v4H2V2z" fillRule="evenodd" /></svg>
              Embed
            </button>
          }
          <button className="action" onClick={() => this.setShareModal(window.location.href, 'page')}>
            <svg className="icon" width="10" height="12" viewBox="0 0 10 12"><title>icon-share</title><g fill="none" fillRule="evenodd"><path d="M6.45 1l1.414 1.414-4.95 4.95L1.5 5.95zM0 10h10v2H0z" /><path d="M9 1V0H2v2h5v5h2V1z" /></g></svg>
            Share
          </button>

          <Modal
            opened={this.state.modalDevelop}
            close={() => this.setState({ modalDevelop: false })}
          >
            <div className="content">
              The website is under development. Download
              details will be added here.
            </div>
          </Modal>

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
