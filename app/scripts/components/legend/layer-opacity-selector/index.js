import { connect } from 'react-redux';
import exploreActions from 'pages/explore/explore-actions';
import LayerOpacitySelectorComponent from './layer-opacity-selector-component';
// import { getFilteredResources } from './resources-page-selectors';

// import initialState from './resources-page-initial-state';
// import * as reducers from './resources-page-reducers';

// export { initialState, resourcesPageActions, reducers };

const mapStateToProps = state => ({
  opacity: state.resourcePage.loading
});

export default connect(mapStateToProps, exploreActions)(LayerOpacitySelectorComponent);
