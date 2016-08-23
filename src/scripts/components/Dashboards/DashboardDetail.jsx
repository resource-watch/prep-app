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
import DashboardDetailIndicators from './DashboardDetailIndicators';
import DashboardDetailInsights from './DashboardDetailInsights';
import DashboardDetailTools from './DashboardDetailTools';
import RelatedDatasets from '../../containers/Dashboards/RelatedDatasets';
import RelatedDashboards from './RelatedDashboards';
import NavTab from './NavTab';
import LoadingSpinner from '../Loading/LoadingSpinner';

class DashboardDetail extends React.Component {

  componentWillMount() {
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

        <SectionIntro
          data={this.props.data}
          dashboardSlug={this.props.dashboardSlug}
          currentSection="dashboards"
        >
          <p> {this.props.data.summary} </p>
        </SectionIntro>

        <NavTab
          activeTab={this.props.dashboardTab}
          baseUrl={`/dashboard/${this.props.dashboardSlug}`}
        />

        <div className="wrapper tab-container">
          {content}
        </div>
      </div>
    );
  }

  render() {
    const currentData = this.getCurrentData();
    const content = this.getContent();
    const title = this.props.data ? this.props.data.title : currentData.title;

    document.title = title;

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
              <h1>{title}</h1>
            </Banner>
          </div>
        </header>

        <div className="l-main">
          {content}
        </div>

        {this.props.data && this.props.data.related_datasets &&
          <RelatedDatasets slugs={this.props.data.related_datasets} />
        }

        {this.props.data && this.props.data.dashboards &&
          <RelatedDashboards data={this.props.data.dashboards} />
        }

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
