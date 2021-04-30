import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Tooltip, Icons } from 'widget-editor';
import ShareModalComponent from '../share-modal';
import EmbedModalComponent from '../embed-modal';
import GDPRBanner from '../gdpr-banner';
import Ribbon from '../ribbon';

class Root extends React.Component {
  componentDidMount() {
    const { location } = this.props;

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

  render() {
    const { children } = this.props;

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
      </div>
    );
  }
}

Root.defaultProps = {
  location: {},
};

Root.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
};

export default Root;
