import React from 'react';
import { Link } from 'react-router';

import exploreBg from '../../../images/bg/bg-explore.jpg';
import insightsBg from '../../../images/bg/bg-insights.jpg';
import dashboardsBg from '../../../images/bg/bg-dashboards.jpg';

const bg = {
  explore: exploreBg,
  insights: insightsBg,
  dashboards: dashboardsBg
};

const cards = {
  insights: (
    <div
      className="simple-card -inverse"
      style={{ backgroundImage: `url(${bg.insights})` }}
    >
      <h3>Insights</h3>
      <p>Find data-driven stories and tools that spotlight specific climate-related risks and solutions</p>
      <Link to="/insights">EXPLORE THE INSIGHTS</Link>
    </div>),
  dashboards: (
    <div
      className="simple-card -inverse"
      style={{ backgroundImage: `url(${bg.dashboards})` }}
    >
      <h3>Dashboards</h3>
      <p>Find collections of climate risk data, insights, and tools contributed by partner communities</p>
      <Link to="/dashboards">EXPLORE THE DASHBOARDS</Link>
    </div>)
};


class SummaryCards extends React.Component {

  render() {
    return (
      <div className="c-summary-cards">
        <div className="simple-card -inverse" style={{ backgroundImage: `url(${bg.explore})` }}>
          <h3>Data on the map</h3>
          <p>Find datasets from local, national and other sources</p>
          <Link to="/explore">EXPLORE THE MAP</Link>
        </div>

        {cards[this.props.extraCard]}
      </div>
    );
  }
}

SummaryCards.propTypes = {
  /**
   * Define the extra card apart from the explore one
   */
  extraCard: React.PropTypes.string.isRequired
};

export default SummaryCards;
