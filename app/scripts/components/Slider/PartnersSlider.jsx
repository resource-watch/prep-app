import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

const defaultSettings = {
  dots: false,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 2000,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  swipe: false
};

class PartnersSlider extends React.Component {
  componentDidMount() {
    if (!this.props.data.length) {
      this.props.getPartners();
    }
  }

  render() {
    const { thumbnail, settings } = this.props;
    const newSettings = { ...defaultSettings, ...settings };
    const partners = this.props.featured.map(d => (
      <div key={`partner-slider-${d.id}`}>
        <a href={d.url} target="_blank" className="logo" rel="noopener noreferrer">
          <img
            src={`${config.assetsUrl}${thumbnail ? d.images.thumbnail : d.images.white_logo}`}
            alt={d.name}
            className={thumbnail ? 'thumbnail' : ''}
          />
        </a>
      </div>
    ));

    return (
      <div className="c-partners-slider">
        {this.props.route && this.props.route === '/' &&
          <h2 className="-left">Our partners</h2>
        }
        <Slider {...newSettings}>
          {partners}
        </Slider>
      </div>
    );
  }
}

PartnersSlider.defaultProps = {
  data: [],
  settings: {}
};

PartnersSlider.propTypes = {
  // Define the partners list
  data: PropTypes.array,
  // Define the function to get the partners list
  getPartners: PropTypes.func.isRequired,
  route: PropTypes.string,
  thumbnail: PropTypes.bool,
  settings: PropTypes.object,
  featured: PropTypes.any
};

export default PartnersSlider;
