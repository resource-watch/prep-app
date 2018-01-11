import React from 'react';
import PropTypes from 'prop-types';
import Article from 'components/Content/Article';

import LoadingSpinner from 'components/Loading/LoadingSpinner';
import ResourceItem from './resource-item-component';

// constants
import { RESOURCES_CATEGORIES } from './resources-page-constants';

class Resources extends React.PureComponent {
  componentDidMount() {
    if (!this.props.resources.length) this.props.getResources();
  }

  render() {
    const { resources, resourcesLoading } = this.props;

    return (
      <div className="c-resources">
        <div className="sliced" />
        {resourcesLoading && <LoadingSpinner />}
        <Article no-border>
          <h2>Resources and tools to understand the impacts of climate change</h2>
          <p>This is a selection of resources to understand the impacts of climate change, learn how to build resilience,
            and locate additional climate relevant data. We welcome receiving suggestions for additional resources to include.</p>
        </Article>

        {RESOURCES_CATEGORIES.map(resourceCategory => (
          !!(resources[resourceCategory.value] || []).length &&
            <Article grid="small-12" key={resourceCategory.value}>
              <h2>{resourceCategory.label}</h2>

              <div className="row align-stretch">
                {(resources[resourceCategory.value] || []).map(resource => <ResourceItem key={resource.id} data={resource} />) }
              </div>
            </Article>
        ))}
      </div>
    );
  }
}

Resources.defaultProps = {
  resources: {}
};

Resources.propTypes = {
  resources: PropTypes.object,
  resourcesLoading: PropTypes.bool,
  getResources: PropTypes.func
};

export default Resources;
