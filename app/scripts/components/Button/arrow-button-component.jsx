import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/ui/Icon';
import classnames from 'classnames';


const ArrowButton = (props) => {
  const classNames = classnames(
    'c-button -filled -secondary-color -arrow -left',
    {
      '-next': !!props.next,
      ' -previous': !props.next,
      '-hidden': (!props.infinite && (props.next && Math.ceil(props.slideCount / props.slidesToShow)) === props.currentSlide + 1)
        || (!props.infinite && (!props.next && props.currentSlide === 0)),
      '-full': props.full
    }
  );

  return (
    <button
      className={classNames}
      onClick={props.onClick}
    >
      <Icon name="icon-arrow-down" />
      <span className="arrow-label">{props.next ? 'next' : 'previous'}</span>
    </button>
  );
};

ArrowButton.propTypes = {
  next: PropTypes.bool,
  full: PropTypes.bool,
  infinite: PropTypes.bool,
  onClick: PropTypes.func,
  currentSlide: PropTypes.number,
  slidesToShow: PropTypes.number,
  slideCount: PropTypes.number
};

export default ArrowButton;
