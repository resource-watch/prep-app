import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

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
    const { routing } = this.props;
    const { accepted } = this.state;
    const isEmbed = routing.locationBeforeTransitions.pathname.search('embed') > 0;

    return !accepted && !isEmbed ? <GDPRBanner handleGDPR={this.handleGDPR} /> : null;
  }
};

const mapStateToProps = state => ({
  routing: state.routing,
});

export default connect(mapStateToProps, null)(GDPRBannerContainer);
