import React, { PureComponent } from 'react';

// component
import GDPRBanner from './component';

// utils
import { getGDPRAccepted, setGDPRAccepted } from './helpers';

class GDPRBannerContainer extends PureComponent {

  state = {
    accepted: getGDPRAccepted()
  }

  handleGDPR = () => {
    setGDPRAccepted();
    this.setState({ accepted: getGDPRAccepted() });
  };

  render() {
    const { accepted } = this.state;

    return !accepted ? <GDPRBanner handleGDPR={this.handleGDPR} /> : null;
  }
};

export default GDPRBannerContainer;