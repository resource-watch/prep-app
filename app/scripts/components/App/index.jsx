import React from 'react';

// Components
import { Link } from 'react-router';
import PartnersSlider from '../../containers/PartnersSlider';
import SecondaryNav from '../../components/Navigation/SecondaryNav';
import SocialNav from '../../components/Navigation/SocialNav';
import MainNav from '../../components/Navigation/MainNav';
import Banner from '../../components/Banner';
import SummaryCards from '../../components/SummaryCards';
import ContactForm from '../../components/ContactForm';

import metadata from '../../metadata.json';

const logoImage = '/images/prep-logo.png';

const theme = {
  '/resources': '-theme-2',
  '/stories': '-theme-3'
};

class App extends React.Component {
  static getData(key, value) {
    let data = null;
    // First search for exactly match
    for (let i = metadata.length - 1; i >= 0; i--) {
      if (value === metadata[i][key]) {
        data = metadata[i];
        break;
      }
    }
    // If no data, search for close result
    if (!data) {
      for (let i = metadata.length - 1; i >= 0; i--) {
        if (value.indexOf(metadata[i][key]) > -1) {
          data = metadata[i];
          break;
        }
      }
    }
    return data;
  }

  getCurrentData() {
    const pathname = this.props.location.pathname;
    const currentData = App.getData('pathname', pathname);
    return currentData;
  }

  render() {
    const currentData = this.getCurrentData();
    const isHomepage = (currentData.name === 'home');
    const pathname = window.location.pathname;
    const summaryCardsPages = ['/contact', '/stories', '/dashboards'];

    document.title = currentData.title;

    return (
      <div className={theme[pathname]}>
        <header className="l-header">
          <div className={`l-header-nav ${currentData.name === 'home' ? '-no-bg' : ''}`}>
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
          <div className="l-header-banner">
            <Banner
              bg={currentData.bannerBg}
              size={currentData.bannerSize}
              landing={isHomepage}
            >
              <h1>{currentData.title}</h1>
            </Banner>
          </div>
        </header>

        <div className="l-main">
          {this.props.children}
        </div>

        {summaryCardsPages.indexOf(pathname) !== -1 &&
        <SummaryCards
          extraCard={pathname === '/stories' ? 'dashboards' : 'stories'}
        />
        }

        {(pathname === '/' || pathname === '/how-to') &&
        <ContactForm />
        }

        <footer className="l-footer">
          {pathname !== '/' &&
            <div>
              <div className="l-footer-top -inverse">
                <div className="row">
                  <div className="column small-12">
                    <PartnersSlider route={pathname} />
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
            </div>
          }
          <div className="l-footer-down">
            <div className="row">
              <div className="column small-12 medium-12 large-5 align-middle">
                <SocialNav />
              </div>
              <div className="column small-6 medium-12 large-7 align-middle">
                <SecondaryNav />
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

App.childContextTypes = { location: React.PropTypes.object };

App.propTypes = {
  children: React.PropTypes.any.isRequired,
  location: React.PropTypes.any.isRequired
};

export default App;
