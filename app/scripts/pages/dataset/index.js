import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import URI from 'urijs';
import { connect } from 'react-redux';
import WidgetEditor, { modalActions, SaveWidgetModal, VegaChart } from 'widget-editor';

import metadata from '../../metadata.json';
import PartnersSlider from '../../containers/PartnersSlider';
import SecondaryNav from '../../components/Navigation/SecondaryNav';
import SocialNav from '../../components/Navigation/SocialNav';
import MainNav from '../../components/Navigation/MainNav';
import Banner from '../../components/Banner';

import SectionIntro from '../SectionIntro';
import MetadataInfo from '../Explore/MetadataInfo';
import SimpleMap from '../../containers/SimpleMap/SimpleMap';
import LoadingSpinner from '../Loading/LoadingSpinner';

import NexGDDPTool from '../nexgddp-tool/NexGDDPTool';

const logoImage = '/images/prep-logo.png';
const nexGDDPDatasets = [
  'a0a6d98f-3cce-4a9c-b07e-ba735d1d985b',
  'aaadd6c3-93ea-44bc-ba8b-7af3f40d39e1',
  'b61fca59-707c-47f8-875c-9ac19313d193',
  '0a9501d7-e2f1-46ef-922d-c8f161cc8153',
  '4dbebe70-67a0-4bb5-ac63-88f325d8ca40',
  'bbf2957f-55d2-4ed1-9f9d-d62de88005bb',
  'df0aabe8-0ef2-4a81-bdba-c6fc6767fde9',
  'eadf93a6-58e7-4482-89d6-c9832d270a87',
  'f5152f7b-757b-4e09-98d2-e244f547fec8',
  '2b89fe50-6795-426d-b357-df952b04294b',
  '999fc1b8-e7aa-4e53-b291-8da47417acd1',
  'efee89ae-584a-409f-b35e-7841d1ce9c5d',
  '3cfc8e33-8778-40f8-a123-36d299dcaaab',
  '648650c1-01d8-44c5-bd36-ed0ce93c0351',
  '0b79aad3-7df6-4e38-be87-998b3d4cf62e',
  '5c41493a-9ead-463e-b2b8-9a8bc419229b',
  '1f596326-e5e7-484a-9d1f-572d21b9924d',
  'c231e5fb-7bbc-4279-a21a-b7ff5679fafe',
  '6d3dd62f-d3b8-440a-8cd2-c1087033b416',
  '61f5e1e6-22d7-4fac-825b-d1df4d1ea841',
  'f90f8d3d-72dc-4c89-b0b8-77cc89056a44',
  'ffdf001f-b86c-4d60-8f2a-66d504d7bf39',
  'a507f91c-801b-498b-a087-ab5c3e7498c7',
  '546bf818-0857-474f-892d-25bf7253f2e3',
  'ae2b3597-1902-41fc-b0cb-fa1a0629303a',
  '222e109f-5e1a-43b2-89ef-27ebc79931a1',
  'c4e7780c-2c47-4828-9c72-82240c9e37e9',
  'ce774800-be58-4ce9-a81a-e296dfe25ab3',
  '659377ad-4014-4415-8e43-63357541c8e8',
  '4ede1cfb-4c26-4f0d-8fa0-055a6f07426c',
  'a8aaae69-47ec-4117-bdfb-841c64e62d36',
  'e156293c-95a9-4f72-96b1-8313cd5d6073',
  'e30b788f-08f0-48cd-a254-b26c0c022447',
  '57670934-4851-47fe-ad85-17e2b97f027f',
  '24a64759-c823-41cd-902d-fcce00f7864d',
  'f44d707e-7a1b-4dda-ade0-b51c0398f0ea',
  '17d07d93-7b2a-4a1e-b285-3af903f6ee2d',
  '8fee450f-a625-4e15-8541-f84de6205b4e',
  'a92b3919-19f2-4431-8c0c-8ddc91ad0168',
  '6b158f1e-0794-465a-95a3-94019b6154ce'
];

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
    return (
      <div>
        <SectionIntro data={data} downloadUrl={DatasetDetail.getDownloadUrl(this.props.data)} currentSection={currentSection} >
          <MetadataInfo data={this.props.data} />
        </SectionIntro>

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
      <div className="-theme-2">
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

          {(data.id && nexGDDPDatasets.includes(data.id)) ?
            <div className="row">
              <div className="columns small-12">
                <NexGDDPTool />
              </div>
            </div> :
            <WidgetEditor
              datasetId={data.id}
              embedButtonMode="never"
              mapConfig={{ zoom: 3, lat: 40.65, lng: -98.21 }}
              provideWidgetConfig={(func) => { this.getWidgetConfig = func; }}
              onSave={() => this.onSaveWidget()}
            />
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
