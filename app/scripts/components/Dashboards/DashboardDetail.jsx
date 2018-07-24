import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

// Components
import PartnersSlider from '../../containers/PartnersSlider';
import SecondaryNav from '../../components/Navigation/SecondaryNav';
import SocialNav from '../../components/Navigation/SocialNav';
import MainNav from '../../components/Navigation/MainNav';
import Breadcrumbs from '../../components/Navigation/Breadcrumbs';
import Banner from '../../components/Banner';

import SectionIntro from '../SectionIntro';
import DashboardDetailIndicators from './DashboardDetailIndicators';
import DashboardDetailInsights from './DashboardDetailInsights';
import DashboardDetailTools from './DashboardDetailTools';
import RelatedDatasets from '../../containers/Dashboards/RelatedDatasets';
import RelatedDashboards from './RelatedDashboards';
import NavTab from './NavTab';
import LoadingSpinner from '../Loading/LoadingSpinner';

// Constants
import metadata from '../../metadata.json';

const logoImage = '/images/prep-logo.png';

class DashboardDetail extends React.Component {
  static getData(key, value) {
    let data = null;
    for (let i = metadata.length - 1; i >= 0; i--) {
      if (metadata[i][key] === value) {
        data = metadata[i];
        break;
      }
    }
    return data;
  }

  componentWillMount() {
    if (!this.props.data) {
      this.props.getDashboardBySlug(this.props.dashboardSlug);
    }
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.data) {
      newProps.getDashboardBySlug(newProps.dashboardSlug);
    }
  }

  getCurrentData() {
    const pathname = this.props.location.pathname;
    const currentData = DashboardDetail.getData('pathname', (pathname !== '/') ?
      pathname.split('/').slice(1)[0] : pathname);
    return currentData;
  }

  getSpecificContent() {
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
          dashboardSlug={this.props.dashboardSlug}
          data={this.props.data.indicator}
        />);
        break;
    }
    return content;
  }

  getContent() {
    if (!this.props.data) {
      return <LoadingSpinner />;
    }

    // const specificContent = this.getSpecificContent();

    return (
      <div>

        <SectionIntro
          data={this.props.data}
          dashboardSlug={this.props.dashboardSlug}
          currentSection="dashboards"
        >
          <p dangerouslySetInnerHTML={{ __html: this.props.data.content }} />
        </SectionIntro>

        <NavTab
          activeTab={this.props.dashboardTab}
          baseUrl={`/dashboards/${this.props.dashboardSlug}`}
          anchor
        />

        <div className="wrapper tab-container">
          {/* {specificContent} */}
          <article id="data">
            <h2>Data</h2>
            <DashboardDetailInsights
              data={this.props.data.insights}
            />
          </article>

          <article id="stories">
            <h2>Stories</h2>
            <DashboardDetailTools
              data={this.props.data.tools}
            />
          </article>

          <article id="tools">
            <h2>Tools</h2>
            <DashboardDetailIndicators
              dashboardSlug={this.props.dashboardSlug}
              data={this.props.data.indicator}
            />
          </article>
        </div>
      </div>
    );
  }

  render() {
    const currentData = this.getCurrentData();
    const content = this.getContent();
    const title = this.props.data ? this.props.data.title : currentData.title;
    const imageUrl = !this.props.data || this.props.data.image.indexOf('missing.png') >= 0 ?
      null : `${config.assetsUrl}${this.props.data.image}`;

    document.title = title;

    return (
      <div>
        <header className="l-header">
          <div className={`l-header-nav ${currentData.name === 'home' ? '-no-bg' : ''}`}>
            <div className="row align-middle">
              <div className="column small-10 medium-4">
                <Link to="/" className="logo">
                  <img src={logoImage} alt="Partnership for Resilience and Preparedness" />
                </Link>
              </div>
              <div className="column small-2 medium-8">
                <MainNav />
              </div>
            </div>
          </div>
          <div className="l-header-banner">
            <Breadcrumbs pathname={this.props.location.pathname} />
            <Banner
              bg={currentData.bannerBg}
              imageUrl={imageUrl}
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
                <div className="footer-sep-item" />
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
  location: PropTypes.object,
  /**
   * Define the route path (from the router)
   */
  currentPage: PropTypes.string,
  /**
   * Define the slug of the dashboard
   */
  dashboardSlug: PropTypes.string.isRequired,
  /**
   * Define the selected tab of the dashboard
   * Default: "Data"
   */
  dashboardTab: PropTypes.string.isRequired,
  /**
   * Define detail dashboards data
   */
  data: PropTypes.object,
  /**
   * Define the function to get the dashboard detail data
   */
  getDashboardBySlug: PropTypes.func.isRequired
};

export default DashboardDetail;
