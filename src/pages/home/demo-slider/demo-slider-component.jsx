import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import ArrowButton from 'components/Button/arrow-button-component';

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

const DemoSlider = props => {
  const { offset, children } = props;
  return (
    <div className={`c-demo-slider ${offset ? '-offset' : ''}`}>
      <div className="row align-center">
        <div className="column small-12 medium-12">
          <Slider
            {...settings}
            nextArrow={<ArrowButton next slidesToShow={settings.slidesToShow} />}
            prevArrow={<ArrowButton slidesToShow={settings.slidesToShow} />}
          >
            {children}
          </Slider>
        </div>
      </div>
    </div>
  )
};

DemoSlider.propTypes = {
  children: PropTypes.node.isRequired,
  offset: PropTypes.bool,
  slidesToShow: PropTypes.func
};

DemoSlider.defaultProps = {
  offset: false,
  slidesToShow: () => {}
};

export default DemoSlider;
