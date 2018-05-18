import React from 'react';
import { connect } from 'react-redux';
import useScroll from 'react-router-scroll';
import { IndexRoute, Router, Route, applyRouterMiddleware } from 'react-router';

import App from './components/App';
import Home from './components/Home';
import AboutPage from './pages/about';
import ExplorePage from './pages/explore';
import PartnersPage from './pages/partners';
import ResourcesPage from './pages/resources';
import DatasetDetail from './containers/Dataset';
import FAQ from './pages/FAQ';
import TermsOfService from './pages/terms-of-service';
import PrivacyPolicy from './pages/privacy-policy';
import HowTo from './pages/how-to';
import Dashboards from './containers/Dashboards';
import DashboardsDetail from './containers/Dashboards/DashboardDetail';
import Insights from './containers/Insights';
import InsightsDetail from './containers/Insights/InsightDetail';
import Create from './components/Create';
import Contact from './components/Contact';
import Embed from './containers/Embed';
import Root from './components/Root';
import PartnerDetail from './containers/PartnerDetail';
import Auth from './components/auth/auth';
import ExploreEmbedPage from './pages/explore-embed';
import ExploreExportPage from './pages/explore-export';
import NexGDDPEmbedPage from './pages/nexgddp-embed';

function shouldUpdateScroll(prevRouterProps, { location }) {
  /**
   * Return whether the two pages match the regex and have the same matching
   * regex parameters
   * @param  {regex}  regex
   * @return {Boolean}
   */
  function isSamePage(regex) {
    const pathname = (prevRouterProps && prevRouterProps.location.pathname) || '';
    const nextPathname = location.pathname;

    /* We first check if the pages are concerned by the regex. If not, the route
     * isn't matching */
    const isPathnameConcerned = regex.test(pathname);
    const isNextPathnameConcerned = regex.test(nextPathname);

    if (!isPathnameConcerned || !isNextPathnameConcerned) {
      return false;
    }

    /* We then get the matching regex params and return false if there isn't
     * any */
    const routeParams = pathname.match(regex);
    const nextRouteParams = nextPathname.match(regex);

    if (!routeParams || !nextRouteParams) {
      return false;
    }

    /* We remove the first element of the arrays as it is the whole matched
     * string (i.e. the route) */
    if (routeParams.length) {
      routeParams.splice(0, 1);
    }
    if (nextRouteParams.length) {
      nextRouteParams.splice(0, 1);
    }

    const paramsCount = Math.min(routeParams.length, nextRouteParams.length);

    let doesParamsMatch = true;
    for (let i = 0, j = paramsCount; i < j; i++) {
      if (routeParams[i] !== nextRouteParams[i]) {
        doesParamsMatch = false;
        break;
      }
    }

    return doesParamsMatch;
  }

  /* Here we define all the routes for which we don't want to scroll to top if
   * both the old path and the new one match (i.e. if the global regex and the
   * regex params match the two paths) */
  const regexes = [
    /\/dashboard\/((?:[A-z]|[1-9]|-)+)(?:\/(?:.*))?/,
    /\/insights\/((?:[A-z]|[1-9]|-)+)/,
    /\/dataset\/((?:[A-z]|[1-9]|-)+)/
  ];

  for (let i = 0, j = regexes.length; i < j; i++) {
    if (isSamePage(regexes[i])) {
      return false;
    }
  }

  return true;
}

const requireAuth = (nextState, replace) => {
  if (!localStorage.token) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    });
  }
};

const confirmLogOut = (routes) => {
  const { logout } = routes.location.query;
  if (!logout) return;
  localStorage.removeItem('token');
};

function Routes(props) {
  return (
    <Router
      history={props.history}
      render={applyRouterMiddleware(useScroll(shouldUpdateScroll))}
    >
      <Route path="" component={Root}>
        <Route path="/" component={App} onEnter={confirmLogOut}>
          <IndexRoute component={Home} />
          <Route path="about" component={AboutPage} />
          <Route path="faqs" component={FAQ} />
          <Route path="terms-of-service" component={TermsOfService} />
          <Route path="privacy-policy" component={PrivacyPolicy} />
          <Route path="how-to" component={HowTo} />
          <Route path="dashboards" component={Dashboards} />
          <Route path="stories" component={Insights} />
          <Route path="create" component={Create} />
          <Route path="partners" component={PartnersPage} />
          <Route path="resources" component={ResourcesPage} />
          <Route path="contact" component={Contact} />
          <Route path="auth" component={Auth} />
          <Route path="myprep" onEnter={requireAuth} component={Home} />
        </Route>

        <Route path="partners/:id" component={PartnerDetail} />
        <Route path="explore" component={ExplorePage} />
        <Route path="dashboard/:slug(/:tab)" component={DashboardsDetail} />
        <Route path="stories/:slug" component={InsightsDetail} />
        <Route path="dataset/:slug" component={DatasetDetail} />

        {/* Embed */}
        <Route path="export/explore" component={ExploreExportPage} />
        <Route path="embed/explore" component={ExploreEmbedPage} />
        <Route path="embed/nexgddp/:slug" component={NexGDDPEmbedPage} />
        <Route path="embed/:slug" component={Embed} />
      </Route>
    </Router>
  );
}

Routes.propTypes = { history: React.PropTypes.object.isRequired };

const mapStateToProps = () => ({});
const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
