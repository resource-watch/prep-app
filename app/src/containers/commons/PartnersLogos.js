import { connect } from 'react-redux';
import { getPartners } from '../../actions/partners';
import PartnersLogos from '../../components/commons/PartnersLogos';

const mapStateToProps = (state) => ({
  data: state.partners.list
});

const mapDispatchToProps = (dispatch) => ({
  getPartners: () => dispatch(getPartners())
});

export default connect(mapStateToProps, mapDispatchToProps)(PartnersLogos);
