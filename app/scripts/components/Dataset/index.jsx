import React from 'react';
import { Link } from 'react-router';

import metadata from 'json!../../metadata.json';
import PartnersSlider from '../../containers/PartnersSlider';
import SecondaryNav from '../../components/Navigation/SecondaryNav';
import SocialNav from '../../components/Navigation/SocialNav';
import MainNav from '../../components/Navigation/MainNav';
import Banner from '../../components/Banner';
import logoImage from '../../../images/prep-logo.png';

import SectionIntro from '../SectionIntro';
import MetadataList from '../Explore/MetadataList';
import VegaChart from '../Chart/VegaChart';
import LoadingSpinner from '../Loading/LoadingSpinner';

class DatasetDetail extends React.Component {

  componentWillMount() {
    if (!this.props.data) {
      this.props.getDatasetData(this.props.datasetSlug);
    }
  }

  getData(key, value) {
    let data = null;
    for (let i = metadata.length - 1; i >= 0; i--) {
      if (value.indexOf(metadata[i][key]) > -1) {
        data = metadata[i];
        break;
      }
    }
    return data;
  }

  getCurrentData() {
    const pathname = this.props.location.pathname;
    const currentData = this.getData('pathname', pathname);
    return currentData;
  }

  getContent() {
    if (!this.props.data) {
      return <LoadingSpinner />;
    }

    const data = this.props.data.attributes.info;
    const widget = this.props.widget ? this.props.widget.attributes : {};

    return (<div>
      <SectionIntro data={{}} currentSection={'explore'} >
        <MetadataList data={data} />
      </SectionIntro>

      {widget && widget.widgetConfig &&
        <div className="row">
          <div className="columns small-12">
            <VegaChart data={widget.widgetConfig} />
          </div>
        </div>
      }
    </div>);
  }

  render() {
    const currentData = this.getCurrentData();

    const data = this.props.data && this.props.data.attributes.info.attributes || null;
    const title = data ? data.title : currentData.title;

    document.title = title;

    let content = this.getContent();

    return (
      <div className="-theme-2">
        <header className="l-header">
          <div className={`l-header-nav ${currentData.name === 'home' ? '-no-bg' : ''}`}>
            <div className="row align-middle">
              <div className="column small-10 medium-4">
                <Link to={'/'} className="logo">
                  <img src={logoImage} alt="Partnership for Resilience and Preparedness" />
                </Link>
              </div>
              <div className="column small-2 medium-8">
                <MainNav />
              </div>
            </div>
          </div>
          <div className="l-header-banner">
            <Banner
              bg={currentData.bannerBg}
              size={currentData.bannerSize}
            >
              <h1>{title}</h1>
            </Banner>
          </div>
        </header>

        <div className="l-main">

          {content}

        </div>

        <footer className="l-footer">
          <div className="l-footer-top -inverse">
            <div className="row">
              <div className="column small-12">
                <PartnersSlider />
              </div>
            </div>
          </div>
          <div className="l-footer-sep">
            <div className="row">
              <div className="column small-12">
                <div className="footer-sep-item"></div>
              </div>
            </div>
          </div>
          <div className="l-footer-down">
            <div className="row">
              <div className="column small-6 align-middle">
                <SocialNav />
              </div>
              <div className="column small-6 align-middle">
                <SecondaryNav />
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

DatasetDetail.propTypes = {
  /**
   * Define the route path (from the router)
   */
  currentPage: React.PropTypes.string,
  /**
   * Define the slug of the dataset
   */
  datasetSlug: React.PropTypes.string.isRequired,
  /**
   * Define the function to get the datataset detail data
   */
  getDatasetData: React.PropTypes.func.isRequired,
  /**
   * Define the dataset data
   */
  data: React.PropTypes.any,
  /**
   * Define the dataset widget
   */
  widget: React.PropTypes.any
};

export default DatasetDetail;
