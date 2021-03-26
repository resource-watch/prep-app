import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Tooltip, Icons } from 'widget-editor';
import WelcomeModal from '../Modal/WelcomeModal';
import ShareModalComponent from '../share-modal';
import EmbedModalComponent from '../embed-modal';
import GDPRBanner from '../gdpr-banner';
import Ribbon from '../ribbon';

class Root extends React.Component {
  constructor() {
    super();
    this.state = { modalWelcomeOpen: false };
  }

  componentDidMount() {
    const { location } = this.props;

    if (localStorage.getItem('modalWelcomeOpened') === false ||
      localStorage.getItem('modalWelcomeOpened') === null) {
      this.setModalWelcome();
    }

    if ((location.pathname.indexOf('embed') === -1) && (location.pathname.indexOf('export') === -1)) {
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
    const { location } = this.props;

    if (location.pathname.indexOf('embed') === -1) {
      this.setState({ modalWelcomeOpen: true });
    }
  }

  render() {
    const { children } = this.props;
    const { modalWelcomeOpen } = this.state;

    return (
      <div style={{ height: '100%' }}>

        <Modal />
        <Tooltip />
        <Icons />
        <ShareModalComponent />
        <EmbedModalComponent />
        <GDPRBanner />
        <Ribbon />

        {children}

        {modalWelcomeOpen && (
          <WelcomeModal
            title="Welcome to PREPdata"
            opened={modalWelcomeOpen}
            close={() => {
              this.setState({ modalWelcomeOpen: false });
              localStorage.setItem('modalWelcomeOpened', JSON.stringify(true));
              window.location.href = '/explore';
            }}
            hideCloseButton
          />
        )}
      </div>
    );
  }
}

Root.defaultProps = {
  location: {},
};

Root.propTypes = {
  location: PropTypes.shape({}),
  children: PropTypes.node.isRequired,
};

export default Root;
