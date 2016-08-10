import React from 'react';
import Header from './Header';
import Footer from './Footer';

class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

Layout.childContextTypes = {
  location: React.PropTypes.object
};

Layout.propTypes = {
  children: React.PropTypes.any.isRequired
};

export default Layout;
