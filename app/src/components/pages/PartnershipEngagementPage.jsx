import React from 'react';
import Header from '../commons/Header';
import Title from '../commons/Title';
import Button from '../commons/Button';
import Modal from '../commons/Modal';

function PartnershipEngagementPage() {
  return (
    <div className="l-partnership -engagement">
      <Header type="small">
        <Title inverse center border type="page">
          Engagement Workgroup
        </Title>
      </Header>

      <div className="wrapper">

        <div className="text-content">
          <p>
            Entities that help develop, engage, or mobilize user communities to understand the information needs of those seeking to build preparedness and resilience.
          </p>
          <p>
            Effective climate resilience and preparedness planning often requires information specific to a region or community—or even to a specific sector or project within that region or community. The research and data management groups need to understand those needs to be able to effectively prioritize information products. That is why the Partnership for Resilience and Preparedness engages with communities around the world to understand information needs below are the current engagement efforts involved in PREP
          </p>
	      	<ul>
	      		<li><span>Water</span>
	      			Nulla accumsan, nibh sit amet bibendum laoreet, neque justo tristique nunc, eget blandit diam nibh vitae magna.
	      		</li>
	      		<li><span>Cities</span>
	      			Nulla accumsan, nibh sit amet bibendum laoreet, neque justo tristique nunc, eget blandit diam nibh vitae magna.
	      		</li>
	      		<li><span>Investment</span>
	      			Nulla accumsan, nibh sit amet bibendum laoreet, neque justo tristique nunc, eget blandit diam nibh vitae magna.
	      		</li>
	      		<li><span>Engineering</span>
	      			Nulla accumsan, nibh sit amet bibendum laoreet, neque justo tristique nunc, eget blandit diam nibh vitae magna.
	      		</li>
	      		<li><span>Hazards/Health</span>
	      			Nulla accumsan, nibh sit amet bibendum laoreet, neque justo tristique nunc, eget blandit diam nibh vitae magna.
	      		</li>
	      	</ul>
	      	<p>
	      		The Engagement WorkGroup is co-lead Future Earth and WRI
	      	</p>
        </div>
        
        <div className="text-content">
        	<h2>Join the PREP partnership</h2>
        	<p>To become a partner, prepare a short “letter of intent” expressing your entity’s interest in PREP, your intended workgroup, and how you meet the partner criteria. Members of the Steering Committee will review the letter to ensure the partnership criteria are met. Partners, and a description of their role in and contribution to PREP, will be publicly listed in the “Partners” portion of the PREP website. Partner criteria are:
        	</p>
        	<ul>
        		<li>A commitment to the PREP mission.</li>
        		<li>A commitment to contribute to the Partnership{"'"}s mission through in-kind or direct contribution (e.g. engagement, data, platform).</li>
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

PartnershipEngagementPage.propTypes = {
  /**
   * Define the route path (from the router)
   */
  currentPage: React.PropTypes.string
};

export default PartnershipEngagementPage;
