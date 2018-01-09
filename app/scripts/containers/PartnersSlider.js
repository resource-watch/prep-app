import { connect } from 'react-redux';
import { getPartners } from 'modules/partners/partners-actions';
import PartnersSlider from 'components/Slider/PartnersSlider';

const mapStateToProps = state => ({
  data: state.partners.list,
  featured: state.partners.list.filter(d => d.featured)
});

const mapDispatchToProps = dispatch => ({
  getPartners: () => dispatch(getPartners())
});

export default connect(mapStateToProps, mapDispatchToProps)(PartnersSlider);
