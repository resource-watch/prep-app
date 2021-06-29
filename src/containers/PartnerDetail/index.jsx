import { connect } from 'react-redux';
import PartnerDetail from '../../components/PartnerDetail';

const mapStateToProps = ({ partners }) => ({ partners: partners.list });

export default connect(mapStateToProps, null)(PartnerDetail);
