import { connect } from 'react-redux';
import FAQsPage from '../../components/pages/FAQsPage';

const mapStateToProps = (state, location) => ({
  currentPage: location.route.path
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FAQsPage);
