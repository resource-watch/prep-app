import React from 'react';
import { Modal, Tooltip, Icons } from 'widget-editor';
import WelcomeModal from '../Modal/WelcomeModal';
import ShareModalComponent from '../share-modal';

class Root extends React.Component {
  constructor() {
    super();
    this.state = {
      modalWelcomeOpen: false
    };
  }

  componentDidMount() {
    if (localStorage.getItem('modalWelcomeOpened') === false ||
      localStorage.getItem('modalWelcomeOpened') === null) {
      this.setModalWelcome();
    }
  }

  setModalWelcome() {
    if (this.props.location.pathname.indexOf('embed') === -1) {
      this.setState({ modalWelcomeOpen: true });
    }
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
        <Modal />
        <Tooltip />
        <Icons />
        <ShareModalComponent />

        {this.props.children}

        {this.state.modalWelcomeOpen &&
          <WelcomeModal
            title={'Welcome to PREPdata'}
            opened={this.state.modalWelcomeOpen}
            close={() => {
              this.setState({ modalWelcomeOpen: false });
              localStorage.setItem('modalWelcomeOpened', JSON.stringify(true));
            }
            }
            hideCloseButton
          />
        }
      </div>
    );
  }
}

Root.propTypes = {
  location: React.PropTypes.object,
  children: React.PropTypes.any
};

export default Root;
