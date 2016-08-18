import { connect } from 'react-redux';
import InsightDetailPage from '../../components/Insights/InsightDetail';

import { getInsightBySlug } from '../../actions/insights';

const mapStateToProps = (state, { params, route }) => ({
  currentPage: route.path,
  insightSlug: params.slug,
  insightTab: params.tab || 'indicators',
  data: state.insights.detail[params.slug] || null
});

const mapDispatchToProps = (dispatch) => ({
  getInsightBySlug: (slug) => dispatch(getInsightBySlug(slug))
});

export default connect(mapStateToProps, mapDispatchToProps)(InsightDetailPage);
