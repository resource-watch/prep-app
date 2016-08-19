import React from 'react';
import { Link } from 'react-router';
import Article from '../Content/Article';
import JoinPartnership from './Articles/JoinPartnership';
import PartnershipSlider from '../Slider/PartnershipSlider';

class Partnership extends React.Component {

  render() {
    return (
      <div className="c-partnership">
        <div className="sliced"></div>

        <article className="c-article">
          <div className="row align-center">
            <div className="column small-12 medium-8">
              <p>The Partnership for Resilience and Preparedness (PREP) is a public-private collaboration to empower a data-driven approach to building climate resilience. The Partnership aims to help planners, investors, and resource managers around the globe to more easily incorporate climate risks into their decisions by enhancing access to relevant data and insights on climate variability and change, and facilitating peer-to-peer learning. PREP will do this through: </p>

              <h3>Engagement</h3>
              <p>We will facilitate sustained dialogues among data/information producers and users for climate resilience.</p>
              <Link to="/partnership/engagement">Go to engagement</Link>

              <h3>Data</h3>
              <p>We will seek to reduce the barriers to access, contribute, and use data for climate resilience.</p>
              <Link to="/partnership/data">Go to data</Link>

              <h3>Platforms</h3>
              <p>We will develop platforms to enhance access to and usability of climate-relevant data and information.</p>
              <Link to="/partnership/platforms">Go to platforms</Link>

              <p>PREP includes representatives from several U.S. government agencies with vast data holdings, leading technology companies, and civil society organizations. We welcome other entities committed to our mission to <a href="#join">join the partnership</a>.</p>
            </div>
          </div>
          <aside className="row">
            <div className="column small-12 medium-4">
              <div className="c-card -border -border-neutral">
                <h3>The Need</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Socis natoque penatibus et magnis mus.</p>
                <a href="#">Know more</a>
              </div>
            </div>
            <div className="column small-12 medium-4">
              <div className="c-card -border -border-neutral">
                <h3>The Role</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Socis natoque penatibus et magnis mus.</p>
                <a href="#">Know more</a>
              </div>
            </div>
            <div className="column small-12 medium-4">
              <div className="c-card -border -border-neutral">
                <h3>Join</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Socis natoque penatibus et magnis mus.</p>
                <a href="#">Know more</a>
              </div>
            </div>
          </aside>
        </article>

        <Article>
          <h2>The need for relevant, useable climate-risk data</h2>
          <p>With climate change already upon us, a growing number of communities, companies, and civil society organizations are looking to conduct climate vulnerability assessments, risk screening, and develop resilience plans. As a result, the demand for climate risk information is on the rise, however efforts to turn data into actionable plans are constrained by two challenges:</p>
          <ul>
            <li>
              <h4>The availability of robust, actionable information is limited</h4>
              <p>Despite extensive data collection and analysis conducted by government and research institutions, the specific information needs of resource managers and of decision makers in communities and corporations across the globe are not being met.</p>
            </li>
            <li>
              <h4>It is difficult to find, access, and use existing data and information</h4>
              <p>Much of the climate-relevant data that do exist are difficult to access and use because the often sit in incompatible formats in silos of a multitude of government, university, and other data servers.</p>
            </li>
          </ul>
          <p>Overcoming these challenges will require maintaining a sustained dialogue among producers and users of information, promoting standards to enhance accessibility and interoperability of data and information products, and developing platforms that enhance data accessibility in ways that meet the specific needs of users seeking to understand and manage climate risks. The goal of PREP is to meet this need.</p>
        </Article>

        <article className="c-article">
          <div className="row align-center">
            <div className="column small-12 medium-8">
              <h2>The role of PREP partners</h2>
              <p>PREP is built on a global network of collaborators from the public and private sectors and from civil society. Each participates in at least one of the PREP workgroups.</p>
              <p>Actionable plans are constrained by two challenges:</p>
            </div>
          </div>

          <PartnershipSlider />

          <div className="row align-center">
            <div className="column small-12 medium-8">
              <p>PREP is managed by a Steering Committee that provides the governance of the Partnership and the design of the initial PREP data and dashboard platform. PREP partners are anchored in one workgroup. A representative from the Steering Committee chairs each of the four workgroups. Partners that become actively engaged in the Platform, Data Accessibility, and/or the Engagement Workgroup can become eligible to serve on the Steering Committee.</p>
            </div>
          </div>
        </article>

        <Article>
          <JoinPartnership />
        </Article>

      </div>
    );
  }

}

export default Partnership;
