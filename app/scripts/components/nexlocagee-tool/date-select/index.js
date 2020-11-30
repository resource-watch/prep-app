import { connect } from 'react-redux';
import { setRange1Selection } from 'actions/nexlocageetool';
import Component from './DateSelect';

const mapStateToProps = state => ({
  range1: state.nexlocageetool.range1,
});

const mapDispatchToProps = dispatch => ({
  setRange1Selection: (...params) => dispatch(setRange1Selection(...params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
