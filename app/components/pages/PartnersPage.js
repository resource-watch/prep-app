import React from 'react';
import Header from '../commons/Header';
import Title from '../commons/Title';

export function PartnersPage() {
  return (
    <div className="l-partners">
      <Header type="small">
        <Title inverse center border type="page">
          Partners
        </Title>
      </Header>

      <div className="wrapper">
        <div className="text-content">
          <p>
            A public-private collaboration, the Partnership for Resilience and
            Preparedness (PREP) was formed to accelerate use of information and
            communication technology to improve climate risk assessment and
            resilience planning. It includes representatives from United States
            government agencies with vast data holdings, leading technology
            companies in the private sector, and civil society organizations.
          </p>
          <p>
            <i>Co-develop, co-brand, and co-govern.</i> A public-private
            collaboration was created to take advantage of the respective
            abilities each partner brings to the table. We pursue nimble and
            rapid innovation, ownership and trust among partners, and a
            diversity of expertise and experience.
          </p>
        </div>

        <Title type="content">
          Partners
        </Title>
        <div className="partners-logos">
          <a href="https://cartodb.com" target="_blank" rel="noreferrer">
            <img src={gon.assets.cartodbLogo} alt="CartoDB" />
          </a>
          <a
            href="http://www.descarteslabs.com"
            target="_blank"
            rel="noreferrer"
          >
            <img src={gon.assets.descartesLogo} alt="Descartes Labs" />
          </a>
          <a href="http://earthknowledge.net" target="_blank" rel="noreferrer">
            <img src={gon.assets.earthknowledgeLogo} alt="Earth Knowledge" />
          </a>
          <a href="http://www.esri.com/" target="_blank" rel="noreferrer">
            <img src={gon.assets.esriLogo} alt="esri" />
          </a>
          <a href="http://www.vizzuality.com" target="_blank" rel="noreferrer">
            <img src={gon.assets.vizzualityLogo} alt="Vizzuality" />
          </a>
          <a href="http://www.wri.org/" target="_blank" rel="noreferrer">
            <img src={gon.assets.wriLogo} alt="World Resources Institute" />
          </a>
        </div>

        <Title type="content">
          Federal collaborators
        </Title>
        <div className="partners-logos">
          <a href="https://www.doi.gov" target="_blank" rel="noreferrer">
            <img
              src={gon.assets.departementInteriorLogo}
              alt="U.S. Department of the Interior"
            />
          </a>
          <a href="https://www.nasa.gov" target="_blank" rel="noreferrer">
            <img src={gon.assets.nasaLogo} alt="NASA" />
          </a>
          <a href="http://www.noaa.gov" target="_blank" rel="noreferrer">
            <img
              src={gon.assets.noaaLogo}
              alt="National Oceanic and Atmospheric Administration"
            />
          </a>
          <a
            href="http://www.globalchange.gov"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={gon.assets.globalChangeProgramLogo}
              alt="Global Change Research Program"
            />
          </a>
        </div>
      </div>

    </div>
  );
}

PartnersPage.propTypes = {
  /**
   * Define the route path (from the router)
   */
  currentPage: React.PropTypes.string,
};

export default PartnersPage;
