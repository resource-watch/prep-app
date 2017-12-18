import { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from './dataset-location-filter-actions';
import reducers, { initialState } from './dataset-location-filter-reducer';
import DatasetLocationFilter from './dataset-location-filter-component';

const mapStateToProps = state => ({
  location: state.coreDatasetsFilter.location
});

class DatasetLocationFilterContainer extends Component {
  componentWillMount() {
    const { setDatasetsLocation } = this.props;
    const { query } = this.context.location;
    const { coreDatasetsLocation } = query || {};

    setDatasetsLocation(coreDatasetsLocation || 'global');
  }

  onClickLocation(location) {
    const { setDatasetsLocation } = this.props;
    setDatasetsLocation(location);
  }

  render() {
    const { location } = this.props;

    return createElement(DatasetLocationFilter, {
      ...this.props,
      location,
      onClickLocation: this.onClickLocation.bind(this)
    });
  }
}

DatasetLocationFilterContainer.contextTypes = {
  location: PropTypes.object
};

DatasetLocationFilterContainer.propTypes = {
  location: PropTypes.string,
  setDatasetsLocation: PropTypes.func
};

export { actions, reducers, initialState };

export default connect(mapStateToProps, actions)(DatasetLocationFilterContainer);
