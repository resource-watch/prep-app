import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/ui/Icon';


class ShareButton extends Component {
  handleClick(event) {
    event.preventDefault();
    this.props.toggleSharedModal(!this.props.open);
    this.props.updateLinks({
      linkUrl: this.props.linkUrl
    });
  }

  render() {
    return (
      <button
        type="button"
        className="btn-basemaps"
        onClick={e => this.handleClick(e)}
      >
        <Icon name="icon-share" className="-small" />
      </button>
    );
  }
}

ShareButton.propTypes = {
  toggleSharedModal: PropTypes.func,
  updateLinks: PropTypes.func,
  open: PropTypes.bool,
  linkUrl: PropTypes.string
};

export default ShareButton;
