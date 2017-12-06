import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Geosuggest from 'react-geosuggest';
import isEqual from 'lodash/isEqual';
import './style.scss';

// Redux
import { setMarkerPosition } from 'actions/nexgddptool';

class LocationSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marker: undefined
    };
    this.onSuggestSelect = this.onSuggestSelect.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    // We clear the content of the search input if the
    // marker has been moved from the last place set by
    // this component
    if (!isEqual(nextProps.marker, this.props.marker)
      && !isEqual(nextProps.marker, this.state.marker)
      && this.geoSuggest) {
      this.geoSuggest.clear();
      this.setState({ marker: nextProps.marker });
    }

    return false;
  }

  onSuggestSelect(e) {
    if (!e) return;

    const { lat, lng } = e.location;
    this.setState({ marker: [lat, lng] });
    this.props.setMarkerPosition([lat, lng]);
  }

  render() {
    return (
      <div className="c-location-search">
        <Geosuggest
          ref={(node) => { this.geoSuggest = node; }}
          onSuggestSelect={this.onSuggestSelect}
        />
      </div>
    );
  }
}

LocationSearch.propTypes = {
  marker: PropTypes.array, // eslint-disable-line react/no-unused-prop-types
  setMarkerPosition: PropTypes.func
};

const mapStateToProps = state => ({
  marker: state.nexgddptool.marker
});

const mapDispatchToProps = dispatch => ({
  setMarkerPosition: (...params) => dispatch(setMarkerPosition(...params))
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationSearch);
