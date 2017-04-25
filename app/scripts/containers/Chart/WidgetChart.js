import { connect } from 'react-redux';
import WidgetComponent from '../../components/Chart/WidgetChart';

import { getWidgetBySlug } from '../../actions/widgets';

const mapStateToProps = state => ({
  data: state.widgets
});

const mapDispatchToProps = dispatch => ({
  getWidgetBySlug: slug => dispatch(getWidgetBySlug(slug))
});

export default connect(mapStateToProps, mapDispatchToProps)(WidgetComponent);
