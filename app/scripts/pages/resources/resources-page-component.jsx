import React from 'react';
import PropTypes from 'prop-types';
import Article from 'components/Content/Article';

import LoadingSpinner from 'components/Loading/LoadingSpinner';
import ResourceItem from './resource-item-component';
import HowToNav from 'components/how-to-nav';
import Thumbnail from 'components/Thumbnails/Thumbnail';

// constants
import { RESOURCES_CATEGORIES } from './resources-page-constants';

const RESOURCES_SECTIONS = [
  {
    name: 'Connectivity Hub',
    slug: 'connectivity-hub',
  },
  {
    name: 'Understanding Climate Change Impacts',
    slug: 'understanding-climate-change-impacts',
  },
  {
    name: 'Climate Assessment & Preparedness Tools',
    slug: 'climate-assessment-and-preparedness-tools',
  },
  {
    name: 'Climate Data Portals',
    slug: 'climate-data-portals',
  }, {
    name: 'Multi-resource Platforms',
    slug: 'multi-resource-platforms',
  }
];

const CONNECTIVITY_HUB_DATA = {
  name: 'Connectivity Hub',
  logo: 'http://connectivity-hub.placard-network.eu/images/logo.png',
  url: 'http://connectivity-hub.placard-network.eu',
};

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

        <HowToNav anchor list={RESOURCES_SECTIONS} />

        <Article no-border>
          <h2 id={RESOURCES_SECTIONS[0].slug}>Connectivity Hub</h2>

          <Thumbnail
            url={CONNECTIVITY_HUB_DATA.url}
            src={CONNECTIVITY_HUB_DATA.logo}
            alt={CONNECTIVITY_HUB_DATA.name}
            border="neutral"
            analytics={{
              category: 'Resources',
              action: 'Clicks on an external tool'
            }}
          />
          <p style={{ marginTop: '1rem' }}>Developing sustainable, location-based solutions for climate change preparedness requires a wide variety of expertise, requiring better sharing of information and collaboration across groups that do not necessarily use the same terminology or live in the same geographic region. The Stockholm Environment Institute, a PREPdata partner, has developed the <a href={CONNECTIVITY_HUB_DATA.url} target="_blank" rel="noreferrer">{CONNECTIVITY_HUB_DATA.name}</a> to meet this need.</p>
          <p>The Hub is a <a href="https://www.sei.org/featured/the-connectivity-hub-expands/">‘search and discovery’</a> supporting communities, practitioners, students, researchers, and policymakers to share and find climate-resilient adaptation strategies to find relevant information. New and unexpected combinations of information can produce powerful policy-relevant insights, collaboration, dialogue and learning.  Simply type in your keyword of interest and view the results.</p>
          <p><a href={CONNECTIVITY_HUB_DATA.url} target="_blank" rel="noreferrer" style={{ textTransform: 'uppercase' }}>{CONNECTIVITY_HUB_DATA.url}</a></p>
        </Article>

        {RESOURCES_CATEGORIES.map((resourceCategory, index) => (
          !!(resources[resourceCategory.value] || []).length &&
            <Article grid="small-12" key={resourceCategory.value}>
              <h2 id={RESOURCES_SECTIONS[index + 1].slug}>{resourceCategory.label}</h2>

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
