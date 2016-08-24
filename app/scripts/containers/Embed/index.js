import { connect } from 'react-redux';
import EmbedDetail from '../../components/Embed';

import { getWidgetBySlug } from '../../actions/embed';

const mapStateToProps = (state, { params, route }) => ({
    slug: params.slug,
    data: state.embed[params.slug]
});

const mapDispatchToProps = (dispatch) => ({
    getWidgetBySlug: (slug) => { dispatch(getWidgetBySlug(slug)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(EmbedDetail);
