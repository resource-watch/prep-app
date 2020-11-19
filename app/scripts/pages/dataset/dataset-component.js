import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import ReactMarkdown from 'react-markdown';

import TooltipTether from 'components/Tooltip/TooltipTether';
import SecondaryNav from 'layout/navigation/SecondaryNav';
import SocialNav from 'layout/navigation/SocialNav';
import MainNav from 'layout/navigation/MainNav';
import Banner from 'components/Banner';

import { NEXGDDPDatasetsGeeProvider } from 'pages/explore/core-datasets-list/core-datasets-list-constants';

import SectionIntro from 'components/SectionIntro';
import LoadingSpinner from 'components/Loading/LoadingSpinner';

import NexGDDPTool from 'components/nexgddp-tool/NexGDDPTool';
import NexGDDPGeeTool from 'components/nexgddp-gee-tool/NexGDDPGeeTool';
import LOCATool from 'components/loca-tool';

import { getData, getDownloadUrl } from './dataset-helpers';
import PartnersSlider from '../../containers/PartnersSlider';
import MetadataInfo from './dataset-metadata-component';
import WidgetEditor from './dataset-widget-editor';

const logoImage = '/images/prep-logo.png';

const EXCEPTIONS = {
  // Tidal stations
  '8f8e5d8d-a783-434b-b4fe-db4f10ced148': {
    src: '/embeds/high-tide-flooding'
  },

  '409b13ad-eee5-458b-8a26-ba0a17f2d226': {
    src: '/embeds/high-tide-flooding'
  },

  // Conus stations
  '038ff32e-9002-433b-bfaf-0db3be9294b4': {
    src: '/embeds/timeline-exceedance'
  },

  'dfda6a1f-77d4-4ba6-8514-0b567d049b34': {
    src: '/embeds/timeline-exceedance'
  },

  // Climate by location
  'f559c72b-81b0-466f-9ba5-977332860897': {
    src: '/embeds/climate-by-location'
  },
  '0323e372-f9c5-41ca-9d9e-502572634512': {
    src: '/embeds/climate-by-location'
  }
};


class DatasetPage extends PureComponent {

  componentDidMount() {
    const { routeParams } = this.props;
    this.props.fetchDataset(routeParams.slug);
  }

  /**
   * Callback executed when the user clicks the save button of
   * the widget editor
   */
  onSaveWidget() {
    if (this.getWidgetConfig) {
      this.props.toggleModal(true, {
        children: SaveWidgetModal,
        childrenProps: {
          datasetId: this.props.data.id,
          getWidgetConfig: this.getWidgetConfig,
          onClickCheckWidgets: () => {
            window.location = '/myprep/widgets/my_widgets';
          }
        }
      });
    }
  }

  getCurrentData() {
    const { pathname } = this.props.location;
    const currentData = getData('pathname', pathname);
    return currentData;
  }

  render() {
    const { dataset, isFetching, location } = this.props;

    if (!dataset || !dataset.id) return <LoadingSpinner />;

    const currentData = this.getCurrentData();
    const currentSection = (location.state && location.state.prevPath) || 'explore';

    // Metadata
    const metadata = dataset.metadata && dataset.metadata.length ? dataset.metadata[0] : {};
    const { name, description, info = {} } = metadata;
    const { description: infoDescription } = info;

    // Datasets types
    const NEXGDDPGeeProvider = NEXGDDPDatasetsGeeProvider.find(l => l === dataset.id);

    // Widget editor
    const isWidgetEditor = (dataset.id && dataset.provider !== 'nexgddp' && dataset.provider !== 'loca' && !EXCEPTIONS[dataset.id] && !NEXGDDPGeeProvider);

    // Page title
    document.title = name;

    // Render
    return (
      <div>
        <header className="l-header">
          <div className={`l-header-nav ${currentData.name === 'home' ? '-no-bg' : ''}`}>
            <div className="row align-middle">
              <div className="column small-10 medium-4">
                <Link to="/" className="logo">
                  <img src={logoImage} alt="Partnership for Resilience and Preparedness" />
                </Link>
              </div>
              <div className="column small-2 medium-8">
                <MainNav />
              </div>
            </div>
          </div>
          <div className="l-header-banner">
            <Banner
              bg={currentData.bannerBg}
              size={currentData.bannerSize}
            >
              <h1>
                {name}
              </h1>
            </Banner>
          </div>
        </header>

        <div className="l-main">
          {(isFetching) ?
            <LoadingSpinner /> :
            (
              <div>
                <SectionIntro
                  data={dataset}
                  downloadUrl={getDownloadUrl(dataset)}
                  currentSection={currentSection}
                >
                  <div className="c-article">
                    <ReactMarkdown source={description || infoDescription} className="c-markdown" />
                  </div>
                </SectionIntro>

                {(dataset.id && dataset.provider !== 'loca'
                  && !NEXGDDPGeeProvider) && (
                    <div className="row">
                      <div className="columns small-12">
                        <LOCATool dataset={dataset} />
                      </div>
                    </div>
                  )}

                {(dataset.id && dataset.provider === 'nexgddp'
                  && !NEXGDDPGeeProvider) && (
                    <div className="row">
                      <div className="columns small-12">
                        <NexGDDPTool dataset={dataset} />
                      </div>
                    </div>
                  )}

                {(NEXGDDPGeeProvider) && (
                  <div className="row">
                    <div className="columns small-12">
                      <NexGDDPGeeTool dataset={dataset} />
                    </div>
                  </div>
                )}

                {isWidgetEditor && (
                  <WidgetEditor />
                )}

                {!!EXCEPTIONS[dataset.id] && (
                  <div className="row">
                    <div className="columns small-12">
                      <iframe
                        style={{
                          width: '100%',
                          height: 400
                        }}
                        src={EXCEPTIONS[dataset.id].src}
                        title="embed-modal"
                        frameBorder="0"
                      />
                    </div>
                  </div>
                )}

                <div className="row align-center">
                  <div className="columns small-12 medium-8">
                    <div className="c-article">
                      <h3>
                        More info
                      </h3>
                      <MetadataInfo dataset={dataset} />
                    </div>
                  </div>
                </div>
              </div>
            )
          }
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
              <div className="column small-6 align-middle">
                <SocialNav />
              </div>
              <div className="column small-6 align-middle">
                <SecondaryNav />
              </div>
            </div>
          </div>
        </footer>

        <TooltipTether />
      </div>
    );
  }
}

DatasetPage.propTypes = {
  /**
   * Define the function to get the datataset detail data
   */
  fetchDataset: PropTypes.func.isRequired,
  /**
   * Define the dataset data
   */
  data: PropTypes.arrayOf([]),

  // REDUX
  toggleModal: PropTypes.func
};

DatasetPage.defaultProps = {
  data: [],
  toggleModal: () => {}
};

export default DatasetPage;
