import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Icon from 'components/ui/Icon';


class ShareControl extends Component {
  handleClick(event) {
    event.preventDefault();
    this.props.toggleSharedModal(!this.props.open);
    this.props.updateLinks({
      linkUrl: this.props.linkUrl
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
  toggleSharedModal: PropTypes.func,
  updateLinks: PropTypes.func,
  open: PropTypes.bool,
  className: PropTypes.string,
  linkUrl: PropTypes.string
};

export default ShareControl;
