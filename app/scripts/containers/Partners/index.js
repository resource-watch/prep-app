import { connect } from 'react-redux';
import { getPartners } from '../../actions/partners';
import Partners from '../../components/Partners';

const mapStateToProps = state => ({
  data: state.partners.list,
  partners: state.partners.list.filter(d => d.featured && d.partner_type === 'partner'),
  foundingPartners: state.partners.list.filter(d => d.featured && d.partner_type === 'founding partner')
});

const mapDispatchToProps = dispatch => ({
  getPartners: () => dispatch(getPartners())
});

export default connect(mapStateToProps, mapDispatchToProps)(Partners);
