import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Icon from 'components/ui/Icon';


class ShareControl extends Component {
  handleClick(event) {
    const { open } = this.props;
    event.preventDefault();
    this.props.setOpen(!open);
    this.props.setLinks(this.props.links);
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
  links: PropTypes.object,
  setOpen: PropTypes.func,
  setLinks: PropTypes.func
};

export default ShareControl;
