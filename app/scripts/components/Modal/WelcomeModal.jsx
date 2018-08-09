import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import Button from '../Button/Button';

class WelcomeModal extends React.Component {
  constructor(props) {
    super(props);
  }

  getContent() {
    return (
      <div className="m-content">
        <article>
          <h2>{this.props.title}</h2>
          <p>We are continuing to add data and functionality to PREPdata. We welcome feedback on the platform's content and navigation and welcome suggestions for other features you would like to see. Have a suggestion? Send us a message at info@prepdata.org.</p>
          <p className="-small"><strong>DISCLAIMER:</strong> YOU AGREE THAT YOUR USE OF THE SITE AND ITS CONTENT IS AT YOUR SOLE RISK. WE MAKE NO PROMISES OR COMMITMENTS ABOUT THE SITE OR ITS CONTENT, AND THE SITE AND CONTENT ARE PROVIDED ON AN “AS IS” BASIS AND WITHOUT WARRANTIES OR REPRESENTATIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, STATUTORY, EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.</p>
        </article>
        <aside>
          <div className="small-12 align-center" style={{ display: 'flex' }}>
            <Button click={() => this.props.close()} alternative border="alternative">
              Continue
            </Button>
          </div>
        </aside>
      </div>
    );
  }

  render() {
    return (
      <Modal
        opened={this.props.opened}
        close={this.props.close}
        hideCloseButton={this.props.hideCloseButton}
      >
        <div className="content">
          {this.getContent()}
        </div>
      </Modal>
    );
  }
}

WelcomeModal.propTypes = {
  /**
   * Define the welcome modal title
   */
  title: PropTypes.string.isRequired,
  /**
   * Define the welcome modal status
   */
  opened: PropTypes.bool.isRequired,
  /**
   * Define whether the modal has a close button or not
   */
  hideCloseButton: PropTypes.bool,
  /**
   * Define the welcome modal function to close the modal
   */
  close: PropTypes.func.isRequired
};

export default WelcomeModal;
