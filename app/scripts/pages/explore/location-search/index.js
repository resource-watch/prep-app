import { connect } from 'react-redux';
import LocationSearchComponent from './location-search-component';
import { setMapParams } from '../explore-actions';

const mapDispatchToProps = { setMapParams };

export default connect(null, mapDispatchToProps)(LocationSearchComponent);
