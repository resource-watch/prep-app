import React from 'react';
import Footer from '../commons/Footer';
import Navbar from '../commons/Navbar';

function ContainerPage(props) {
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
      regex: /^\/data$/,
      theme: 2,
      header: <Navbar small dark currentPage="data" />,
      footer: '',
      class: '-height100'
    },
    /* Dashboards */
    {
      regex: /^\/dashboards$/,
      theme: 1,
      header: <Navbar currentPage="dashboards" />,
      footer: <Footer />
    },
    /* Dashboard detail */
    {
      regex: /^\/dashboards\/.+$/,
      theme: 1,
      header: <Navbar currentPage="dashboards" />,
      footer: <Footer />
    },
    /* Insights */
    {
      regex: /^\/insights$/,
      theme: 3,
      header: <Navbar currentPage="insights" />,
      footer: <Footer />
    },
    /* Insight detail */
    {
      regex: /^\/insights\/.+$/,
      theme: 3,
      header: <Navbar currentPage="insights" />,
      footer: <Footer />
    },
    /* Default rule - Statics */
    {
      regex: /.*/,
      theme: 1,
      header: <Navbar currentPage="" />,
      footer: <Footer />
    }
  ];

  const page = regexToPages
    .filter(rule => rule.regex.test(props.path))[0];

  return (
    <div className={[`-theme-${page.theme}`, page.class || ''].join(' ')}>
      {page.header}
      {props.children}
      {page.footer}
    </div>
  );
}

ContainerPage.propTypes = {
  /**
   * Define the page content
   */
  children: React.PropTypes.any.isRequired,
  /**
   * Define the path of the current page
   */
  path: React.PropTypes.string.isRequired
};

export default ContainerPage;
