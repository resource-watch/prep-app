import { connect } from 'react-redux';
import ContactPage from '../../components/pages/ContactPage';

const mapStateToProps = (state, location) => ({
  currentPage: location.route.path
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);
