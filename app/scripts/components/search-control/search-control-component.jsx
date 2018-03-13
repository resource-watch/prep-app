import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Tooltip from 'rc-tooltip/dist/rc-tooltip';

import Icon from 'components/ui/Icon';

import 'rc-tooltip/assets/bootstrap_white.css';

import LocationSearch from 'pages/explore/location-search';



class SearchControl extends Component {
  state = {
    search: false,
    visible: false
  }

  handleClick(event) {
    event.preventDefault();
    const { search } = this.state;

    if(!search) {
      this.setState({search: !search});

      this.setState({
        visible: false
      });
    } else {
      this.closeSearch(false)
    }
  }

  closeSearch = (search) => {
    this.setState({ search });
  }

  toggleTooltip(visible) {
    this.setState({visible});
  }

  render() {
    const { search, visible } = this.state;
    const { setMapParams } = this.props;

    const classNames = classnames({
      [this.props.className]: !!this.props.className
    });

    const tooltipContent = (
      <div className="tooltip-content">
        <h5 className="title">Search location</h5>
      </div>
    );

    return (
      <div className={`c-search-control ${classNames}`}>
          <div className="search-container">
            { search &&
              <LocationSearch onChange={setMapParams} onSearch={this.closeSearch} />
            }
            <Tooltip
              overlay={tooltipContent}
              placement="left"
              onVisibleChange={visible => this.toggleTooltip(visible)}
              visible={visible}
              trigger={search ? '' : 'hover'}
            >
              <button
                type="button"
                className="c-button-map"
                onClick={e => this.handleClick(e)}
              >
                <Icon name="icon-search" className="-small" />
              </button>
            </Tooltip>
          </div>
      </div>
    );
  }
}

SearchControl.propTypes = {
  className: PropTypes.string,
  open: PropTypes.bool
};

export default SearchControl;
