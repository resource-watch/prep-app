import React from 'react';
import Header from '../commons/Header';
import SectionIntro from '../commons/SectionIntro';
import DashboardDetailTools from '../dashboards/DashboardDetailTools';
import DashboardDetailInsights from '../dashboards/DashboardDetailInsights';
import DashboardDetailIndicators from '../dashboards/DashboardDetailIndicators';
import Title from '../commons/Title';
import Card from '../cards/Card';
import NavTab from '../commons/NavTab';
import RelatedDatasets from '../commons/RelatedDatasets';
import LoadingSpinner from '../commons/LoadingSpinner';

class DashboardDetailPage extends React.Component {

  componentDidMount() {
    if (!this.props.data) {
      this.props.getDashboardBySlug(this.props.dashboardSlug);
    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.dashboardSlug !== nextProps.dashboardSlug) {
      this.props.getDashboardBySlug(nextProps.dashboardSlug);
    }

    if (this.props.data !== nextProps.data ||
      this.props.dashboardTab !== nextProps.dashboardTab) {
      return true;
    }

    return false;
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
        <div className="wrapper">
          <SectionIntro
            data={this.props.data}
            dashboardSlug={this.props.dashboardSlug}
            currentPage={this.props.currentPage}
          />
        </div>

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
    let content = this.getContent();
    let title;
    if (this.props.data && this.props.data.title) {
      title = (
        <Title inverse center border type="page">
          {this.props.data.title}
        </Title>
      );
    }
    return (
      <div className="l-dashboards">
        <Header image={this.props.data && this.props.data.image}>
          {title}
        </Header>

        {content}

        <RelatedDatasets />

        <div className="other-dashboards">
          <div className="wrapper">
            <Title inverse border>Other dashboards</Title>
            <div className="other-cards">
              <Card inverse border>
                <Title type="content" inverse>
                  Framer assesses possible impacts of climate change on his
                  crops (grapes)
                </Title>
                <p className="content">
                  Farmer X would need to understand how to best prepare for any
                  future changes in climate that may impact his grapes. Based on
                  key thresholds for climate variables of interest (temperature
                  and precipitation), Farmer X evaluate the suitability to grow
                  different types of grapes...
                </p>
                <a href="#">
                  <img
                    src={gon.assets.lightUniversityWashingtonLogo}
                    width="219"
                    className="logo"
                    alt="University of Washington"
                  />
                </a>
              </Card>
              <Card inverse border>
                <Title type="content" inverse>
                  City Planner assesses possible impacts of Climate Change on
                  Puget Sound's built environment
                </Title>
                <p className="content">
                  Most climate change effects are likely to increase the
                  potential for damage to infrastructure and service disruptions
                  (unplanned transportation closures, delays, or detours) in the
                  Puget Sound region, although some risks may decrease.
                </p>
                <a href="#">
                  <img
                    src={gon.assets.lightNasaLogo}
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
    );
  }
}

DashboardDetailPage.propTypes = {
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
   * Default: "indicators"
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

export default DashboardDetailPage;
