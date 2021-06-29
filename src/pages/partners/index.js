import { connect } from 'react-redux';
import PartnersPageComponent from './partners-page-component';
import { getFilteredPartners } from './partners-page-selectors';

const mapStateToProps = state => ({
  partners: getFilteredPartners(state),
  partnersLoading: state.partners.loading
});

export default connect(mapStateToProps, {})(PartnersPageComponent);
