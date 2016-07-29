import React, { Component } from 'react';
const Slider = require('react-slick');

const { apiUrl } = config;

class PartnersLogos extends Component {

  componentDidMount() {
    if (!this.props.data.length) {
      this.props.getPartners();
    }
  }

  render() {
    const settings = {
      dots: false,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 6000,
      speed: 400,
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 2
    };

    const partners = this.props.data.map((d, i) => (
      <div className="logo-container" key={`slide-'${i}`}>
        <a href={d.url} rel="noreferrer" target="_blank" className="logo">
          <img
            src={`${apiUrl}/${d.logo}`}
            width={d.logo_size.width}
            height={d.logo_size.height}
            alt={d.name}
          />
        </a>
      </div>
    ));

    return (
      <div className="c-partners-logos">
        <Slider className="slider-container" {...settings}>
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
