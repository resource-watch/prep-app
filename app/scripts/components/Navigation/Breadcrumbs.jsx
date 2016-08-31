import React from 'react';
import { Link } from 'react-router';

function Breadcrumbs(props) {
  const patnames = props.pathname.split('/').filter((item) => item !== '');
  let route = '/';
  return (
    patnames.length
    ? <div className="l-breadcrumbs">
      <div className="row">
        <div className="column small-12">
          <nav className="c-breadcrumbs">
            <ul>
              <li key="home"> <Link to={route}>Home</Link> </li>
              {patnames.map((item, index) => {
                let itemName = item;
                let routeTemp = false;
                if (item === 'dashboard') {
                  itemName = 'dashboards';
                  routeTemp = `/${itemName}`;
                }
                if (item === 'insight') {
                  itemName = 'insights';
                  routeTemp = `/${itemName}`;
                }
                route += `${item}/`;
                return <li key={index}> <Link to={routeTemp ? routeTemp : route}>{itemName.replace(/-/g, ' ')}</Link> </li>;
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
    : null
  );
}

Breadcrumbs.propTypes = {
  pathname: React.PropTypes.any.isRequired
};

export default Breadcrumbs;
