import { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as exploreActions from 'pages/explore-export/explore-export-actions';
import reducers, { initialState } from 'pages/explore/explore-dataset-filters/explore-dataset-filters-reducer';

import ExploreDatasetFiltersComponent from 'pages/explore/explore-dataset-filters/explore-dataset-filters-component';

const mapStateToProps = state => ({ data: state.explorePage.datasetFilters.data });

class ExploreDatasetFiltersContainer extends Component {
  componentWillMount() {
    if (!Object.keys(this.props.data).length) this.props.getFiltersData();
  }

  render() {
    return createElement(ExploreDatasetFiltersComponent, { ...this.props });
  }
}

ExploreDatasetFiltersContainer.propTypes = {
  getFiltersData: PropTypes.func,
  data: PropTypes.object
};

export { exploreActions, reducers, initialState };


export default connect(mapStateToProps, exploreActions)(ExploreDatasetFiltersContainer);
