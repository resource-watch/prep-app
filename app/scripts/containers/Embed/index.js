import { connect } from 'react-redux';
import EmbedDetail from '../../components/Embed';

import { getWidgetBySlug } from '../../actions/widgets';

const mapStateToProps = (state, { params }) => ({
  slug: params.slug,
  data: state.embed[params.slug]
});

const mapDispatchToProps = (dispatch) => ({
  getWidgetBySlug: (slug) => { dispatch(getWidgetBySlug(slug)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(EmbedDetail);
