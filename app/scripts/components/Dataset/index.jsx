import React from 'react';
import { Link } from 'react-router';
import URI from 'urijs';

import metadata from '../../metadata.json';
import PartnersSlider from '../../containers/PartnersSlider';
import SecondaryNav from '../../components/Navigation/SecondaryNav';
import SocialNav from '../../components/Navigation/SocialNav';
import MainNav from '../../components/Navigation/MainNav';
import Banner from '../../components/Banner';
import logoImage from '../../../images/prep-logo.png';

import SectionIntro from '../SectionIntro';
import MetadataList from '../Explore/MetadataList';
import VegaChart from '../Chart/VegaChart';
import SimpleMap from '../../containers/Map/SimpleMap';
import LoadingSpinner from '../Loading/LoadingSpinner';

import WidgetEditor from '../../editor/WidgetEditor';
import Icons from '../../editor/ui/Icons';
import Tooltip from '../../editor/ui/Tooltip';
import Modal from '../../editor/ui/Modal';

class DatasetDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
  }

  componentWillMount() {
    if (!this.props.data || !this.props.widgets.length) {
      this.props.getDatasetData(this.props.datasetSlug);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.modalOpen !== nextProps.modal.open) {
      this.setState({ modalOpen: nextProps.modal.open });
    }
  }

  getData(key, value) {
    let data = null;
    for (let i = metadata.length - 1; i >= 0; i--) {
      if (value.indexOf(metadata[i][key]) > -1) {
        data = metadata[i];
        break;
      }
    }
    return data;
  }

  getCurrentData() {
    const pathname = this.props.location.pathname;
    const currentData = this.getData('pathname', pathname);
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
    const { widgets } = this.props;
    if (widgets && widgets.length) {
      for (let i = 0, wLength = widgets.length; i < wLength; i++) {
        const widget = widgets[i].attributes;
        if (widget.widgetConfig) {
          switch (widget.widgetConfig.type) {
            case 'map':
              widgetComponents.push(<div className="c-article" key={i} ><SimpleMap layerId={widget.widgetConfig.layerId} /></div>);
              break;
            default:
              widgetComponents.push(<div className="c-article" key={i} ><VegaChart data={widget.widgetConfig} /></div>);
              break;
          }
        }
      }
    }

    const currentSection = (this.props.location.state && this.props.location.state.prevPath) || 'explore';
    return (
      <div>
        <SectionIntro data={data} downloadUrl={this.getDownloadUrl(this.props.data)} currentSection={currentSection} >
          <MetadataList data={this.props.data} />
        </SectionIntro>

        <div className="row">
          <div className="columns small-12">
            <WidgetEditor
              dataset={this.props.data.id}
              mode="dataset"
              showSaveButton={false}
              showNotLoggedInText
            />
          </div>
        </div>

        {
          (widgetComponents && widgetComponents.length) ?
            <div className="row">
              <div className="columns small-12">
                {widgetComponents}
              </div>
            </div>
          : null
        }
      </div>
    );
  }

  getDownloadUrl(data) {
    let url = null;
    let metadataUrl = null;
    if (data.metadata && data.metadata.length &&
        data.metadata[0].attributes.info.data_download) {
      metadataUrl = data.metadata[0].attributes.info.data_download;
    }
    switch (data.provider) {
      case 'cartodb':
        if (data.connectorUrl.indexOf('tables') === -1) {
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

  render() {
    const currentData = this.getCurrentData();

    const data = this.props.data || null;

    const title = data ? data.name : currentData.title;

    document.title = title;

    const content = this.getContent();

    return (
      <div className="-theme-2">
        <Icons />
        <Tooltip />
        <Modal
          open={this.state.modalOpen}
          options={this.props.modal.options}
          loading={this.props.modal.loading}
          toggleModal={this.props.toggleModal}
          setModalOptions={this.props.setModalOptions}
        />

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
      </div>
    );
  }
}

DatasetDetail.propTypes = {
  /**
   * Define the route path (from the router)
   */
  currentPage: React.PropTypes.string,
  /**
   * Define the slug of the dataset
   */
  datasetSlug: React.PropTypes.string.isRequired,
  /**
   * Define the function to get the datataset detail data
   */
  getDatasetData: React.PropTypes.func.isRequired,
  /**
   * Define the dataset data
   */
  data: React.PropTypes.any,
  /**
   * Define the dataset widget
   */
  widgets: React.PropTypes.array,
  /**
   * Editor's modal
   */
  modal: React.PropTypes.object,
  toggleModal: React.PropTypes.func,
  setModalOptions: React.PropTypes.func
};

export default DatasetDetail;
