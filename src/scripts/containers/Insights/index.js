import { connect } from 'react-redux';
import InsightsPage from '../../components/Insights';

import { getInsightsList } from '../../actions/insights';

const mapStateToProps = (state, location) => ({
  currentPage: location.route.path,
  data: state.insights.list
});
const mapDispatchToProps = (dispatch) => ({
  getInsightsList: () => dispatch(getInsightsList())
});

export default connect(mapStateToProps, mapDispatchToProps)(InsightsPage);
