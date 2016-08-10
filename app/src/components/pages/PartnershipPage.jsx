import React from 'react';
import Header from '../commons/Header';
import Title from '../commons/Title';

function PartnershipPage() {
  return (
    <div className="l-partnership">
      <Header type="small">
        <Title inverse center border type="page">
          Partnership for Resilience and Preparedness
        </Title>
      </Header>

      <div className="wrapper">

        <div className="text-content">
          <p>
            The Partnership for Resilience and Preparedness (PREP) is a public-private collaboration to empower a data-driven approach to building climate resilience. The Partnership aims to help planners, investors, and resource managers around the globe to more easily incorporate climate risks into their decisions by enhancing access to relevant data and insights on climate variability and change, and facilitating peer-to-peer learning. PREP will do this through: 
          </p>
          <h3>Community Engagement</h3>
          <h3>Data Accessibility</h3>
          <h3>Platform Development</h3>
        </div>

      </div>

    </div>
  );
}

PartnershipPage.propTypes = {
  /**
   * Define the route path (from the router)
   */
  currentPage: React.PropTypes.string
};

export default PartnershipPage;
