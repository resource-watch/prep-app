import { connect } from 'react-redux';
import DashboardsPage from '../../components/pages/DashboardsPage';

import { getDashboardList } from '../../actions/dashboards';

const mapStateToProps = (state, location) => ({
  currentPage: location.route.path,
  data: state.dashboards.list
});
const mapDispatchToProps = (dispatch) => ({
  getDashboardList: () => dispatch(getDashboardList())
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardsPage);
