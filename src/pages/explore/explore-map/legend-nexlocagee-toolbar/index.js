import { connect } from 'react-redux';
import Component from './legend-nexlocagee-toolbar-component';
import { getNexLocaGeeDatasets } from '../explore-map-selector';

const mapStateToProps = state => ({
  nexLocaGeeDatasets: getNexLocaGeeDatasets(state),
});

export default connect(mapStateToProps, null)(Component);
