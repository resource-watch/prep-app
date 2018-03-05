import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Geosuggest from 'react-geosuggest';
import isEqual from 'lodash/isEqual';
import Icon from 'components/ui/Icon';

// Redux
import { setMapZoom, setMapCenter, setMarkerPosition } from 'actions/locatool';

import './style.scss';

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
    this.props.setMapZoom(7);

    // Yes I know... But without it the map will only zoom and it won't center
    setTimeout(() => {
      this.props.setMapCenter([lat, lng]);
    }, 500);
  }

  render() {
    return (
      <div className="c-location-search">
        <Icon name="icon-search" />
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
  setMarkerPosition: PropTypes.func,
  setMapCenter: PropTypes.func,
  setMapZoom: PropTypes.func
};

const mapStateToProps = state => ({
  marker: state.locatool.marker
});

const mapDispatchToProps = {
  setMarkerPosition,
  setMapZoom,
  setMapCenter
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationSearch);
