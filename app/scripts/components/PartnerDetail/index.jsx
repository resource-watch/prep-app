import React from 'react';
import { Link } from 'react-router';
import MainNav from '../../components/Navigation/MainNav';
import logoImage from '../../../images/prep-logo.png';
import SecondaryNav from '../../components/Navigation/SecondaryNav';
import SocialNav from '../../components/Navigation/SocialNav';
import PartnersSlider from '../../containers/PartnersSlider';
import SummaryCards from '../../components/SummaryCards';
import Banner from '../../components/Banner';
import Breadcrumbs from '../../components/Navigation/Breadcrumbs';

export default class PartnerDetail extends React.Component {
  componentDidMount() {

  }
  getHeader() {
    return (
      <div className="l-header-nav">
        <header className="l-header -float">
          <div className="l-header-nav -dark">
            <div className="row align-middle">
              <div className="column small-10 medium-4">
                <Link to={'/'} className="logo">
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
  getFooter() {
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
              <div className="footer-sep-item"></div>
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
  render() {
    const partner = this.props.partners.length ? this.props.partners.find(item => item.id === +this.props.params.id) : null;
    if (partner) {
      document.title = `Partners - ${partner.name}`;
    }
    return (
      <div>
        {this.getHeader()}
        <div className="l-header-banner">
          <Breadcrumbs pathname={`/partners/${partner ? partner.name : ''}`} />
          <img className="partner-logo" alt={partner ? partner.name : ''} src={partner ? `${config.apiUrl}${partner.images.white_logo}` : ''} />
          <Banner size="small" bg="partnerDetail" />
        </div>
        <div className="l-main -collapsed">
          <div className="sliced"></div>
          <article className="c-article">
            <div className="row align-center">
              <div className="column small-12 medium-8">
                <Link to="/partners">{'<  partners'}</Link>
                <p>{partner ? partner.description : ''}</p>
              </div>
            </div>
          </article>
          <SummaryCards extraCard="insights" />
        </div>
        {this.getFooter()}
      </div>
    );
  }
}

PartnerDetail.propTypes = {
  partners: React.PropTypes.array,
  params: React.PropTypes.object
};
