import React from 'react';
import ShareModal from '../../components/modals/ShareModal';
import Footer from '../commons/Footer';
import Navbar from '../commons/Navbar';

class ContainerPage extends React.Component {

  getChildContext() {
    return {
      location: {
        pathname: this.props.location.pathname,
        query: this.props.location.query,
        params: this.props.params
      }
    };
  }

  render() {
    /* The following array is used to define which theme, header and footer each
     * page should use. The pages are defined by a regex. By default, the rules
     * for the static pages apply (thanks to the regex).
     *
     * theme:
     * 	- 1: yellow
     * 	- 2: green
     * 	- 3: blue
     */
    const regexToPages = [
      /* Data */
      {
        regex: /^\/data\/map\/?.*$/,
        theme: 2,
        header: <Navbar small dark />,
        footer: '',
        class: '-height100'
      },
      /* Data detail */
      {
        regex: /^\/data\/dataset\/.+$/,
        theme: 2,
        header: <Navbar />,
        footer: <Footer />
      },
      /* Dashboards */
      {
        regex: /^\/dashboards$/,
        theme: 1,
        header: <Navbar />,
        footer: <Footer />
      },
      /* Dashboard detail */
      {
        regex: /^\/dashboards\/.+$/,
        theme: 1,
        header: <Navbar />,
        footer: <Footer />
      },
      /* Insights */
      {
        regex: /^\/insights$/,
        theme: 3,
        header: <Navbar />,
        footer: <Footer />
      },
      /* Insight detail */
      {
        regex: /^\/insights\/.+$/,
        theme: 3,
        header: <Navbar />,
        footer: <Footer />
      },
      /* Partnership detail */
      {
        regex: /^\/partnership\/.+$/,
        theme: 3,
        header: <Navbar />,
        footer: <Footer />
      },
      /* Partnership Engagement detail */
      {
        regex: /^\/partnershipengagement\/.+$/,
        theme: 3,
        header: <Navbar />,
        footer: <Footer />
      },
      /* Default rule - Statics */
      {
        regex: /.*/,
        theme: 1,
        header: <Navbar />,
        footer: <Footer />
      }
    ];

    const page = regexToPages
      .filter(rule => rule.regex.test(this.props.location.pathname))[0];

    return (
      <div className={[`-theme-${page.theme}`, page.class || ''].join(' ')}>
        {page.header}
        {this.props.children}
        {page.footer}

        <ShareModal
          title="Share this page"
          url={window.location.href}
          opened={this.props.modalOpen}
          close={() => this.props.setModalShare(false)}
        />
      </div>
    );
  }
}

ContainerPage.childContextTypes = {
  location: React.PropTypes.object
};

ContainerPage.propTypes = {
  /**
   * Define the page content
   */
  children: React.PropTypes.any.isRequired,
  /**
   * Define the location of the current page
   */
  location: React.PropTypes.object.isRequired,
  /**
   * Define the params of the url
   */
  params: React.PropTypes.object.isRequired,
  /**
   * Define the share modal status
   */
  modalOpen: React.PropTypes.bool.isRequired,
  /**
   * Define the share modal function to set status
   */
  setModalShare: React.PropTypes.func.isRequired
};

export default ContainerPage;
