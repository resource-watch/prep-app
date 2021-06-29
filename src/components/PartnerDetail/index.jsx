import React from 'react';
import { Link } from 'react-router';
import MainNav from 'layout/navigation/MainNav';
import SecondaryNav from 'layout/navigation/SecondaryNav';
import SocialNav from 'layout/navigation/SocialNav';
import Breadcrumbs from 'layout/navigation/Breadcrumbs';
import PartnersSlider from 'containers/PartnersSlider';
import SummaryCards from 'components/SummaryCards';
import Banner from 'components/Banner';

const logoImage = '/images/prep-logo.png';

function getHeader() {
  return (
    <div className="l-header-nav">
      <header className="l-header -float">
        <div className="l-header-nav -dark">
          <div className="row align-middle">
            <div className="column small-10 medium-4">
              <Link to="/" className="logo">
                <img src={logoImage} alt="Partnership for Resilience and Preparedness" />
              </Link>
            </div>
            <div className="column small-2 medium-8">
              <MainNav />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

function getFooter() {
  return (
    <footer className="l-footer">
      <div className="l-footer-top -inverse">
        <div className="row">
          <div className="column small-12">
            <PartnersSlider />
          </div>
        </div>
      </div>
      <div className="l-footer-sep">
        <div className="row">
          <div className="column small-12">
            <div className="footer-sep-item" />
          </div>
        </div>
      </div>
      <div className="l-footer-down">
        <div className="row">
          <div className="column small-6 align-middle">
            <SocialNav />
          </div>
          <div className="column small-6 align-middle">
            <SecondaryNav />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function PartnerDetail(props) {
  const partner = props.partners.length ? props.partners.find(item => item.id === +props.params.id) : null;
  if (partner) {
    document.title = `Partners - ${partner.name}`;
  }
  return (
    <div>
      {getHeader()}
      <div className="l-header-banner">
        <Breadcrumbs pathname={`/partners/${partner ? partner.name : ''}`} />
        <img className="partner-logo" alt={partner ? partner.name : ''} src={partner ? `${process.env.REACT_APP_ASSETS_URL}${partner.white_logo}` : ''} />
        <Banner size="small" bg="partnerDetail" />
      </div>
      <div className="l-main -collapsed">
        <div className="sliced" />
        <article className="c-article">
          <div className="row align-center">
            <div className="column small-12 medium-8">
              <div className="partner-links">
                <Link to="/partners">{'<  partners'}</Link>
                <Link to={partner ? partner.url : ''} target="_blank" >
                  <svg x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16"><g>
                    <path
                      d="M11,0C9.7,0,8.4,0.5,7.5,1.5L6.3,2.6C5.9,3,5.9,3.6,6.3,4s1,0.4,1.4,0l1.2-1.2c1.1-1.1,3.1-1.1,4.2,0
                      C13.7,3.4,14,4.2,14,5s-0.3,1.6-0.9,2.1L12,8.3c-0.4,0.4-0.4,1,0,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l1.2-1.2
                      C15.5,7.6,16,6.3,16,5s-0.5-2.6-1.5-3.5C13.6,0.5,12.3,0,11,0z"
                    />
                    <path
                      d="M8.3,12l-1.2,1.2c-1.1,1.1-3.1,1.1-4.2,0C2.3,12.6,2,11.8,2,11s0.3-1.6,0.9-2.1L4,7.7c0.4-0.4,0.4-1,0-1.4
                      s-1-0.4-1.4,0L1.5,7.5C0.5,8.4,0,9.7,0,11s0.5,2.6,1.5,3.5C2.4,15.5,3.7,16,5,16s2.6-0.5,3.5-1.5l1.2-1.2c0.4-0.4,0.4-1,0-1.4
                      S8.7,11.6,8.3,12z"
                    />
                    <path
                      d="M9.4,5.2L5.2,9.4c-0.4,0.4-0.4,1,0,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l4.2-4.2
                      c0.4-0.4,0.4-1,0-1.4C10.4,4.8,9.8,4.8,9.4,5.2z"
                    />
                  </g>
                  </svg>
                  <span>go to partner website</span>
                </Link>
              </div>
              <p>{partner ? partner.description : ''}</p>
              {partner && partner.content ? <h3>Commitment</h3> : ''}
              <p>{partner ? partner.content : ''}</p>
            </div>
          </div>
        </article>
        <SummaryCards extraCard="insights" />
      </div>
      {getFooter()}
    </div>
  );
}
