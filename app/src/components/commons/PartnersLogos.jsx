import React, { Component } from 'react';
import Slider from '../../../lib/react-slick';

const settings = {
  dots: false,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 3000,
  infinite: true,
  speed: 500,
  slidesToShow: 6
};

class PartnersLogos extends Component {

  componentDidMount() {
    if (!this.props.data.length) {
      this.props.getPartners();
    }
  }

  render() {
    const partners = this.props.data.map(d => (
      <div key={`partner-slider-${d.id}`}>
        <a href={d.url} rel="noreferrer" target="_blank" className="logo">
          <img
            src={config.apiUrl + d.white_logo}
            alt={d.name}
          />
        </a>
      </div>
    ));

    return (
      <div className="c-partners-logos">
        <Slider {...settings}>
          {partners}
        </Slider>
      </div>
    );
  }

}

PartnersLogos.defaultProps = {
  data: []
};

PartnersLogos.propTypes = {
  // Define the partners list
  data: React.PropTypes.array,
  // Define the function to get the partners list
  getPartners: React.PropTypes.func.isRequired
};

export default PartnersLogos;
