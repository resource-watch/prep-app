import React from 'react';
import Slider from 'react-slick';
import ArrowButton from '../Button/arrow-button-component';

// styles
import './demo-slider-styles.scss';

const settings = {
  dots: false,
  arrows: true,
  autoplay: false,
  infinite: false,
  speed: 500,
  slidesToShow: 2,
  swipe: false
};

const DemoSlider = props => (
  <div className={`c-demo-slider ${props.offset ? '-offset' : ''}`}>
    <div className="row align-center">
      <div className="column small-12 medium-12">
        <Slider
          {...settings}
          nextArrow={<ArrowButton next slidesToShow={settings.slidesToShow} />}
          prevArrow={<ArrowButton slidesToShow={settings.slidesToShow} />}
        >
          {props.children}
        </Slider>
      </div>
    </div>
  </div>
);

DemoSlider.propTypes = {
  children: React.PropTypes.array,
  offset: React.PropTypes.bool,
  slidesToShow: React.PropTypes.func
};

export default DemoSlider;
