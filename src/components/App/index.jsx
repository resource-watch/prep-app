import React from 'react';
import { Link } from 'react-router';
import PartnersSlider from '../../containers/PartnersSlider';
import SecondaryNav from '../../components/Navigation/SecondaryNav';
import SocialNav from '../../components/Navigation/SocialNav';
import MainNav from '../../components/Navigation/MainNav';
import Banner from '../../components/Banner';

import logoImage from '../../images/preplogo@2x.png';

class App extends React.Component {
  render() {
    return (
      <div>
        <header className="l-header">
          <div className="l-header-nav">
            <div className="row align-middle">
              <div className="column small-10 medium-4">
                <Link to={"/"} className="logo">
                  <img src={logoImage} alt="Partnership for Resilience and Preparedness" />
                </Link>
              </div>
              <div className="column small-2 medium-8">
                <MainNav />
              </div>
            </div>
          </div>
          <div className="l-header-banner">
            <Banner />
          </div>
        </header>

        <div className="l-main">
          {this.props.children}
        </div>

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
      </div>
    );
  }
}

App.childContextTypes = {
  location: React.PropTypes.object
};

App.propTypes = {
  children: React.PropTypes.any.isRequired
};

export default App;
