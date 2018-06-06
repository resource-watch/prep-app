import React from 'react';
import PropTypes from 'prop-types';


// Components
import { Link } from 'react-router';
import MainNav from '../../components/Navigation/MainNav';

import ExploreMap from '../../containers/Explore/ExploreMap';
import ExploreMapSidebar from '../../containers/Explore/ExploreSidebar';
import InfoSidebar from '../../containers/Explore/InfoSidebar';
import ExploreMapLegend from '../../containers/Explore/ExploreLegend';

import MetadataInfo from './MetadataInfo';
import Form from '../Form';

import ShareModal from '../Modal/ShareModal';
import Modal from '../Modal/Modal';

import LoadingSpinner from '../Loading/LoadingSpinner';

// Constants
import metadata from '../../metadata.json';

const logoImage = '/images/prep-logo.png';

class Explore extends React.Component {
  static getData(key, value) {
    let data = null;
    for (let i = metadata.length - 1; i >= 0; i--) {
      if (metadata[i][key] === value) {
        data = metadata[i];
        break;
      }
    }
    return data;
  }

  constructor() {
    super();
    this.state = {
      modalShareOpen: false,
      modalRequestData: false
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

  componentWillUnmount() {
    this.props.resetExplore();
  }

  getModalContent() {
    const { details } = this.props.data;
    const datasetData = details[this.props.metadataModal.datasetId];

    if (datasetData) {
      if (datasetData.metadata && datasetData.metadata.length) {
        const metadataInfo = datasetData.metadata[0].attributes.info;

        return (
          <div className="content">
            <h3>
              <Link to={`/dataset/${this.props.metadataModal.datasetId}`}>
                {metadataInfo.title}
              </Link>
            </h3>
            <h4> {metadataInfo.subtitle} </h4>
            <MetadataInfo short download data={datasetData} />
          </div>
        );
      }
      return (
        <p>Metadata details cooming soon</p>
      );
    }
    return <LoadingSpinner inner />;
  }

  render() {
    const currentData = Explore.getData('pathname', '/explore');
    const modalContent = this.props.metadataModal.datasetId ? this.getModalContent() : null;

    document.title = currentData.title;

    return (
      <div className="l-explore -theme-2">
        <header className="l-header -expanded">
          <div className={`l-header-nav -short ${currentData.name === 'home' ? '-no-bg' : ''}`}>
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
        </header>

        <ExploreMapSidebar />
        <InfoSidebar />
        <ExploreMap />
        <ExploreMapLegend />

        {this.state.modalShareOpen &&
          <ShareModal
            title="Share this page"
            url={window.location.href}
            opened={this.state.modalShareOpen}
            close={() => this.setState({ modalShareOpen: false })}
          />
        }

        {this.state.modalRequestData &&
          <Modal
            opened={this.state.modalRequestData}
            close={() => this.setState({ modalRequestData: false })}
          >
            <h2>Request data</h2>
            <p>Our goal is to make climate related information more accessible. Let us
              know what data you want and how you would use it.
            </p>
            <Form type="Request data" />
          </Modal>
        }

        {this.props.metadataModal &&
          <Modal
            className="metadata-modal"
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

Explore.childContextTypes = { location: PropTypes.object };

Explore.propTypes = {
  getDatasets: PropTypes.func.isRequired,
  data: PropTypes.any.isRequired,
  location: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  metadataModal: PropTypes.object,
  setModalMetadata: PropTypes.func.isRequired,
  resetExplore: PropTypes.func.isRequired
};

export default Explore;
