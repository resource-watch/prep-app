import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import URI from 'urijs';
import { connect } from 'react-redux';
import WidgetEditor, { modalActions, SaveWidgetModal, VegaChart } from 'widget-editor';
import ReactMarkdown from 'react-markdown';
import { wriAPISerializer } from 'helpers/wri-api-serializer';

import TooltipTether from 'components/Tooltip/TooltipTether';
import metadata from '../../metadata.json';
import PartnersSlider from '../../containers/PartnersSlider';
import SecondaryNav from '../../components/Navigation/SecondaryNav';
import SocialNav from '../../components/Navigation/SocialNav';
import MainNav from '../../components/Navigation/MainNav';
import Banner from '../../components/Banner';

import SectionIntro from '../SectionIntro';
import MetadataInfo from './MetadataInfo';
import SimpleMap from '../../containers/SimpleMap/SimpleMap';
import LoadingSpinner from '../Loading/LoadingSpinner';

import NexGDDPTool from '../nexgddp-tool/NexGDDPTool';
import LOCATool from '../loca-tool';

const logoImage = '/images/prep-logo.png';

class DatasetDetail extends React.Component {
  static getData(key, value) {
    let data = null;
    for (let i = metadata.length - 1; i >= 0; i--) {
      if (value.indexOf(metadata[i][key]) > -1) {
        data = metadata[i];
        break;
      }
    }
    return data;
  }

  static getDownloadUrl(data) {
    let url = null;
    let metadataUrl = null;
    if (data.metadata && data.metadata.length &&
        data.metadata[0].attributes.info.data_download) {
      metadataUrl = data.metadata[0].attributes.info.data_download;
    }
    switch (data.provider) {
      case 'cartodb':
        if (data && data.connectorUrl && data.connectorUrl.indexOf('tables') === -1) {
          const uri = new URI(data.connectorUrl);
          uri.search({ format: 'csv' });
          url = uri.toString();
        } else {
          url = data.connectorUrl;
        }
        break;
      default:
        url = metadataUrl;
    }
    return url;
  }

  componentDidMount() {
    if (!this.props.data || !this.props.widgets.length) {
      this.props.getDatasetData(this.props.datasetSlug);
    }
  }

  componentWillUnmount() {
    if (this.props.data) this.setState({ data: {} });
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
    const pathname = this.props.location.pathname;
    const currentData = DatasetDetail.getData('pathname', pathname);
    return currentData;
  }

  getContent() {
    if (!this.props.data) {
      return <LoadingSpinner />;
    }

    const metaData = this.props.data.metadata && this.props.data.metadata.length ?
      this.props.data.metadata[0].attributes : {
        id: this.props.data.id,
        attributes: {
          title: this.props.data.name,
          message: 'Content cooming soon'
        }
      };
    const data = this.props.data.metadata && this.props.data.metadata.length > 0
      ? this.props.data.metadata[0].attributes.info
      : {
        id: this.props.data.id,
        attributes: {
          title: this.props.data.name,
          message: 'Content cooming soon'
        }
      };

    const widgetComponents = [];
    const widgets = this.props.data.widget;
    if (widgets && widgets.length) {
      for (let i = 0, wLength = widgets.length; i < wLength; i++) {
        const widget = widgets[i].attributes;
        if (widget.widget_config) {
          switch (widget.widget_config.type) {
            case 'map':
              widgetComponents.push(<div className="c-article" key={i} ><SimpleMap layerId={widget.widget_config.layer_id} /></div>);
              break;
            default:
              widgetComponents.push(<div className="c-article" key={i} ><VegaChart data={widget.widget_config} reloadOnResize /></div>);
              break;
          }
        }
      }
    }

    const currentSection = this.props.location.state && this.props.location.state.prevPath || 'explore';

    const dataset = this.props.data;
    const datasetSpec = {
      ...dataset,
      metadata: dataset.metadata.map(m => ({
        ...m,
        ...m.attributes
      }))
    };

    return (
      <div>
        <SectionIntro data={data} downloadUrl={DatasetDetail.getDownloadUrl(this.props.data)} currentSection={currentSection} >
          <div className="c-article">
            <ReactMarkdown source={data.description || metaData.description} className="c-markdown" />
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
          <WidgetEditor
            datasetId={dataset.id}
            embedButtonMode="never"
            mapConfig={{ zoom: 3, lat: 40.65, lng: -98.21 }}
            provideWidgetConfig={(func) => { this.getWidgetConfig = func; }}
            onSave={() => this.onSaveWidget()}
          />
        }

        <div className="row align-center">
          <div className="columns small-12 medium-8">
            <div className="c-article">
              <h3>More info</h3>
              <MetadataInfo dataset={datasetSpec} />
            </div>
          </div>
        </div>

        {/*
          (widgetComponents && widgetComponents.length) ?
            <div className="row">
              <div className="columns small-12">
                {widgetComponents}
              </div>
            </div>
          : null
        */}
      </div>
    );
  }

  render() {
    const data = this.props.data ? this.props.data : {};

    if (!data || !data.id) return null;

    const currentData = this.getCurrentData();
    const dataMetadata = data.metadata && data.metadata.length ? data.metadata : null;
    const title = dataMetadata && dataMetadata[0].attributes.info && dataMetadata[0].attributes.info.technical_title ?
      dataMetadata[0].attributes.info.technical_title :
      data.name;

    document.title = title;

    const content = this.getContent();

    return (
      <div>
        <header className="l-header">
          <div className={`l-header-nav ${currentData.name === 'home' ? '-no-bg' : ''}`}>
            <div className="row align-middle">
              <div className="column small-10 medium-4">
                <Link to={'/'} className="logo">
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
              <h1>{title}</h1>
            </Banner>
          </div>
        </header>

        <div className="l-main">
          {content}
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

DatasetDetail.propTypes = {
  /**
   * Define the route path (from the router)
   */
  location: PropTypes.object,
  /**
   * Define the slug of the dataset
   */
  datasetSlug: PropTypes.string.isRequired,
  /**
   * Define the function to get the datataset detail data
   */
  getDatasetData: PropTypes.func.isRequired,
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
};

DatasetDetail.defaultProps = {
  data: {}
};

const mapDispatchToProps = dispatch => ({
  toggleModal: (...params) => dispatch(modalActions.toggleModal(...params))
});

export default connect(null, mapDispatchToProps)(DatasetDetail);
