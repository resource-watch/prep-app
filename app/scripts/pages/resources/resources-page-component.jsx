import React from 'react';
import PropTypes from 'prop-types';
import Article from 'components/Content/Article';
import { Link } from 'react-router';

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
          <p>This is a selection of resources to understand the impacts of climate change, learn how to build resilience,
            and locate additional climate relevant data. We welcome receiving suggestions for additional resources to include.
          </p>
        </Article>

        <Article no-border>
          <h2>Connectivity Hub</h2>
          <p>PREPdata provides a centralized location to merge tools, processes, climate information, and communities together for tailored and informed decision-making around the climate future. Developing sustainable, location-based solutions for climate change preparedness requires a wide variety of expertise, requiring better sharing of information and collaboration across groups that do not necessarily use the same terminology or live in the same geographic region. The Stockholm Environment Institute, a PREPdata partner, has developed the <Link to="placard-connectivity-hub">Connectivity Hub</Link>.</p>
          <p>The Hub is a <a href="https://www.sei.org/featured/the-connectivity-hub-expands/">‘search and discovery’</a> tool that supports communities, practitioners, students, researchers and policymakers to share and find climate-resilient adaptation strategies that inform policy processes. This helps users quickly and easily find information that they may not know exists, break down silos, and avoid wasted resources when people are not aware of parallel or complementary ongoing work. New and unexpected combinations of information can produce powerful policy-relevant insights, collaboration, dialogue and learning.  Simply type in your keyword of interest and view the results.</p>
          {/* Placard Connectivity Hub */}
          <div className="row align-center">
            <div className="column small-12">
              <div className="c-card -border -border-neutral">
                <div className="how-to-card">
                  <p>
                    Visit <Link to="connectivity-hub">Connectivity Hub</Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>
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

Resources.defaultProps = { resources: {} };

Resources.propTypes = {
  resources: PropTypes.object,
  resourcesLoading: PropTypes.bool,
  getResources: PropTypes.func
};

export default Resources;
