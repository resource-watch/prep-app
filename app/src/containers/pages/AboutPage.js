import { connect } from 'react-redux';
import AboutPage from '../../components/pages/AboutPage';

const mapStateToProps = (state, location) => ({
  currentPage: location.route.path
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);
