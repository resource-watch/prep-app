import { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as exploreActions from '../explore-actions';
import reducers, { initialState } from './explore-dataset-filters-reducer';

import ExploreDatasetFiltersComponent from './explore-dataset-filters-component';
// import getFilterStatus from './explore-dataset-filters-selectors';

const mapStateToProps = state => ({
  data: state.explorePage.datasetFilters.data
});

class ExploreDatasetFiltersContainer extends Component {
  componentWillMount() {
    if (!Object.keys(this.props.data).length) this.props.getFiltersData();
  }

  render() {
    return createElement(ExploreDatasetFiltersComponent, {
      ...this.props
    });
  }
}

ExploreDatasetFiltersContainer.propTypes = {
  getFiltersData: PropTypes.func,
  data: PropTypes.object
};

export { exploreActions, reducers, initialState };


export default connect(mapStateToProps, exploreActions)(ExploreDatasetFiltersContainer);
