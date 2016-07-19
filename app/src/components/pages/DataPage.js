import React from 'react';
import DataMapSidebar from '../../containers/maps/DataMapSidebar';
import DataMap from '../../containers/maps/DataMap';
import DataMapLegend from '../../containers/maps/DataMapLegend';
import { Link } from 'react-router';
import Modal from '../commons/Modal';

class DataPage extends React.Component {

  componentDidMount() {
    if (!this.props.data.list.length) {
      this.props.getDatasets();
    }
  }

  render() {
    return (
      <div className="l-data">
        <DataMapSidebar />
        <DataMap />
        <DataMapLegend />
        <Modal
          opened={this.props.modalOpen}
          close={() => this.props.setModalUnderDevelop(false)}
        >
          <div className="content">
            This page is currently under development.
            Please reach us <Link to="/contact">here</Link>.
          </div>
        </Modal>
      </div>
    );
  }
}

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
   * Define the status of the modal
   */
  modalOpen: React.PropTypes.bool,
  /**
   * Define the function to handle the modal
   */
  setModalUnderDevelop: React.PropTypes.func.isRequired,
};

export default DataPage;
