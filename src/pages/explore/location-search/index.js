import { connect } from 'react-redux';
import LocationSearchComponent from './location-search-component';
import { setMapParams, setBBox } from '../explore-actions';

const mapDispatchToProps = { setMapParams, setBBox };

export default connect(null, mapDispatchToProps)(LocationSearchComponent);
