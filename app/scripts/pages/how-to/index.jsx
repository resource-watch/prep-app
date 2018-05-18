import React from 'react';
import { Link } from 'react-router';

// Components
import Article from '../../components/Content/Article';
import Icon from '../../components/ui/Icon';
import ContactForm from '../../components/ContactForm';

const discoverImg = '/images/how-to/img-discover.png';
const exploreImg = '/images/how-to/img-explore.png';
const uploadImg = '/images/how-to/img-upload.png';
const createImg = '/images/how-to/img-create.png';
const shareImg = '/images/how-to/img-share.png';


class HowTo extends React.PureComponent {
  render() {
    return (
      <div className="l-how-to">
        <div className="sliced" />
        <Article>
          <div className="row align-center">
            <div className="column small-12">
              <div className="c-toolbar-actions">
                <div className="action">
                  <Link to="/about" className="c-button -alternative -action">
                    <Icon name="icon-arrow-left" className="-medium" />
                    About
                  </Link>
                </div>
                <div className="action">
                  <a href="#" className="c-button -alternative -action">
                    <Icon name="icon-share" className="-medium" />
                    Share
                  </a>
                </div>
              </div>
            </div>
          </div>
          <p>
            PREPdata enables users to create personalized dashboards of climate
            risks that combine top-down data with local information. Upload
            your own data or pull in data from authoritative global sources
            through the platform, save your favorite datasets, build a
            dashboard of indicators, share your content, and learn from other
            PREPdata users.
          </p>
          <div className="row align-center">
            <div className="column small-12">
              <div className="c-card -border -border-neutral">
                <div className="how-to-card">
                  <Icon name="icon-user" className="-extra-large how-to-icon" />
                  <p>To get started, create a MyPREP account. Login with your Facebook, Google, or Twitter account.</p>
                </div>
              </div>
            </div>
          </div>
        </Article>
        <Article grid="small-12">
          <h2>With PREPdata, you can</h2>
          <div className="how-to-wrapper">
            <div className="row align-center">
              <div className="column small-12 medium-6">
                <h3>Discover Data</h3>
                <p>
                  Search for climate, physical, and socioeconomic data on Explore.
                  Create and share beautiful map visualizations and overlays.
                </p>
                <Link to="/explore">See Data</Link>
              </div>
              <div className="column small-12 medium-6">
                <img src={discoverImg} alt="Discover data" />
              </div>
            </div>
          </div>
          <div className="how-to-wrapper">
            <div className="row align-center">
              <div className="column small-12 medium-6">
                <img src={exploreImg} alt="Discover data" />
              </div>
              <div className="column small-12 medium-6">
                <h3>Explore Climate Projections for Your Geography</h3>
                <p>
                  PREPdata offers two sets of downscaled climate projections: NASA
                  Earth Exchange Global Daily Downscaled Projections (NEX-GDDP) for
                  the globe and the Localized Constructed Analogs (LOCA) for the
                  United States. Explore climate indicators like Cumulative
                  Precipitation and Extreme Heat Days and query the dataset to
                  determine how each indicator is projected to change for any point
                  you’re interested in.
                </p>
                <Link to="/explore">EXPLORE THE NEX-GDDP DATA</Link>
                <Link to="/explore">EXPLORE THE LOCA DATA</Link>
              </div>
            </div>
          </div>
          <div className="how-to-wrapper">
            <div className="row align-center">
              <div className="column small-12 medium-6">
                <h3>Upload Your Own Data and Create Visualizations</h3>
                <p>
                  Supplement the curated data available on PREPdata with your own
                  local data. If you’d like to see a specific dataset available on
                  Explore, you can request it. Create custom maps, graphs, and
                  charts using PREPdata’s visualization creator. Share your
                  visualizations on your own website or add them to your custom
                  dashboard.
                </p>
                <Link to="/myprep">See my prep</Link>
              </div>
              <div className="column small-12 medium-6">
                <img src={uploadImg} alt="Discover data" />
              </div>
            </div>
          </div>
          <div className="how-to-wrapper">
            <div className="row align-center">
              <div className="column small-12 medium-6">
                <img src={createImg} alt="Personalised dashboards" />
              </div>
              <div className="column small-12 medium-6">
                <h3>Create Personalized Dashboards</h3>
                <p>
                  Collect data, maps, tools, and stories relevant to you and your
                  community in one place. Track indicators most relevant to your
                  needs. Create your own dashboard containing dynamic resources
                  specific to your own geographic or topical area of interest and
                  see what data similar communities are using to build resilience
                  around the world.
                </p>
                <Link to="/dashboards">SEE A SAMPLE USER DASHBOARD</Link>
              </div>
            </div>
          </div>
          <div className="how-to-wrapper">
            <div className="row align-center">
              <div className="column small-12 medium-6">
                <h3>Share Your Content</h3>
                <p>
                  Supplement the curated data available on PREPdata with your own
                  local data. If you’d like to see a specific dataset available on
                  Explore, you can request it. Create custom maps, graphs, and
                  charts using PREPdata’s visualization creator. Share your
                  visualizations on your own website or add them to your custom
                  dashboard.
                </p>
                <Link to="/dashboards">Know more</Link>
              </div>
              <div className="column small-12 medium-6">
                <img src={shareImg} alt="Discover data" />
              </div>
            </div>
          </div>
        </Article>
        <Article grid="small-12">
          <h2>Resources to Help You Use PREPdata</h2>
          <div className="cards">
            <div className="row">
              <div className="column small-12 medium-4">
                <div className="c-card -border -border-neutral">
                  <h3>Introduction to PREPdata</h3>
                  <p>Lorem ipsum dolor sit amet, conse etur adipiscing elit.Nullam id nibh tricies.</p>
                  <a href="#">EXPLORE PREP’S DATA</a>
                </div>
              </div>
              <div className="column small-12 medium-4">
                <div className="c-card -border -border-neutral">
                  <h3>Explore the Data</h3>
                  <p>Lorem ipsum dolor sit amet, conse etur adipiscing elit.Nullam id nibh tricies.</p>
                  <a href="#">EXPLORE PREP’S DATA</a>
                </div>
              </div>
              <div className="column small-12 medium-4">
                <div className="c-card -border -border-neutral">
                  <h3>Make a PREPdata account</h3>
                  <p>Lorem ipsum dolor sit amet, conse etur adipiscing elit.Nullam id nibh tricies.</p>
                  <span className="link-placeholder">COMING SOON!</span>
                </div>
              </div>
              <div className="column small-12 medium-4">
                <div className="c-card -border -border-neutral">
                  <h3>Custom visualizations</h3>
                  <p>Upload your own data and create custom visualizations.</p>
                  <span className="link-placeholder">COMING SOON!</span>
                </div>
              </div>
              <div className="column small-12 medium-4">
                <div className="c-card -border -border-neutral">
                  <h3>Areas of interest</h3>
                  <p>Explore climate projections for your area of interest.</p>
                  <span className="link-placeholder">COMING SOON!</span>
                </div>
              </div>
              <div className="column small-12 medium-4">
                <div className="c-card -border -border-neutral">
                  <h3>Dashboards builder</h3>
                  <p>Create a dashboard to track the climate resilience indicators you’re most interested in.</p>
                  <span className="link-placeholder">COMING SOON!</span>
                </div>
              </div>
            </div>
          </div>
        </Article>
      </div>
    );
  }
}

export default HowTo;
