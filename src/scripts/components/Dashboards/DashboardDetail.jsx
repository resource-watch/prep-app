import React from 'react';
import { Link } from 'react-router';

import metadata from 'json!../../metadata.json';
import PartnersSlider from '../../containers/PartnersSlider';
import SecondaryNav from '../../components/Navigation/SecondaryNav';
import SocialNav from '../../components/Navigation/SocialNav';
import MainNav from '../../components/Navigation/MainNav';
import Banner from '../../components/Banner';
import logoImage from '../../../images/prep-logo.png';

import DashboardDetailIndicators from './DashboardDetailIndicators';
import DashboardDetailInsights from './DashboardDetailInsights';
import DashboardDetailTools from './DashboardDetailTools';
import NavTab from './NavTab';
import Card from '../Cards/Card';
import LoadingSpinner from '../Loading/LoadingSpinner';
import lightUWLogo from '../../../images/partners/university-washington-light@2x.png';
import lightNasaLogo from '../../../images/partners/nasa-light@2x.png';

class DashboardDetail extends React.Component {

  componentWillMount() {
    console.log(this.props.data);
    if (!this.props.data) {
      this.props.getDashboardBySlug(this.props.dashboardSlug);
    }
  }

  getData(key, value) {
    let data = null;
    for (let i = metadata.length - 1; i >= 0; i--) {
      if (metadata[i][key] === value) {
        data = metadata[i];
        break;
      }
    }
    return data;
  }

  getCurrentData() {
    const pathname = this.props.location.pathname;
    const currentData = this.getData('pathname', (pathname !== '/') ?
      pathname.split('/').slice(1)[0] : pathname);
    return currentData;
  }

  getContent() {
    if (!this.props.data) {
      return <LoadingSpinner />;
    }

    let content;

    switch (this.props.dashboardTab) {
      case 'insights':
        content = (<DashboardDetailInsights
          data={this.props.data.insights}
        />);
        break;

      case 'tools':
        content = (<DashboardDetailTools
          data={this.props.data.tools}
        />);
        break;

      default:
        content = (<DashboardDetailIndicators
          data={this.props.data.indicator}
        />);
        break;
    }

    return (
      <div>

        <NavTab
          activeTab={this.props.dashboardTab}
          baseUrl={`/dashboards/${this.props.dashboardSlug}`}
        />

        <div className="wrapper tab-container">
          {content}
        </div>
      </div>
    );
  }

  render() {
    const currentData = this.getCurrentData();

    document.title = currentData.title;

    let content = this.getContent();

    return (
      <div>
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
              <h1>{currentData.title}</h1>
            </Banner>
          </div>
        </header>

        <div className="l-main">

          {content}

          <div className="other-dashboards">
            <div className="wrapper">
              <h3>Other dashboards</h3>
              <div className="other-cards">
                <Card inverse border>
                  <h3>
                    Framer assesses possible impacts of climate change on his
                    crops (grapes)
                  </h3>
                  <p className="content">
                    Farmer X would need to understand how to best prepare for any
                    future changes in climate that may impact his grapes. Based on
                    key thresholds for climate variables of interest (temperature
                    and precipitation), Farmer X evaluate the suitability to grow
                    different types of grapes...
                  </p>
                  <a href="#">
                    <img
                      src={lightUWLogo}
                      width="219"
                      className="logo"
                      alt="University of Washington"
                    />
                  </a>
                </Card>
                <Card inverse border>
                  <h3>
                    City Planner assesses possible impacts of Climate Change on
                    Puget Sound's built environment
                  </h3>
                  <p className="content">
                    Most climate change effects are likely to increase the
                    potential for damage to infrastructure and service disruptions
                    (unplanned transportation closures, delays, or detours) in the
                    Puget Sound region, although some risks may decrease.
                  </p>
                  <a href="#">
                    <img
                      src={lightNasaLogo}
                      width="73"
                      className="logo"
                      alt="NASA"
                    />
                  </a>
                </Card>
              </div>
            </div>
          </div>

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

DashboardDetail.propTypes = {
  /**
   * Define the route path (from the router)
   */
  currentPage: React.PropTypes.string,
  /**
   * Define the slug of the dashboard
   */
  dashboardSlug: React.PropTypes.string.isRequired,
  /**
   * Define the selected tab of the dashboard
   * Default: "Data"
   */
  dashboardTab: React.PropTypes.string.isRequired,
  /**
   * Define detail dashboards data
   */
  data: React.PropTypes.object,
  /**
   * Define the function to get the dashboard detail data
   */
  getDashboardBySlug: React.PropTypes.func.isRequired
};

export default DashboardDetail;
