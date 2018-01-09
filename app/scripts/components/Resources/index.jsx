import React from 'react';
import PropTypes from 'prop-types';
import Article from '../Content/Article';
import ResourceItem from './ResourceItem';

class Resources extends React.PureComponent {
  componentDidMount() {
    this.props.getResources();
  }

  render() {
    const firstList = this.props.list;
    const secondList = this.props.secondList;
    const thirdList = this.props.thirdList;

    return (
      <div className="c-partners">
        <div className="sliced" />

        <Article no-border>
          <h2>Resources and tools to understand the impacts of climate change
          </h2>
          <p>This is a selection of resources to understand the impacts of climate change, learn how to build resilience,
            and locate additional climate relevant data. We welcome receiving suggestions for additional resources to include.</p>
        </Article>

        <Article grid="small-12">
          <h2>Understanding impacts of climate change</h2>

          <div className="row align-stretch">
            { firstList && firstList.map(resource => <ResourceItem key={`resource-${resource.id}`} data={resource} />) }
          </div>
        </Article>

        <Article grid="small-12">
          <h2>Climate resilience tools and services</h2>

          <div className="row align-stretch">
            { secondList && secondList.map(resource => <ResourceItem key={`resource-${resource.id}`} data={resource} />) }
          </div>
        </Article>

        <Article grid="small-12">
          <h2>Climate data portals</h2>

          <div className="row align-stretch">
            { thirdList && thirdList.map(resource => <ResourceItem key={`resource-${resource.id}`} data={resource} />) }
          </div>

        </Article>
      </div>
    );
  }
}

Resources.propTypes = {
  list: PropTypes.array,
  secondList: PropTypes.array,
  thirdList: PropTypes.array,
  getResources: PropTypes.func
};

export default Resources;
