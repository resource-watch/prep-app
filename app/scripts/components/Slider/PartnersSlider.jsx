import React from 'react';
import Slider from 'react-slick';
import ArrowButton from '../Button/arrow-button-component';

const settings = {
  dots: false,
  arrows: true,
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
    const isThumbnail = this.props.thumbnail;
    const partners = this.props.featured.map(d => (
      <div key={`partner-slider-${d.id}`}>
        <a href={d.url} target="_blank" className="logo" rel="noopener noreferrer">
          <img
            src={`${config.assetsUrl}${isThumbnail ? d.images.thumbnail : d.images.white_logo}`}
            alt={d.name}
            className={isThumbnail ? 'thumbnail' : ''}
          />
        </a>
      </div>
    ));

    return (
      <div className="c-partners-slider">
        {this.props.route && this.props.route === '/' &&
          <h2 className="-left">Our partners</h2>
        }
        <Slider
          {...settings}
          nextArrow={<ArrowButton full next slidesToShow={settings.slidesToShow} />}
          prevArrow={<ArrowButton full slidesToShow={settings.slidesToShow} />}
        >
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
  thumbnail: React.PropTypes.bool,
  featured: React.PropTypes.any
};

export default PartnersSlider;
