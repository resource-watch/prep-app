import React from 'react';
import { Link } from 'react-router';
import { logEvent } from 'helpers/analytics';
import DemoSlider from '../demo-slider/demo-slider-component';
import PartnersSlider from '../../containers/PartnersSlider';

const module1 = '/images/home/module-1.jpg';
const module2 = '/images/home/module-2.jpg';
const module3 = '/images/home/module-3.jpg';

const Home = () => (
  <div className="c-homepage">
    <section className="">
      <DemoSlider offset>
        <div>
          <article className="demo-slider-slide">
            <img src={module1} alt="Explore" className="hero-image" />
            <div className="slide-content">
              <h2 className="-left">Explore the data</h2>
              <p>Discover and interact with climate, physical and socioeconomic data. Filter
              by topic, geography and time period to create a custom map in seconds. Then
              share your findings to raise awareness in your community.
              </p>
              <Link to="/explore" className="c-button -border" onClick={() => logEvent('Home', 'Click carousel CTA', 'Start exploring')}>
                Start exploring
              </Link>
            </div>
          </article>
        </div>
        <div>
          <article className="demo-slider-slide">
            <img src={module2} alt="Dashboards" className="hero-image" />
            <div className="slide-content">
              <h2 className="-left">Assemble information</h2>
              <p>Dashboards are a collection of data and tools that users compile
              to support their climate resilience and preparedness planning. View
              dashboards that others have created, or create your own to track
              key issues in your area.
              </p>
              <Link to="/dashboards" className="c-button -border" onClick={() => logEvent('Home', 'Click carousel CTA', 'Go to dashboards')}>
                Go to dashboards
              </Link>
            </div>
          </article>
        </div>
        <div>
          <article className="demo-slider-slide">
            <img src={module3} alt="Resources" className="hero-image" />
            <div className="slide-content">
              <h2 className="-left">Finding resources</h2>
              <p>Find selected resources for understanding the impacts of climate
              change, tools for building resilience to climate change, and
              additional climate relevant data.
              </p>
              <Link to="/resources" className="c-button -border" onClick={() => logEvent('Home', 'Click carousel CTA', 'Go to resources')}>
                Go to resources
              </Link>
            </div>
          </article>
        </div>
      </DemoSlider>
    </section>
    <section className="c-article -no-border">
      <div className="row align-center">
        <div className="column small-12 medium-8">
          <h2>About the partnership</h2>
          <p>The Partnership for Resilience and Preparedness (PREP) is a
          public-private collaboration launched in September 2016 that
          seeks to improve access to useful data and empower communities
          and businesses to better plan for and build climate resilience.
          There are two key elements to PREP: the partnership itself and
          the online platform it supports (PREPdata).
          </p>
          <div className="article-footer">
            <Link to="/about" className="c-button -border" >
                Learn more
            </Link>
          </div>
        </div>
      </div>
    </section>
    <PartnersSlider thumbnail />
  </div>
);

export default Home;
