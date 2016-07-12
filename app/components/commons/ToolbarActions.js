import React from 'react';
import { Link } from 'react-router';

import Modal from './Modal';

class ToolbarActions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
  }
  render() {
    return (
      <div className="c-toolbar-actions">
        <div className="left">
          <Link to={`/${this.props.currentSection}`} className="action" >
            <svg className="icon" width="7" height="10" viewBox="0 0 7 10" xmlns="http://www.w3.org/2000/svg"><title>icon-back</title><path d="M.707 4.243L0 4.95 4.95 9.9l1.414-1.415L2.828 4.95l3.536-3.536L4.95 0 .707 4.243z" fill-rule="evenodd" /></svg>
            {this.props.currentSection}
          </Link>
        </div>
        <div className="right">
          <button className="action" onClick={() => this.setState({ modalOpen: true })}>
            <svg className="icon" width="10" height="12" viewBox="0 0 10 12" xmlns="http://www.w3.org/2000/svg"><title>icon download</title><g fill="none" fill-rule="evenodd"><path d="M4 0h2v7H4zM0 10h10v2H0z" /><path d="M4.243 8.192l.707.707L9.9 3.95 8.484 2.537 4.95 6.07 1.414 2.536 0 3.95l4.243 4.242z" /></g></svg>
            Download
          </button>
          <button className="action" onClick={() => this.setState({ modalOpen: true })}>
            <svg className="icon" width="10" height="12" viewBox="0 0 10 12" xmlns="http://www.w3.org/2000/svg"><title>icon-share</title><g fill="none" fill-rule="evenodd"><path d="M6.45 1l1.414 1.414-4.95 4.95L1.5 5.95zM0 10h10v2H0z" /><path d="M9 1V0H2v2h5v5h2V1z" /></g></svg>
            Share
          </button>

          <Modal
            opened={this.state.modalOpen}
            close={() => this.setState({ modalOpen: false })}
          >
            <div className="content">
              The website is under development. Download and share
              details will be added here.
            </div>
          </Modal>
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
  currentSection: React.PropTypes.string.isRequired
};

export default ToolbarActions;
