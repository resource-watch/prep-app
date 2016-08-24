import React from 'react';
import { Link } from 'react-router';
import MainNav from '../../components/Navigation/MainNav';

import ExploreMap from '../../containers/Explore/ExploreMap';
import ExploreMapSidebar from '../../containers/Explore/ExploreSidebar';
import ExploreMapLegend from '../../containers/Explore/ExploreLegend';

import MetadataList from './MetadataList';

import ShareModal from '../Modal/ShareModal';
import Modal from '../Modal/Modal';

import Button from '../Button/Button';

import metadata from 'json!../../metadata.json';
import logoImage from '../../../images/prep-logo.png';

class Explore extends React.Component {

  constructor() {
    super();
    this.state = {
      modalShareOpen: false
    };
  }

  getChildContext() {
    return {
      location: {
        pathname: this.props.location.pathname,
        query: this.props.location.query,
        params: this.props.params
      }
    };
  }

  componentWillMount() {
    if (!this.props.data.list.length) {
      const { query } = this.props.location;
      if (query && query.activeDatasets) {
        this.props.getDatasets(query.activeDatasets.split(','));
      } else {
        this.props.getDatasets();
      }
    }
  }

  getData(key, value) {
    let data = null;
    for (let i = metadata.length - 1; i >= 0; i--) {
      if (metadata[i][key] === value) {
        data = metadata[i];
        break;
      }
    }
    return data;
  }

  getModalContent() {
    const { metadatas } = this.props.data;
    if (metadatas && metadatas[this.props.metadataModal.datasetId]) {
      const metadataInfo = metadatas[this.props.metadataModal.datasetId].attributes.info;

      return (
        <div className="content">
          <h3> {metadataInfo.attributes.title} </h3>
          <h4> {metadataInfo.attributes.subtitle} </h4>
          <MetadataList data={metadataInfo} />
        </div>
      );
    }
    return null;
  }

  render() {
    const currentData = this.getData('pathname', '/explore');
    const modalContent = this.props.metadataModal.datasetId ? this.getModalContent() : null;

    document.title = currentData.title;

    return (
      <div className="l-explore -theme-2">
        <header className="l-header -expanded">
          <div className={`l-header-nav -short ${currentData.name === 'home' ? '-no-bg' : ''}`}>
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
          <div className="l-header-tools-map">
            <a className="c-button -action -theme-color" href="http://prepdata.sdgs.opendata.arcgis.com/" target="_blank"> Open data portal </a>
            <Button themeColor click={() => this.setState({ modalShareOpen: true })}> Share </Button>
          </div>
        </header>

        <ExploreMapSidebar />
        <ExploreMap />
        <ExploreMapLegend />

        {this.state.modalShareOpen &&
          <ShareModal
            title={"Share this page"}
            url={window.location.href}
            opened={this.state.modalShareOpen}
            close={() => this.setState({ modalShareOpen: false })}
          />
        }

        {this.state.modalShareOpen &&
          <ShareModal
            title={"Share this page"}
            url={window.location.href}
            opened={this.state.modalShareOpen}
            close={() => this.setState({ modalShareOpen: false })}
          />
        }

        {this.props.metadataModal &&
          <Modal
            opened={this.props.metadataModal.open}
            close={() => this.props.setModalMetadata(false)}
          >

            {modalContent}

          </Modal>
        }

      </div>
    );
  }
}

Explore.childContextTypes = {
  location: React.PropTypes.object
};

Explore.propTypes = {
  getDatasets: React.PropTypes.func.isRequired,
  data: React.PropTypes.any.isRequired,
  location: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired,
  metadataModal: React.PropTypes.object,
  setModalMetadata: React.PropTypes.func.isRequired
};

export default Explore;
