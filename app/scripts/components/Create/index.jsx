import React from 'react';
import { Link } from 'react-router';
import Form from '../Form';

import shareData from '../../../images/create/shareData.png';
import communicate from '../../../images/create/communicate.png';
import dashboards from '../../../images/create/dashboards.png';


function Create() {
  return (
    <div className="c-partnership">
      <div className="sliced" />

      <article className="c-article">
        <div className="row align-center">
          <div className="column small-12 medium-8">
            <h2>Find, collect and share climate-relevant data from different sources in one place
            </h2>
            <p>The next phase of the PREP platform will enable users to create personalized dashboards of climate risks that combine
              top-down data with local information. Upload your own data or pull in data from
              authoritative global sources, build a dashboard of indicators and interactive
              data-driven stories, and share with or learn from peers others.
            </p>
            <p>The customization feature is currently under development, see how it will work.
            </p>
          </div>
        </div>
      </article>

      <article className="c-article">
        <div className="row align-center">
          <div className="column small-12 medium-8">
            <h2>PREP is designed to</h2>
          </div>
        </div>

        <div className="c-article-module">
          <div className="row">
            <div className="column align-middle small-12 medium-6">
              <h3>Find Data and Tools</h3>
              <p>Search for climate-relevant data on the <Link to="explore">Explorer</Link> or
                upload your own data. Query and combine with data from other sources, and visualize
                them in the same platform. See what data similar communities are using to build
                resilience around the world.
              </p>
              <Link to="/explore"> See data </Link>
            </div>

            <div className="column align-middle small-12 medium-6">
              <img src={shareData} alt="Share Data" />
            </div>
          </div>
        </div>

        <div className="c-article-module">
          <div className="row">
            <div className="column align-middle small-12 medium-6">
              <img src={dashboards} alt="Create Personalized Dashboards" />
            </div>

            <div className="column align-middle small-12 medium-6">
              <h3>Create Personalized Dashboards</h3>
              <p>Collect data, tools, and stories relevant to you and your community in one place.
                Create and share your own online dashboard containing data, information, tools,
                 interactive stories, and other dynamic resources specific to your own geographic
                  or topical area of interest. Look at what data, tools, and stories others are using
                and add them to your dashboard. Get updates when datasets are added.
              </p>
              <Link to="/dashboards"> See dashboards </Link>
            </div>
          </div>
        </div>

        <div className="c-article-module">
          <div className="row">
            <div className="column align-middle small-12 medium-6">
              <h3>Share Stories</h3>
              <p>Choose from a range of open source tools to share a story about your data and
                how it can or is being used to inform and manage climate risk. Embed your dashboard
                or stories on your own website and share them with your community.
              </p>
              <Link to="/insights"> See stories </Link>
            </div>

            <div className="column align-middle small-12 medium-6">
              <img src={communicate} alt="See stories" />
            </div>
          </div>
        </div>
      </article>

      <article className="c-article">
        <div className="row align-center">
          <div className="column small-12 medium-8">
            <h2>Become a pilot user</h2>
            <p>Would you like to develop a dashboard? Or share stories from your community? Over
              the coming months we plan to work with communities around the globe to help them
              develop their own dashboards.</p>
            <p>We can only work with a few groups at this time. Let us know why you think you would
              be an ideal group to pilot the PREP Platform.</p>
            <Form type="Request access" />
          </div>
        </div>
      </article>
    </div>
  );
}

export default Create;
