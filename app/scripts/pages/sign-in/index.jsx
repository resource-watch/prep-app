import React from 'react';
import { Link } from 'react-router';

// utils
import { logEvent } from 'helpers/analytics';

// components
import MainNav from '../../layout/navigation/MainNav';
import Banner from '../../components/Banner';
import PartnersSlider from '../../containers/PartnersSlider';
import SecondaryNav from '../../layout/navigation/SecondaryNav';
import SocialNav from '../../layout/navigation/SocialNav';

// styles
import './styles.scss';

/**
 * Event handler executed when the user clicks one
 * of the social media links
 * @param {MouseEvent} e Event
 */
const onClickLink = (e) => { // eslint-disable-line class-methods-use-this
  e.preventDefault();
  logEvent('User account', 'Create an account', e.target.innerText);
  window.location = e.target.href;
}

const SignInPage = () => (
  <div className="l-sign-in">
    <header className="l-header -float">
      <div className="l-header-nav">
        <div className="row align-middle">
          <div className="column small-10 medium-4">
            <Link to="/" className="logo">
              <img
                src="/images/prep-logo.png"
                alt="Partnership for Resilience and Preparedness"
              />
            </Link>
          </div>
          <div className="column small-2 medium-8">
            <MainNav />
          </div>
        </div>
      </div>
    </header>

    <Banner
      bg="home"
      size="big"
    />

    <div className="sign-in-container">
      <div className="sign-in-content">
        <h2>
          Sign in
        </h2>
        <div className="social-btn-container">
          <ul className="social-btn-list">
            <li className="social-btn-item">
              <a
                href={`${process.env.RW_API_LOGIN_URL}/google?callbackUrl=${process.env.CALLBACK_URL}&origin=${process.env.APPLICATIONS}&token=true&applications=prep`}
                className="c-button -google"
                onClick={onClickLink}
              >
                Google
              </a>
            </li>
            <li className="social-btn-item">
              <a
                href={`${process.env.RW_API_LOGIN_URL}/facebook?callbackUrl=${process.env.CALLBACK_URL}&origin=${process.env.APPLICATIONS}&token=true&applications=prep`}
                className="c-button -facebook"
                onClick={onClickLink}
              >
                facebook
              </a>
            </li>
            <li className="social-btn-item">
              <a
                href={`${process.env.RW_API_LOGIN_URL}/twitter?callbackUrl=${process.env.CALLBACK_URL}&origin=${process.env.APPLICATIONS}&token=true&applications=prep`}
                className="c-button -twitter"
                onClick={onClickLink}
              >
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>
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
            <div className="footer-sep-item" />
          </div>
        </div>
      </div>
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

export default SignInPage;
