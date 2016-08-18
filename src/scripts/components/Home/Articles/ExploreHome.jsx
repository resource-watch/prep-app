import React from 'react';
import { Link } from 'react-router';
import temperaturesLayer from '../../../../images/home/temperatures-layer.jpg';

const InsightsHome = () => {
  return (
    <div>
      <div className="row">
        <div className="column small-12 medium-8">
          <h2 className="-left">Explore the data</h2>
          <Link to="/insights">Go to explore</Link>
        </div>
      </div>
      <div className="row">
        <div className="column small-12 medium-8">
          <p>Interact with national, regional, and local data on this web map. Filter by topic, projection models, and an area of impact to create a custom map within seconds.  When you’re ready, publish or share your findings to raise awareness in your community.</p>
        </div>
        <div className="column small-12 medium-4">
          <button className="c-button -border">Request data</button>
        </div>
      </div>
      <p><img src={temperaturesLayer} /></p>
    </div>
  );
}

export default InsightsHome;
