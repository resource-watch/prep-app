import React from 'react';
import Form from '../Form';
import Article from '../Content/Article';

import shareData from '../../../images/create/shareData.png';
import communicate from '../../../images/create/communicate.png';
import dashboards from '../../../images/create/dashboards.png';


class Create extends React.Component {

  render() {
    return (
      <div className="c-partnership">
        <div className="sliced"></div>

        <article className="c-article">
          <div className="row align-center">
            <div className="column small-12 medium-8">
              <p>The next phase of the PREP platform will enable users to create personalized dashboards of climate risks that combine top-down data with local information, Users will be able to find, share, and bring together the most relevant climate-relevant data from different sources and formats in one place.  They will be able to manage this information on their own customized dashboard, tell interactive data-driven stories about risks and resilience, and share with, and learn from peers and user groups.
              </p>
              <p>The customization feature is currently under development, but a sneak peek is provided below of how it will work.</p>
            </div>
          </div>
        </article>

        <article className="c-article">
          <div className="row align-center">
            <div className="column small-12 medium-8">
              <h2>PREP is designed to</h2>
              <p>The next phase of the PREP platform will enable individuals from government, civil society, or the private sector to:</p>
            </div>
          </div>

          <div className="c-article-module">
            <div className="row">
              <div className="column align-middle small-12 medium-6">
                <h3>Share Data</h3>
                <p>Share datasets in a variety of formats and topics that will then be displayed and available to all users.
                </p>
                <p>Query and combine with data from other sources in the same plataform.</p>
                <a href="#">KNOW MORE</a>
              </div>

              <div className="column align-middle small-12 medium-6">
                <img src={shareData} alt="Share Data" />
              </div>
            </div>
          </div>

          <div className="c-article-module">
            <div className="row">
              <div className="column align-middle small-12 medium-6">
                <img src={communicate} alt="Communicate Insights" />
              </div>

              <div className="column align-middle small-12 medium-6">
                <h3>Communicate Insights</h3>
                <p>Choose from a range of open source tools to tell the story, share an insight about your data and how it can or is being used to inform and manage climate risks.</p>
                <a href="/insights">KNOW MORE</a>
              </div>
            </div>
          </div>

          <div className="c-article-module">
            <div className="row">
              <div className="column align-middle small-12 medium-6">
                <h3>Create personalized dashboards</h3>
                <p>Collect and manage the data, tools and insights that are most relevant for your community in one place. Create and share your own online dashboard containing data, information, tools, interactive stories and other dynamic resources specific to your own geographic or topical area of interest.</p>
                <p>Search for data on the explorer. Add aditional data sets.</p>
                <p>Look at what data, tools and insights, others are using if they are useful to you add them  to your collection and include them in your dashboard.</p>
                <a href="/dashboards">KNOW MORE</a>
              </div>

              <div className="column align-middle small-12 medium-6">
                <img src={dashboards} alt="Create personalized dashboards" />
              </div>
            </div>
          </div>
        </article>

        <article className="c-article">
          <div className="row align-center">
            <div className="column small-12 medium-8">
              <h2>Become a beta user contributor</h2>
              <p>Would you like to develop a dashboard? Or share a data insight?  Over the coming months we plan to work with communities around the globe to help them develop their own dashboards.  Please complete this form if you are interested in becoming a beta user or contributor</p>

              <Form type="Request access" />
            </div>
          </div>
        </article>
      </div>
    );
  }
}

export default Create;
