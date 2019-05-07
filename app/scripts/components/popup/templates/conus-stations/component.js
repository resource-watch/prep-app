import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ConusStations extends Component {
  static propTypes = {
    onModal: PropTypes.func.isRequired
  };

  render() {
    const { onModal } = this.props;

    return (
      <div className="c-conus-stations">
        <button
          className="c-new-button -light -transparent -compressed -fullwidth"
          type="button"
          onClick={onModal}
        >
          View threshold exceedance
        </button>
      </div>
    );
  }
}


export default ConusStations;
