import { connect } from 'react-redux';
import DashboardsPage from '../../components/pages/DashboardDetailPage';

import { getDashboardBySlug } from '../../actions/dashboards';
import { setModalUnderDevelop } from '../../actions/modal';

const mapStateToProps = (state, { params, route }) => ({
  currentPage: route.path,
  dashboardSlug: params.slug,
  dashboardTab: params.tab || 'indicators',
  data: state.dashboards.detail[params.slug] || null,
  modalOpen: state.modal.open
});

const mapDispatchToProps = (dispatch) => ({
  getDashboardBySlug: (slug) => dispatch(getDashboardBySlug(slug)),
  setModalUnderDevelop: (status) =>
    dispatch(setModalUnderDevelop(status))
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardsPage);
