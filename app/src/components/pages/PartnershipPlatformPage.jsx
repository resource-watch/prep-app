import React from 'react';
import Header from '../commons/Header';
import Title from '../commons/Title';
import Button from '../commons/Button';
import Modal from '../commons/Modal';

function PartnershipPlatformPage() {
  return (
    <div className="l-partnership">
      <Header type="small">
        <Title inverse center border type="page">
          Platform Development Workgroup
        </Title>
      </Header>

      <div className="wrapper">

        <div className="text-content">
          <p>
            Entities collaborate on the building of platforms to enhance access and usability of data.</p>
          <p>The Partnership for Resilience and Preparedness works to promote the development of interoperable platforms that enhance access and usability of information for climate resilience and preparedness.</p>
          <p>The PREP platform is currently in beta.  This helps communities access <strong>climate relevant data</strong>, explore <strong>insights from those data</strong>, and compile relevant data and tools in their own <strong>dashboards</strong>.</p>
          <p>The Platform WorkGroup is led by WRI.</p>
        </div>

        <div className="text-content">
          <h2>Other entities</h2>
          <p>Entities that work to establish ensure interoperability in access and use of climate-relevant data and information produce.</p>
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

PartnershipPlatformPage.propTypes = {
  /**
   * Define the route path (from the router)
   */
  currentPage: React.PropTypes.string
};

export default PartnershipPlatformPage;
