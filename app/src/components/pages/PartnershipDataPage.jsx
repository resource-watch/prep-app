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
          Data Accessibility Workgroup
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
            The Data Accessibility WorkGroup is lead by the Federation of Earth Science Information Partners (ESIP).
          </p>
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
