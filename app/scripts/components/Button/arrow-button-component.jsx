import React from 'react';
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
  next: React.PropTypes.bool,
  full: React.PropTypes.bool,
  infinite: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  currentSlide: React.PropTypes.number,
  slidesToShow: React.PropTypes.number,
  slideCount: React.PropTypes.number
};

export default ArrowButton;
