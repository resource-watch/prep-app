import React, { Component } from 'react';
import Slider from '../../lib/react-slick/react-slick';

const settings = {
  dots: false,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 3000,
  infinite: true,
  speed: 500,
  slidesToShow: 5
};

class PartnersSlider extends Component {

  componentDidMount() {
    if (!this.props.data.length) {
      this.props.getFeaturedPartners();
    }
  }

  render() {
    const partners = this.props.data.map(d => (
      <div key={`partner-slider-${d.id}`}>
        <a href={d.url} rel="noreferrer" target="_blank" className="logo">
          <img
            src={config.apiUrl + d.white_logo_medium}
            alt={d.name}
          />
        </a>
      </div>
    ));

    return (
      <div className="c-partners-slider">
        <h2 className="-left">Our partners</h2>
        <Slider {...settings}>
          {partners}
        </Slider>
      </div>
    );
  }

}

PartnersSlider.defaultProps = {
  data: []
};

PartnersSlider.propTypes = {
  // Define the partners list
  data: React.PropTypes.array,
  // Define the function to get the partners list
  getFeaturedPartners: React.PropTypes.func.isRequired
};

export default PartnersSlider;
