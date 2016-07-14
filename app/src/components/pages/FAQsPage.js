import React from 'react';
import Header from '../commons/Header';
import Title from '../commons/Title';

export function AboutPage() {
  return (
    <div className="l-faqs">
      <Header type="small">
        <Title inverse center border type="page">
          FAQs
        </Title>
      </Header>

      <div className="wrapper">

        <div id="what-is-prep" className="text-content">
          <a href="#what-is-prep">
            <Title type="mini">What is PREP?</Title>
          </a>
          <p>
            The PREP Platform is a project started by the Partnership for
            Resilience and Preparedness (PREP), a public-private collaboration
            that emerged out of the White House Climate Data Initiative. We aim
            to facilitate collaboration among technology innovators,
            researchers, data scientists, and practitioners from the private
            sector, civil society and government. This cooperation will help
            spur new types of data discovery; develop innovative, customizable
            tools in response to user needs; and facilitate sharing and
            collective learning.
          </p>
        </div>

        <div id="what-is-climate-resilience" className="text-content">
          <a href="#what-is-climate-resilience">
            <Title type="mini">What is Climate Resilience?</Title>
          </a>
          <p>
            Still under development. The text will be added later.
          </p>
        </div>

        <div id="how-to-get-involved" className="text-content">
          <a href="#how-to-get-involved">
            <Title type="mini">How can I get involved?</Title>
          </a>
          <p>
            Still under development. The text will be added later.
          </p>
        </div>

        <div id="can-trust-data" className="text-content">
          <a href="#can-trust-data">
            <Title type="mini">Can I trust your data?</Title>
          </a>
          <p>
            Still under development. The text will be added later.
          </p>
        </div>

        <div id="where-download-data" className="text-content">
          <a href="#where-download-data">
            <Title type="mini">Where can I download data?</Title>
          </a>
          <p>
            Still under development. The text will be added later.
          </p>
        </div>

        <div id="uncertainty-planning-future" className="text-content">
          <a href="#uncertainty-planning-future">
            <Title type="mini">
              How do you deal with uncertainty in planning for the future?
            </Title>
          </a>
          <p>
            Still under development. The text will be added later.
          </p>
        </div>

        <div id="report-error" className="text-content">
          <a href="#report-error">
            <Title type="mini">
              I see an error, where do I report it?
            </Title>
          </a>
          <p>
            Still under development. The text will be added later.
          </p>
        </div>

      </div>

    </div>
  );
}

AboutPage.propTypes = {
  /**
   * Define the route path (from the router)
   */
  currentPage: React.PropTypes.string,
};

export default AboutPage;
