import React from 'react';
import Header from './Header';
import PartnersSlider from '../../containers/PartnersSlider';
import SecondaryNav from '../../components/Navigation/SecondaryNav';
import SocialNav from '../../components/Navigation/SocialNav';

class App extends React.Component {
  render() {
    return (
      <div>
        <header className="l-header">

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
          <div className="l-footer-down">
            <div className="row">
              <div className="column small-6">
                <SocialNav />
              </div>
              <div className="column small-6">
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
