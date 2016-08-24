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
import IFrame from '../IFrame';
import LoadingSpinner from '../Loading/LoadingSpinner';

class DashboardDetail extends React.Component {

  componentWillMount() {
    if (!this.props.data) {
      this.props.getInsightBySlug(this.props.insightSlug);
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
    const contentUrl = this.props.data.content_url;
    let iframeUrl = contentUrl.indexOf('github.io') > -1
      ? `/proxy?url=${contentUrl}`
      : contentUrl;

    return (
      <div>
        <SectionIntro
          data={this.props.data}
          insightSlug={this.props.insightSlug}
          insightUrl={this.props.data.content_url}
          currentSection={'insights'}
        >
          <p> {this.props.data.summary} </p>
        </SectionIntro>

        <div className="row">
          <div className="columns small-12">
            <IFrame src={iframeUrl} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const currentData = this.getCurrentData();

    const title = this.props.data ? this.props.data.title : currentData.title;

    document.title = title;

    let content = this.getContent();

    return (
      <div className="-theme-3">
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

DashboardDetail.propTypes = {
  /**
   * Define the route path (from the router)
   */
  currentPage: React.PropTypes.string,
  /**
   * Define the slug of the insight
   */
  insightSlug: React.PropTypes.string.isRequired,
  /**
   * Define the selected tab of the insight
   * Default: "indicators"
   */
  insightTab: React.PropTypes.string.isRequired,
  /**
   * Define detail insights data
   */
  data: React.PropTypes.object,
  /**
   * Define the function to get the insight detail data
   */
  getInsightBySlug: React.PropTypes.func.isRequired
};

export default DashboardDetail;
