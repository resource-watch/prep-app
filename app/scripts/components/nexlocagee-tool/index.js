import { connect } from 'react-redux';
import { getSelectorsInfo, getUrlState, setDefaultState, setMapMode, resetState, setDataset } from 'actions/nexlocageetool';
import Component from './NexLocaGeeTool';

const mapStateToProps = state => ({
  open: state.shareModal.open,
  render: state.nexgddptool.render,
  marker: state.nexgddptool.marker,
  isComparing: !!state.nexgddptool.range2.selection,
  mapMode: state.nexgddptool.mapMode,
  indicatorDataset: state.nexgddptool.indicatorDataset
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
