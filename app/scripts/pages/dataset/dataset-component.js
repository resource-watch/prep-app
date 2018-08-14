import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
// import WidgetEditor, { modalActions, SaveWidgetModal, VegaChart } from 'widget-editor';
import WidgetEditor from './dataset-widget-editor';
import ReactMarkdown from 'react-markdown';

import TooltipTether from 'components/Tooltip/TooltipTether';
import SecondaryNav from 'layout/navigation/SecondaryNav';
import SocialNav from 'layout/navigation/SocialNav';
import MainNav from 'layout/navigation/MainNav';
import Banner from 'components/Banner';

import SectionIntro from 'components/SectionIntro';
import { getData, getDownloadUrl } from './dataset-helpers';
import PartnersSlider from '../../containers/PartnersSlider';
import MetadataInfo from './dataset-metadata-component';
import SimpleMap from 'containers/SimpleMap/SimpleMap';
import LoadingSpinner from 'components/Loading/LoadingSpinner';

import NexGDDPTool from 'components/nexgddp-tool/NexGDDPTool';
import LOCATool from 'components/loca-tool';

const logoImage = '/images/prep-logo.png';

class DatasetPage extends PureComponent {
  static propTypes = {
    /**
     * Define the function to get the datataset detail data
     */
    fetchDataset: PropTypes.func.isRequired,
    /**
     * Define the dataset data
     */
    data: PropTypes.any,
    /**
     * Define the dataset widget
     */
    widgets: PropTypes.array,

    // REDUX
    toggleModal: PropTypes.func
  }

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
    const { name, description } = metadata;

    // Page title
    document.title = name;

    // Widgets
    const defaultEditableWidget = dataset.widget.find(w => w.defaultEditableWidget === true);

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
              <h1>{name}</h1>
            </Banner>
          </div>
        </header>

        <div className="l-main">
          {(isFetching) ?
            <LoadingSpinner /> :
            <div>
              <SectionIntro
                data={dataset}
                downloadUrl={getDownloadUrl(dataset)}
                currentSection={currentSection}
              >
                <div className="c-article">
                  <ReactMarkdown source={description} className="c-markdown" />
                </div>
              </SectionIntro>

              {(dataset.id && dataset.provider === 'loca') &&
                <div className="row">
                  <div className="columns small-12">
                    <LOCATool dataset={dataset} />
                  </div>
                </div>}

              {(dataset.id && dataset.provider === 'nexgddp') &&
                <div className="row">
                  <div className="columns small-12">
                    <NexGDDPTool dataset={dataset} />
                  </div>
                </div>}

              {(dataset.id && dataset.provider !== 'nexgddp' && dataset.provider !== 'loca') &&
                <WidgetEditor />
              }

              <div className="row align-center">
                <div className="columns small-12 medium-8">
                  <div className="c-article">
                    <h3>More info</h3>
                    <MetadataInfo dataset={dataset} />
                  </div>
                </div>
              </div>
            </div>
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

export default DatasetPage;
