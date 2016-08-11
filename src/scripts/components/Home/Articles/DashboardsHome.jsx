import React from 'react';
import { Link } from 'react-router';

const InsightsHome = () => {
  return (
    <div>
      <div className="row">
        <div className="column small-12 medium-8">
          <h2 className="-left">Assembling the information you need</h2>
          <Link to="/dashboards">Go to dashboards</Link>
          <p>Dashboards are a collection of data, insight and tools that users compile to support their climate resilience and preparedness planning. View some of the dashboards that others have create, or create your own to track to key issues in your area.</p>
        </div>
      </div>
    </div>
  );
}

export default InsightsHome;
