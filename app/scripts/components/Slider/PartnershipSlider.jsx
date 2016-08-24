import React, { Component } from 'react';
import Slider from '../../lib/react-slick/react-slick';
import engagementSlide from '../../../images/partnerships/engagement-slide.jpg';

const settings = {
  dots: false,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 3000,
  infinite: true,
  speed: 500,
  slidesToShow: 1
};

class PartnersSlider extends Component {

  render() {
    return (
      <div className="c-partnership-slider">
        <Slider {...settings}>
          <div className="partnership-slider-item -inverse" style={{backgroundImage: `url(${engagementSlide})`}}>
            <div className="row align-center">
              <div className="column small-12 medium-8">
                <h2>Engagement</h2>
                <p>Entities collaborate on the building of platforms to enhance access and usability of data.</p>
              </div>
            </div>
          </div>
          <div className="partnership-slider-item -inverse" style={{backgroundImage: `url(${engagementSlide})`}}>
            <div className="row align-center">
              <div className="column small-12 medium-8">
                <h2>Data</h2>
                <p>Entities that work to establish ensure interoperability in access and use of climate-relevant data and information produce.</p>
              </div>
            </div>
          </div>
          <div className="partnership-slider-item -inverse" style={{backgroundImage: `url(${engagementSlide})`}}>
            <div className="row align-center">
              <div className="column small-12 medium-8">
                <h2>Platforms</h2>
                <p>Entities collaborate on the building of platforms to enhance access and usability of data.</p>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    );
  }

}

export default PartnersSlider;
