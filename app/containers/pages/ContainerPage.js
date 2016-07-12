import { connect } from 'react-redux';
import ContainerPage from '../../components/pages/ContainerPage';

const mapStateToProps = (state, location) => ({
  path: location.location.pathname
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ContainerPage);
