import React from 'react';
import { connect } from 'react-redux';
import useScroll from 'react-router-scroll';
import { IndexRoute, Router, Route, applyRouterMiddleware } from 'react-router';

import App from './components/App';
import Home from './components/Home';
import Partnership from './components/Partnership';
import EngagementWorkgroup from './components/Partnership/EngagementWorkgroup';
import DataAccessibility from './components/Partnership/DataAccessibility';
import Explore from './containers/Explore';
import DatasetDetail from './containers/Dataset';
import About from './components/About';
import FAQ from './components/FAQ';
import Dashboards from './containers/Dashboards';
import DashboardsDetail from './containers/Dashboards/DashboardDetail';
import Insights from './containers/Insights';
import InsightsDetail from './containers/Insights/InsightDetail';
import Embed from './containers/Embed';


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
    /\/insights\/((?:[A-z]|[1-9]|-)+)/
  ];

  for (let i = 0, j = regexes.length; i < j; i++) {
    if (isSamePage(regexes[i])) {
      return false;
    }
  }

  return true;
}

function Routes(props) {
  return (
    <Router
      history={props.history}
      render={applyRouterMiddleware(useScroll(shouldUpdateScroll))}
    >
      <Route path={'/'} component={App}>
        <IndexRoute component={Home} />
        <Route path={'partnership'}>
          <IndexRoute component={Partnership} />
          <Route path={'engagement'} component={EngagementWorkgroup} />
          <Route path={'data'} component={DataAccessibility} />
          <Route path={'platforms'} component={DataAccessibility} />
        </Route>
        <Route path={'about'} component={About} />
        <Route path={'faqs'} component={FAQ} />
        <Route path={'dashboards'} component={Dashboards} />
        <Route path={'insights'} component={Insights} />
      </Route>
      <Route path="explore(/:lat)(/:lng)(/:zoom)" component={Explore} />
      <Route path="dashboard/:slug(/:tab)" component={DashboardsDetail} />
      <Route path="insight/:slug" component={InsightsDetail} />
      <Route path="dataset/:slug" component={DatasetDetail} />
      <Route path="embed/:slug" component={Embed} />
    </Router>
  );
}

Routes.propTypes = {
  history: React.PropTypes.object.isRequired
};

const mapStateToProps = () => ({});
const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
