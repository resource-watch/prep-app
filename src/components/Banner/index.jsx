import React from 'react';

import homepageBg from '../../images/bg/bg-home.jpg';
import partnershipBg from '../../images/bg/bg-partnership.jpg';

const bannerSpec = {
  defaults: {
    bg: null,
    className: '-medium'
  },
  home: {
    bg: homepageBg,
    className: '-big -landing'
  },
  partnership: {
    bg: partnershipBg,
    className: '-medium'
  }
};

class Banner extends React.Component {

  render() {
    const data = this.props.metadata;
    let currentSpec = bannerSpec.defaults;

    if (bannerSpec[this.props.metadata.name]) {
      currentSpec = bannerSpec[this.props.metadata.name];
    }

    return (
      <div
        className={`c-banner -inverse ${currentSpec.className}`}
        style={{backgroundImage: `url(${currentSpec.bg})`}}
      >
        <div className="row align-middle">
          <div className="column small-12">
            <h1>{data.title}</h1>
          </div>
        </div>
      </div>
    );
  }

}

export default Banner;
