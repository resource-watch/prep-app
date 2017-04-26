import React, { Component } from 'react';
import Slider from '../../lib/react-slick/react-slick';

const settings = {
  dots: false,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 5000,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  swipe: false
};

class PartnersSlider extends Component {

  componentDidMount() {
    if (!this.props.data.length) {
      this.props.getPartners();
    }
  }
  render() {
    const partners = this.props.featured.map(d => (
      <div key={`partner-slider-${d.id}`}>
        <a href={d.url} target="_blank" className="logo" rel="noopener noreferrer">
          <img
            src={config.apiUrl + d.images.white_logo}
            alt={d.name}
          />
        </a>
      </div>
    ));

    return (
      <div className="c-partners-slider">
        {this.props.route && this.props.route === '/' &&
          <h2 className="-left">Our partners</h2>
        }
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
  getPartners: React.PropTypes.func.isRequired,
  route: React.PropTypes.string,
  featured: React.PropTypes.any
};

export default PartnersSlider;
