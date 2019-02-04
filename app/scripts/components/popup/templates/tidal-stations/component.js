import React, { Component } from 'react';
import PropTypes from 'prop-types';


class TidalStations extends Component {
  static propTypes = {
    onModal: PropTypes.func.isRequired
  };

  render() {
    const { onModal } = this.props;

    return (
      <div className="c-tidal-stations">
        <button
          type="button"
          onClick={onModal}
        >
          More info
        </button>
      </div>
    );
  }
}


export default TidalStations;
