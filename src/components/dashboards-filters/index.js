import { connect } from 'react-redux';

// Components
import DashboardFilters from './dashboards-filters-component';

// Data
import TOPICS from 'pages/explore/explore-dataset-filters/data/topics.json';
import GEOGRAPHIES from 'pages/explore/explore-dataset-filters/data/geographies.json';

// Actions
import { setTopicsFilter, setGeographiesFilter } from 'actions/dashboards';

const mapStateToProps = () => ({
  topics: TOPICS,
  geographies: GEOGRAPHIES
});

const mapDispatchToProps = dispatch => ({
  onChangeTopics: selected => dispatch(setTopicsFilter(selected)),
  onChangeGeographies: selected => dispatch(setGeographiesFilter(selected))
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardFilters);
