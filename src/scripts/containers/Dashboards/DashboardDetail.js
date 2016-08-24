import { connect } from 'react-redux';
import DashboardsPage from '../../components/Dashboards/DashboardDetail';

import { getDashboardBySlug } from '../../actions/dashboards';
import { setModalUnderDevelop } from '../../actions/modal';

const mapStateToProps = (state, { params }) => ({
  dashboardSlug: params.slug,
  dashboardTab: params.tab || 'indicators',
  data: state.dashboards.detail[params.slug],
  modalOpen: state.modal.underDevelop
});

const mapDispatchToProps = (dispatch) => ({
  getDashboardBySlug: (slug) => dispatch(getDashboardBySlug(slug)),
  setModalUnderDevelop: (status) =>
    dispatch(setModalUnderDevelop(status))
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardsPage);
