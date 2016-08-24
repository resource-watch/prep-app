import React from 'react';
import { Link } from 'react-router';
import Article from '../Content/Article';
import InsightsHome from './Articles/InsightsHome';
import ExploreHome from './Articles/ExploreHome';
import DashboardsHome from './Articles/DashboardsHome';
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
              <h2 className="-left">Our mission</h2>
              <p>The Partnership for Resilience and Preparedness (PREP) is a public-private collaboration to empower a data-driven approach to building climate resilience. The Partnership aims to help planners, investors, and resource managers around the globe to more easily incorporate climate risks into their decisions by enhancing access to relevant data and facilitate collective learning through insights on climate variability and change. PREP will do this through:</p>

              <h3>Engagement</h3>
              <p>We will facilitate sustained dialogues among data/information producers and users for climate resilience.</p>
              <Link to="partnership/engagement">Go to engagement</Link>

              <h3>Data</h3>
              <p>We will seek to reduce the barriers to access, contribute, and use data for climate resilience.</p>
              <Link to="partnership/data">Go to data</Link>

              <h3>Platforms</h3>
              <p>We will develop platforms to enhance access to and usability of climate-relevant data and information.</p>
              <Link to="partnership/platforms">Go to platforms</Link>

              <p>PREP is a Data Collaborative of the Global Partnership for Sustainable Development Data.</p>
            </Article>
          </div>

          <div className="column small-12 medium-6">
            <Article grid="small-12" no-border floating>
              <img src={ladyInLand} />
              <div className="padded">
                <h2 className="-left">The Challenge</h2>
                <p>With climate change already upon us, a growing number of communities, companies, and civil society organizations are looking to conduct climate vulnerability assessments, risk screening, and develop resilience plans. As a result, the demand for climate risk information is on the rise, however efforts to turn data into actionable plans are constrained by two challenges: </p>
                <ul>
                  <li>The availability of robust, actionable information is limited.</li>
                  <li>It is difficult to find, access, and use existing data and information.</li>
                </ul>
                <p>Prep seeks to overcome these challenges by facilitating sustained dialogues among producers and users of information, promoting standards to enhance accessibility and interoperability of data and information products, and developing platforms that enhance data accessibility and knowledge sharing.</p>
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
