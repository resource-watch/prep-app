import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ClimateByLocation extends Component {
  static propTypes = {
    onModal: PropTypes.func.isRequired
  };

  render() {
    const { onModal } = this.props;

    return (
      <div className="c-tidal-stations">
        <button
          className="c-new-button -light -transparent"
          type="button"
          onClick={onModal}
        >
          More info
        </button>
      </div>
    );
  }
}


export default ClimateByLocation;
