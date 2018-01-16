import { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as exploreActions from 'pages/explore/explore-actions';
import reducers, { initialState } from 'pages/explore/explore-dataset-filters/explore-dataset-filters-reducer';

import ExploreDatasetFiltersComponent from 'pages/explore/explore-dataset-filters/explore-dataset-filters-component';
import getFilterStatus from './explore-dataset-filters-selectors';

const mapStateToProps = state => ({
  data: getFilterStatus(state)
});

class ExploreDatasetFiltersContainer extends Component {
  componentWillMount() {
    this.props.getFiltersData();
  }

  render() {
    return createElement(ExploreDatasetFiltersComponent, {
      ...this.props
    });
  }
}

ExploreDatasetFiltersContainer.propTypes = {
  getFiltersData: PropTypes.func
};

export { exploreActions, reducers, initialState };


export default connect(mapStateToProps, exploreActions)(ExploreDatasetFiltersContainer);
