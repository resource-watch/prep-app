import React from 'react';
import Header from '../commons/Header';
import Title from '../commons/Title';
import Button from '../commons/Button';
import Modal from '../commons/Modal';

function PartnershipDataPage() {
  return (
    <div className="l-partnership">
      <Header type="small">
        <Title inverse center border type="page">
          Data Workgroup
        </Title>
      </Header>

      <div className="wrapper">

        <div className="text-content">
          <p>
            Entities that work to establish ensure interoperability in access and use of climate-relevant data and information produce.
          </p>
          <p>
            This Data Accessibility Workgroup works to identify and reduce the barriers to access, contribute, and use data for climate resilience.  The group promote standards to ensure interoperability in access and use of climate-relevant data and information.
          </p>
          <p>
            Recent reports coming out of members of this team include:


          </p>
          <p>
            STAY TUNED FOR UPCOMING REPORTS



          </p>
          <p>
            The Data Accessibility WorkGroup is lead by the Federation of Earth Science Information Partners (ESIP).
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

PartnershipDataPage.propTypes = {
  /**
   * Define the route path (from the router)
   */
  currentPage: React.PropTypes.string
};

export default PartnershipDataPage;
