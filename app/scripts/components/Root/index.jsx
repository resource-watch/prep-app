import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Tooltip, Icons } from 'widget-editor';
import WelcomeModal from '../Modal/WelcomeModal';
import ShareModalComponent from '../share-modal';
import EmbedModalComponent from '../embed-modal';

class Root extends React.Component {
  constructor() {
    super();
    this.state = { modalWelcomeOpen: false };
  }

  componentDidMount() {
    if (localStorage.getItem('modalWelcomeOpened') === false ||
      localStorage.getItem('modalWelcomeOpened') === null) {
      this.setModalWelcome();
    }

    if ((this.props.location.pathname.indexOf('embed') === -1) && (this.props.location.pathname.indexOf('export') === -1)) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.innerHTML = `window._urq = window._urq || [];
        _urq.push(['initSite', '9733164d-c1be-4cca-8197-204f88eae770']);
        (function() { var ur = document.createElement('script'); ur.type =
        'text/javascript'; ur.async = true; ur.src = 'https://cdn.userreport.com/userreport.js'; var s =
        document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ur,
        s); })();`;
      document.body.appendChild(script);
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
        <EmbedModalComponent />

        {this.props.children}

        {this.state.modalWelcomeOpen && (
<WelcomeModal
            title="Welcome to PREPdata"
            opened={this.state.modalWelcomeOpen}
            close={() => {
              this.setState({ modalWelcomeOpen: false });
              localStorage.setItem('modalWelcomeOpened', JSON.stringify(true));
            }
            }
            hideCloseButton
          />
)}
      </div>
    );
  }
}

Root.propTypes = {
  location: PropTypes.object,
  children: PropTypes.any
};

export default Root;
