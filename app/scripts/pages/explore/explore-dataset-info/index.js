import { connect } from 'react-redux';
import initialState from './explore-dataset-info-initial-state';
import * as exploreActions from '../explore-actions';
import { getSelectedDataset } from '../explore-datasets-list/explore-datasets-list-selector';
import Component from './explore-dataset-info-component';

const mapStateToProps = state => ({
  dataset: getSelectedDataset(state)
});

export { initialState };

export default connect(mapStateToProps, exploreActions)(Component);
