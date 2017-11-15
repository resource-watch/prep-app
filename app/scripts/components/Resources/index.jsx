import React from 'react';
import PropTypes from 'prop-types';
import Article from '../Content/Article';
import ResourceItem from './ResourceItem';

import Thumbnail from '../Thumbnails/Thumbnail';

import ipccLogo from '../../../images/resources/ipcc_logo.png';
import ncaLogo from '../../../images/resources/nationalClimateAsset_logo.png';
import usToolkitLogo from '../../../images/resources/ustoolkit_logo.png';
import ukcipLogo from '../../../images/resources/ukcip_logo.png';
import calAdaptLogo from '../../../images/resources/caladapt_logo.png';
import cakeLogo from '../../../images/resources/cake_logo.png';
// import c40Logo from '../../../images/resources/c40cities_logo.png';
import almLogo from '../../../images/resources/alm_logo.png';
import copernicusLogo from '../../../images/resources/copernicus_logo.png';
import climateDataGovLogo from '../../../images/resources/datagovclimate_logo.png';
import iriLogo from '../../../images/resources/iri_logo.png';
import servirLogo from '../../../images/resources/servilglobal_logo.png';
import worldBankLogo from '../../../images/resources/WorldBankGorup_logo.png';
import weAdaptLogo from '../../../images/resources/logo-weAdapt-resource.png';
import ccafsLogo from '../../../images/resources/logo-CCAFS-resource.png';

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
