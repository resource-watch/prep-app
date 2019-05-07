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
          className="c-new-button -light -transparent -compressed -fullwidth"
          type="button"
          onClick={onModal}
        >
          View climate variables
        </button>
      </div>
    );
  }
}


export default ClimateByLocation;
