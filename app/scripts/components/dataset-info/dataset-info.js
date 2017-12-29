import { connect } from 'react-redux';
import { toggleDataset } from 'components/datasets-list/datasets-list-action';
import { getSelectedDataset } from 'components/datasets-list/datasets-list-selector';
import Component from './dataset-info-component';

const mapStateToProps = state => ({
  dataset: getSelectedDataset(state)
});

const mapDispatchToProps = dispatch => ({
  toggleDataset: dataset => dispatch(toggleDataset(dataset))
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
