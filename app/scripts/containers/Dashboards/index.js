import { connect } from 'react-redux';
import DashboardsPage from '../../components/Dashboards';

import { getDashboardList } from '../../actions/dashboards';

const mapStateToProps = (state) => ({
  data: state.dashboards.list
});
const mapDispatchToProps = (dispatch) => ({
  getDashboardList: () => dispatch(getDashboardList())
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardsPage);
