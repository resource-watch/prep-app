import React from 'react';
import { Link } from 'react-router';
import MainNav from '../../components/Navigation/MainNav';
import logoImage from '../../images/preplogo@2x.png';

function Header() {
  return (
    <header className="c-header">
      <div className="row">
        <div className="column small-10 medium-4">
          <Link to={"/"}>
            <img src={logoImage} alt="Partnership for Resilience and Preparedness" />
          </Link>
        </div>
        <div className="column small-2 medium-8">
          <MainNav />
        </div>
      </div>
    </header>
  );
}

export default Header;
