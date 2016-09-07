import React from 'react';
import { Link } from 'react-router';
import Article from '../Content/Article';
import InsightsHome from './Articles/InsightsHome';
import ExploreHome from './Articles/ExploreHome';
import DashboardsHome from '../../containers/Home/DashboardsHome';
import TwitterFeed from '../../containers/TwitterFeed';

import ladyInLand from '../../../images/home/lady-in-land.jpg';
import iceberg from '../../../images/home/iceberg.jpg';

class Home extends React.Component {
  render() {
    return (
      <div className="c-homepage">
        <div className="row">
          <div className="column small-12 medium-6">
            <Article grid="small-12" no-border>
              <div className="padded">
              <h2 className="-left">Our mission</h2>
              <p>The Partnership for Resilience and Preparedness (PREP) is a public-private collaboration to empower a data-driven approach to building climate resilience. PREP aims to help planners, investors, and resource managers more easily incorporate climate risks into their decisions by enhancing access to relevant data and facilitating collective learning. PREP does this through:</p>

              <h3>Engagement</h3>
              <p>We promote collaboration among data and information producers and users.</p>

              <h3>Data</h3>
              <p>We will seek to reduce the barriers to accessing, contributing, and using data for climate resilience.</p>

              <h3>Platforms</h3>
              <p>We will develop platforms to enhance access to and usability of climate-relevant data and information.</p>

              <Link to="/about">Learn more</Link>
              </div>
            </Article>
          </div>

          <div className="column small-12 medium-6">
            <Article grid="small-12" no-border floating>
              <img src={ladyInLand} />
              <div className="padded">
                <h2 className="-left">The Challenge</h2>
                <p>With climate change already upon us, a growing number of communities, companies, and civil society organizations are looking to assess climate vulnerability and to develop resilience plans. However, efforts to turn data into actionable plans are constrained by two challenges:</p>
                <ul>
                  <li>Robust, actionable data are limited.</li>
                  <li>Even when data and information exist, they are difficult to find, access, and use.</li>
                </ul>
                <p>PREP addresses these challenges by promoting collaboration among producers and users of information, fostering standards to enhance accessibility and interoperability of data and information products, and developing platforms that improve data accessibility and knowledge sharing.</p>
              </div>
            </Article>
          </div>
        </div>

        <img src={iceberg} />

        <div className="row">
          <div className="column small-12">
            <TwitterFeed sliced />
          </div>
        </div>

        <Article grid={'small-12 medium-12'}>
          <InsightsHome />
        </Article>

        <Article grid={'small-12 medium-12'}>
          <ExploreHome />
        </Article>

        <Article grid={'small-12 medium-12'}>
          <DashboardsHome />
        </Article>
      </div>
    );
  }
}

export default Home;
