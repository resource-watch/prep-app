import { connect } from 'react-redux';
import { getActiveDatasets } from 'components/datasets-list/datasets-list-selector';
import Component from './map-component';

const mapStateToProps = state => ({
  activeDatasets: getActiveDatasets(state),
  basemap: state.explorepage.basemap
});

// const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps)(Component);
