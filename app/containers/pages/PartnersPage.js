import { connect } from 'react-redux';
import PartnersPage from '../../components/pages/PartnersPage';

const mapStateToProps = (state, location) => ({
  currentPage: location.route.path
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PartnersPage);
