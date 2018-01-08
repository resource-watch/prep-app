import React from 'react';
import PropTypes from 'prop-types';
import Article from '../Content/Article';
import ResourceItem from './ResourceItem';

class Resources extends React.PureComponent {
  componentDidMount() {
    this.props.getResources();
  }

  render() {
    const { resources } = this.props;

    return (
      <div className="c-partners">
        <div className="sliced" />

        <Article no-border>
          <h2>Resources and tools to understand the impacts of climate change
          </h2>
          <p>This is a selection of resources to understand the impacts of climate change, learn how to build resilience,
            and locate additional climate relevant data. We welcome receiving suggestions for additional resources to include.</p>
        </Article>

        {Object.keys(resources).map(resourceType => (
          <Article grid="small-12" key={resourceType}>
          <h2>{resourceType}</h2>

          <div className="row align-stretch">
            { (resources[resourceType] || []).map(resource => <ResourceItem key={`resource-${resource.id}`} data={resource} />) }
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
  getResources: PropTypes.func
};

export default Resources;
