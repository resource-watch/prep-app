import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Icon from 'components/ui/Icon';


class ShareControl extends Component {
  handleClick(event) {
    const { open } = this.props;
    const { href, origin, pathname, search } = window.location;
    event.preventDefault();
    this.props.setOpen(!open);

    this.props.setLinks({
      link: href,
      embed: `${origin}/embed${pathname}${search}`
    });
  }

  render() {
    const classNames = classnames({
      [this.props.className]: !!this.props.className
    });

    return (
      <div className={`c-share-control ${classNames}`}>
        <button
          type="button"
          className="c-button-map"
          onClick={e => this.handleClick(e)}
        >
          <Icon name="icon-share" className="-small" />
        </button>
      </div>
    );
  }
}

ShareControl.propTypes = {
  className: PropTypes.string,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  setLinks: PropTypes.func
};

export default ShareControl;
