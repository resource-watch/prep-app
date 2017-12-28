import { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from './dataset-location-filter-actions';
import reducers, { initialState } from './dataset-location-filter-reducer';
import DatasetLocationFilter from './dataset-location-filter-component';

const mapStateToProps = state => ({
  location: state.coreDatasetsFilter.location
});

export { actions, reducers, initialState };

export default connect(mapStateToProps, actions)(DatasetLocationFilter);
