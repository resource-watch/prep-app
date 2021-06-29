import { connect } from 'react-redux';
import ResourcesPageComponent from './resources-page-component';
import { getFilteredResources } from './resources-page-selectors';
import resourcesPageActions from './resources-page-actions';

import initialState from './resources-page-initial-state';
import * as reducers from './resources-page-reducers';

export { initialState, resourcesPageActions, reducers };

const mapStateToProps = state => ({
  resources: getFilteredResources(state),
  resourcesLoading: state.resourcePage.loading,
  resourcesError: state.resourcePage.error
});

export default connect(mapStateToProps, resourcesPageActions)(ResourcesPageComponent);
