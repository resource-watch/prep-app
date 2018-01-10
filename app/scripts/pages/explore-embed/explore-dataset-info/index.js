import { connect } from 'react-redux';
import initialState from 'pages/explore/explore-dataset-info/explore-dataset-info-initial-state';
import Component from 'pages/explore/explore-dataset-info/explore-dataset-info-component';

import * as exploreActions from '../explore-embed-actions';
import { getSelectedDataset } from '../explore-datasets-list/explore-datasets-list-selector';

const mapStateToProps = state => ({
  embed: true,
  dataset: getSelectedDataset(state)
});

export { initialState };

export default connect(mapStateToProps, exploreActions)(Component);
