import { connect } from 'react-redux';
import { setRange1Selection, setRange2Selection } from 'actions/nexlocageetool';
import Component from './DateRangeSelect';

const mapStateToProps = state => ({
  range1: state.nexlocageetool.range1,
  range2: state.nexlocageetool.range2,
});

const mapDispatchToProps = dispatch => ({
  setRange1Selection: (...params) => dispatch(setRange1Selection(...params)),
  setRange2Selection: (...params) => dispatch(setRange2Selection(...params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
