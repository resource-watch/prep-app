import { connect } from 'react-redux';
import { getSelectorsInfo, getUrlState, setDefaultState, setMapMode, resetState, setDataset } from 'actions/nexlocageetool';
import Component from './NexLocaGeeTool';

const mapStateToProps = state => ({
  open: state.shareModal.open,
  render: state.nexlocageetool.render,
  marker: state.nexlocageetool.marker,
  isComparing: !!state.nexlocageetool.range2.selection || state.nexlocageetool.mapMode === 'difference',
  mapMode: state.nexlocageetool.mapMode,
  indicatorDataset: state.nexlocageetool.indicatorDataset
});

const mapDispatchToProps = dispatch => ({
  getSelectorsInfo: () => dispatch(getSelectorsInfo()),
  restoreState: () => dispatch(getUrlState()),
  setDefaultState: () => dispatch(setDefaultState()),
  setMapMode: (...params) => dispatch(setMapMode(...params)),
  resetState: () => dispatch(resetState()),
  setDataset: (...params) => dispatch(setDataset(...params))
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
