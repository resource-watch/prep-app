import { connect } from 'react-redux';
import DashboardsHome from '../../components/Home/Articles/DashboardsHome';

import { getWidgetBySlug } from '../../actions/widgets';

const mapStateToProps = (state) => ({
  widgets: state.widgets
});

const mapDispatchToProps = (dispatch) => ({
  getWidgetBySlug: (slug) => {
    dispatch(getWidgetBySlug(slug));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardsHome);
