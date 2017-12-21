import React from 'react';
import Icon from 'components/ui/Icon';

const classes = 'c-button -filled -secondary-color -arrow -left';

const ArrowButton = props => (
  <button
    className={`
      ${classes} 
      ${props.next ? '-next' : '-previous'}
      ${props.currentSlide === 0 && !props.next ? '-hidden' : ''}
      ${props.full ? '-full' : ''}
      ${Math.ceil(props.slideCount / props.slidesToShow) === props.currentSlide + 1 && props.next ? '-hidden' : ''}
    `}
    onClick={props.onClick}
  >
    <Icon name="icon-arrow-down" />
    <span className="arrow-label">{props.next ? 'next' : 'previous'}</span>
  </button>
);

ArrowButton.propTypes = {
  next: React.PropTypes.bool,
  full: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  currentSlide: React.PropTypes.number,
  slidesToShow: React.PropTypes.number,
  slideCount: React.PropTypes.number
};

export default ArrowButton;
