import React from 'react';
import PropTypes from 'prop-types';
import Article from '../Content/Article';
import ResourceItem from './ResourceItem';

import Thumbnail from '../Thumbnails/Thumbnail';

const ipccLogo = '/images/resources/ipcc_logo.png';
const ncaLogo = '/images/resources/nationalClimateAsset_logo.png';
const usToolkitLogo = '/images/resources/ustoolkit_logo.png';
const ukcipLogo = '/images/resources/ukcip_logo.png';
const calAdaptLogo = '/images/resources/caladapt_logo.png';
const cakeLogo = '/images/resources/cake_logo.png';
// const c40Logo = '/images/resources/c40cities_logo.png';
const almLogo = '/images/resources/alm_logo.png';
const copernicusLogo = '/images/resources/copernicus_logo.png';
const climateDataGovLogo = '/images/resources/datagovclimate_logo.png';
const iriLogo = '/images/resources/iri_logo.png';
const servirLogo = '/images/resources/servilglobal_logo.png';
const worldBankLogo = '/images/resources/WorldBankGorup_logo.png';
const weAdaptLogo = '/images/resources/logo-weAdapt-resource.png';
const ccafsLogo = '/images/resources/logo-CCAFS-resource.png';

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
          <p>Find selected resources for understanding the impacts of climate change,
            tools for building resilience to climate change, and additional
            climate relevant data.
          </p>
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
  getResources: PropTypes.func
};

export default Resources;
