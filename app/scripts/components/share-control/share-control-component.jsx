import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { logEvent } from 'helpers/analytics';

import Icon from 'components/ui/Icon';


class ShareControl extends Component {
  handleClick(event) {
    const { open } = this.props;
    event.preventDefault();
    this.props.setOpen(!open);
    this.props.setLinks(this.props.links);

    // Only for Explore
    if (this.props.analytics) {
      const { category, action } = this.props.analytics;
      this.props.setAnalytics({
        category,
        action
      });
      logEvent(category, action, 'Opens infowindow');
    }
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
  setLinks: PropTypes.func,
  setAnalytics: PropTypes.func.isRequired,
  /**
   * Define the category and action for the analytics
   * event of the share modal
   */
  analytics: PropTypes.shape({
    category: PropTypes.string,
    action: PropTypes.string
  })
};

export default ShareControl;
