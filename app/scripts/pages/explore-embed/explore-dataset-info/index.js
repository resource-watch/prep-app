import { connect } from 'react-redux';
import initialState from 'pages/explore/explore-dataset-info/explore-dataset-info-initial-state';
import * as exploreActions from 'pages/explore/explore-actions';
import { getSelectedDataset } from 'pages/explore/explore-datasets-list/explore-datasets-list-selector';
import Component from 'pages/explore/explore-dataset-info/explore-dataset-info-component';

const mapStateToProps = state => ({
  embed: true,
  dataset: getSelectedDataset(state)
});

export { initialState };

export default connect(mapStateToProps, exploreActions)(Component);
