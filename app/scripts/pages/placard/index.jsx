import React from 'react';
import { Link } from 'react-router';
import MainNav from 'layout/navigation/MainNav';

const PlacardPage = () => (
  <div className="l-explore">
    <header className="l-header -expanded">
      <div className="l-header-nav -short">
        <div className="row align-middle">
          <div className="column small-10 medium-4">
            <Link to="/" className="logo">
              <img src="/images/prep-logo.png" alt="Partnership for Resilience and Preparedness" />
            </Link>
          </div>
          <div className="column small-2 medium-8">
            <MainNav />
          </div>
        </div>
      </div>
    </header>
    <div className="content">
      <iframe
        height="100%"
        width="100%"
        title="Placard Connectivity Hub"
        src="http://connectivity-hub.placard-network.eu/?resource=http%3A%2F%2Fplacard.wiredcanvas.uk%2Fapi%2Ftaxonomy_term%2F849.jsonld&teaser_resource=false"
      />
    </div>
  </div>
);

export default PlacardPage;
