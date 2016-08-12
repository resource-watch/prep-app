import React from 'react';
import { Link } from 'react-router';
import Header from '../commons/Header';
import Title from '../commons/Title';
import Button from '../commons/Button';
import Modal from '../commons/Modal';
import Slider from '../../../lib/react-slick/react-slick';

function PartnershipPage() {
  const settings = {
    dots: false,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 500
  };

  return (
    <div className="l-partnership">
      <Header type="small">
        <Title inverse center border type="page">
          Partnership for Resilience and Preparedness
        </Title>
      </Header>

      <div className="wrapper">

        <div className="text-content">
          <p>
            The Partnership for Resilience and Preparedness (PREP) is a public-private collaboration to empower a data-driven approach to building climate resilience. The Partnership aims to help planners, investors, and resource managers around the globe to more easily incorporate climate risks into their decisions by enhancing access to relevant data and insights on climate variability and change, and facilitating peer-to-peer learning. PREP will do this through:
          </p>
          <h3>Community Engagement</h3>
          <p>
            We will facilitate sustained dialogues among data/information producers and users for climate resilience.
          </p>
          <p><a href="/partnershipengagement">GO TO COMMUNITY ENGAGEMENT</a></p>
          <h3>Data Accessibility</h3>
          <p>
            We will seek to reduce the barriers to access, contribute, and use data for climate resilience.
          </p>
          <p><a href="/partnershipdata">GO TO DATA ACCESSIBILITY</a></p>
          <h3>Platform Development</h3>
          <p>
            We will develop platforms to enhance access to and usability of climate-relevant data and information.
          </p>
          <p><a href="/partnershipplatform">GO TO PLATFORM DEVELOPMENT</a></p>
          <p>PREP includes representatives from several U.S. government agencies with vast data holdings, leading technology companies, and civil society organizations. We welcome other entities committed to our mission to <a href="#">join the partnership.</a>
          </p>

          <h2>The need for relevant, useable climate-risk data</h2>
          <p>With climate change already upon us, a growing number of communities, companies, and civil society organizations are looking to conduct climate vulnerability assessments, risk screening, and develop resilience plans. As a result, the demand for climate risk information is on the rise, however efforts to turn data into actionable plans are constrained by two challenges:
          </p>
	      	<ul>
	      		<li><span>The availability of robust, actionable information is limited</span>
	      			Despite extensive data collection and analysis conducted by government and research institutions, the specific information needs of resource managers and of decision makers in communities and corporations across the globe are not being met.
	      		</li>
	      		<li><span>It is difficult to find, access, and use existing data and information</span>
	      			Much of the climate-relevant data that do exist are difficult to access and use because the often sit in incompatible formats in silos of a multitude of government, university, and other data servers.
	      		</li>
	      	</ul>
	      	<p>
	      		Overcoming these challenges will require maintaining a sustained dialogue among producers and users of information, promoting standards to enhance accessibility and interoperability of data and information products, and developing platforms that enhance data accessibility in ways that meet the specific needs of users seeking to understand and manage climate risks. The goal of PREP is to meet this need.
	      	</p>
	      	<p>
	      		We seek to reduce the barriers to access, contribute, and use data for climate resilience.
	      	</p>
	      	<p>
	      		PREP includes representatives from several U.S. government agencies with vast  data holdings, leading technology companies, and civil society organizations. We welcome other  entities committed  to our mission to <a href="#">join the partnership</a>.
	      	</p>

	      	<h2>The role of PREP partners</h2>
          	<p>PREP is built on a global network of collaborators from the public and private sectors and from civil society. Each participates in at least one of the PREP workgroups
          	</p>
          	<p>
          		Actionable plans are constrained by two challenges:
          	</p>
        </div>

        <div className="text-content -banner">
          <h2>Data Accessibility Workgroup</h2>
          <p>Entities that work to establish ensure interoperability in access and use of climate-relevant data and information produce.</p>
        </div>

        <Slider className="workgroup-slider" {...settings}>
          <div>
            <h2><Link to="/partnershipengagement">Engagement workgroup</Link></h2>
            <p>Entities that work to establish ensure interoperability in access and use of climate-relevant data and information produce.</p>
          </div>
          <div>
            <h2><Link to="/partnershipdata">Data accessibility</Link></h2>
            <p>Lorem ipsum.</p>
          </div>
          <div>
            <h2><Link to="/partnershipplatform">Platform development group</Link></h2>
            <p>Lorem ipsum.</p>
          </div>
        </Slider>

        <div className="text-content">
        	<p>
        	PREP is managed by a Steering Committee that provides the governance of the Partnership and the design of the initial PREP data and dashboard platform. PREP partners are anchored in one workgroup. A representative from the Steering Committee chairs each of the four workgroups. Partners that become actively engaged in the Platform, Data Accessibility, and/or the Engagement Workgroup can become eligible to serve on the Steering Committee.
        	</p>
        </div>
        <div className="text-content">
        	<h2>Join the PREP partnership</h2>
        	<p>To become a partner, prepare a short “letter of intent” expressing your entity’s interest in PREP, your intended workgroup, and how you meet the partner criteria. Members of the Steering Committee will review the letter to ensure the partnership criteria are met. Partners, and a description of their role in and contribution to PREP, will be publicly listed in the “Partners” portion of the PREP website. Partner criteria are:
        	</p>
        	<ul>
        		<li>A commitment to the PREP mission.</li>
        		<li>A commitment to contribute to the Partnership\'s mission through in-kind or direct contribution (e.g. engagement, data, platform).</li>
        		<li>Delegation of at least one person to be the point of contact who is actively involved as needed.</li>
        	</ul>
        	<section className="homepage-contact">
	          <div className="wrapper">
	            <div className="container">
	              <form className="contact-box">
	                <input type="email" placeholder="your@email.org" className="email" />
	                <textarea placeholder="Your message here" className="message"></textarea>
	                <Button
	                  fill
	                  border
	                  click={e => this.onSubmitForm(e)}
	                >
	                  Send message
	                </Button>
	              </form>

	            </div>

	          </div>
	        </section>
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
