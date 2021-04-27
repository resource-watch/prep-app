import React from 'react';
import { Link } from 'react-router';

// Components
import Article from '../../components/Content/Article';
import Icon from '../../components/ui/Icon';
import HowToNav from 'components/how-to-nav';
import { HOW_TO_SECTIONS } from '../../general-constants/general';

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
                  <Link to="/" className="c-button -alternative -action">
                    <Icon name="icon-arrow-left" className="-medium" />
                    Home
                  </Link>
                </div>
                {/* <div className="action">
                  <a href="#" className="c-button -alternative -action">
                    <Icon name="icon-share" className="-medium" />
                    Share
                  </a>
                </div> */}
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
                  <p>
                    To get started, create a MyPREP account. Login with your Facebook, Google, or Twitter account.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Article>
        <HowToNav anchor />
        <Article grid="small-12">
          <h2>
            With PREPdata, you can
          </h2>
          <div className="how-to-wrapper">
            <div className="row align-center">
              <div className="column small-12 medium-6">
                <h3 id={HOW_TO_SECTIONS[0].slug}>
                  Discover Data
                </h3>
                <p>
                  Search for climate, physical, and socioeconomic data on Explore.
                  Create and share beautiful map visualizations and overlays.
                </p>
                <Link to="/explore">
                  See Data
                </Link>
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
                <h3 id={HOW_TO_SECTIONS[1].slug}>
                  Explore Climate Projections for Your Geography
                </h3>
                <p>
                  PREPdata offers two sets of downscaled climate projections: NASA
                  Earth Exchange Global Daily Downscaled Projections (NEX-GDDP) for
                  the globe and the Localized Constructed Analogs (LOCA) for the
                  United States. Explore climate indicators like Cumulative
                  Precipitation and Extreme Heat Days and query the dataset to
                  determine how each indicator is projected to change for any point
                  you’re interested in.
                </p>
                <Link to="/explore?basemap=default&bbox&boundaries=false&filterQuery=NEX&labels=none&lat=48.46038&lng=-123.889823&location=global&minZoom=3&tab=all_datasets&water=none&zoom=3">
                  EXPLORE THE NEX-GDDP DATA
                </Link>
                <Link to="/explore?basemap=default&bbox&boundaries=false&filterQuery=Pierce+et+al.&labels=none&lat=48.46038&lng=-123.889823&location=global&minZoom=3&tab=all_datasets&water=none&zoom=3">
                  EXPLORE THE LOCA DATA
                </Link>
              </div>
            </div>
          </div>
          <div className="how-to-wrapper">
            <div className="row align-center">
              <div className="column small-12 medium-6">
                <h3 id={HOW_TO_SECTIONS[2].slug}>
                  Upload Your Own Data and Create Visualizations
                </h3>
                <p>
                  Supplement the curated data available on PREPdata with your own
                  local data. If you’d like to see a specific dataset available on
                  Explore, you can request it. Create custom maps, graphs, and
                  charts using PREPdata’s visualization creator. Share your
                  visualizations on your own website or add them to your custom
                  dashboard.
                </p>
                <Link to="/myprep">
                  See my prep
                </Link>
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
                <h3 id={HOW_TO_SECTIONS[3].slug}>
                  Create Personalized Dashboards
                </h3>
                <p>
                  Collect data, maps, tools, and stories relevant to you and your
                  community in one place. Track indicators most relevant to your
                  needs. Create your own dashboard containing dynamic resources
                  specific to your own geographic or topical area of interest and
                  see what data similar communities are using to build resilience
                  around the world.
                </p>
                <a href="/dashboards/sample-dashboard-landslides-in-western-south-america">
                  SEE A SAMPLE USER DASHBOARD
                </a>
              </div>
            </div>
          </div>
          <div className="how-to-wrapper">
            <div className="row align-center">
              <div className="column small-12 medium-6">
                <h3 id={HOW_TO_SECTIONS[4].slug}>
                  Share Your Content
                </h3>
                <p>
                  Supplement the curated data available on PREPdata with your own
                  local data. If you’d like to see a specific dataset available on
                  Explore, you can request it. Create custom maps, graphs, and
                  charts using PREPdata’s visualization creator. Share your
                  visualizations on your own website or add them to your custom
                  dashboard.
                </p>
                <a href="/myprep">
                  See my prep
                </a>
              </div>
              <div className="column small-12 medium-6">
                <img src={shareImg} alt="Discover data" />
              </div>
            </div>
          </div>
        </Article>
      </div>
    );
  }
}

export default HowTo;
