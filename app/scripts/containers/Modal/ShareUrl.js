import { connect } from 'react-redux';
import ShareUrl from '../../components/Modal/ShareUrl';

import { getShortLink } from '../../actions/links';

const mapStateToProps = (state) => ({
  links: state.links
});

const mapDispatchToProps = (dispatch) => ({
  getShortLink: (longUrl) => dispatch(getShortLink(longUrl))
});

export default connect(mapStateToProps, mapDispatchToProps)(ShareUrl);
