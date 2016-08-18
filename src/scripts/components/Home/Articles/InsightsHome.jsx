import React from 'react';
import { Link } from 'react-router';
import ClimateChange from '../../ClimateChange';
import portoAlegre from '../../../../images/home/porto-alegre.jpg';

const InsightsHome = () => {
  return (
    <div>
      <div className="row">
        <div className="column small-12 medium-8">
          <h2 className="-left">Understanding the problem</h2>
          <Link to="/insights">Go to insights</Link>
          <p>Our changing climate is accelerating the intensity and frequency of shocks and stresses facing communities across the globe. There is now a growing recognition that even with aggressive reductions in greenhouse gas emissions continued changes in the Earth’s climate are inevitable. As a result, society is increasingly focused on building its capacity to anticipate and prepare for climate variability and change.</p>
        </div>
      </div>
      <div className="row">
        <div className="column small-12">
          <ClimateChange temperature={0.87} carbon={404.48} seaLevel={3.5} />
          <div className="insight-float-image" style={{backgroundImage: `url(${portoAlegre})`}}></div>
        </div>
      </div>
    </div>
  );
}

export default InsightsHome;
