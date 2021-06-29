import { connect } from 'react-redux';
import DashboardsPage from '../../components/Dashboards';

import { getDashboardList } from '../../actions/dashboards';

// Selectors
import { getDashboards } from 'selectors/dashboards';

const mapStateToProps = state => ({
  loaded: state.dashboards.listLoaded,
  data: getDashboards(state)
});

const mapDispatchToProps = dispatch => ({
  getDashboardList: () => dispatch(getDashboardList())
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardsPage);
