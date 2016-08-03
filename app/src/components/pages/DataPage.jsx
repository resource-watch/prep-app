import React from 'react';
import DataMapSidebar from '../../containers/maps/DataMapSidebar';
import DataMap from '../../containers/maps/DataMap';
import DataMapLegend from '../../containers/maps/DataMapLegend';
import Modal from '../commons/Modal';
import MetadataList from '../commons/MetadataList';

class DataPage extends React.Component {

  componentDidMount() {
    if (!this.props.data.list.length) {
      const { query } = this.context.location;
      if (query && query.activeDatasets) {
        this.props.getDatasets(query.activeDatasets.split(','));
      } else {
        this.props.getDatasets();
      }
    }
  }

  getModalContent() {
    const { metadatas } = this.props.data;
    if (metadatas && metadatas[this.props.metadataModal.datasetId]) {
      const metadataInfo = metadatas[this.props.metadataModal.datasetId].attributes.info;

      return <MetadataList data={metadataInfo} />;
    }
    return null;
  }

  render() {
    let modalContent = this.props.metadataModal.datasetId ? this.getModalContent() : null;
    return (
      <div className="l-data">
        <DataMapSidebar />
        <DataMap />
        <DataMapLegend />

        <Modal
          opened={this.props.metadataModal.open}
          close={() => this.props.setModalMetadata(false)}
        >
          <div className="content">
            {modalContent}
          </div>

        </Modal>
      </div>
    );
  }
}

DataPage.contextTypes = {
  location: React.PropTypes.object
};

DataPage.propTypes = {
  /**
   * Define the route path (from the router)
   */
  currentPage: React.PropTypes.string,
  /**
   * Define the function to get the datasets list
   */
  getDatasets: React.PropTypes.func.isRequired,
  /**
   * Define the map list
   */
  data: React.PropTypes.any.isRequired,
  /**
   * Define the data of the metadata modal
   */
  metadataModal: React.PropTypes.object,
  /**
   * Define the function to handle the modal
   */
  setModalMetadata: React.PropTypes.func.isRequired
};

export default DataPage;
