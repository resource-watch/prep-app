import { connect } from 'react-redux';
import InsightsPage from '../../components/Insights';

import { getInsightsList } from '../../actions/insights';
import { getInsights } from '../../selectors/insights';

const mapStateToProps = (state, location) => ({
  currentPage: location.route.path,
  data: getInsights(state),
});

const mapDispatchToProps = dispatch => ({ getInsightsList: () => dispatch(getInsightsList()) });

export default connect(mapStateToProps, mapDispatchToProps)(InsightsPage);
