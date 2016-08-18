import React from 'react';

class DataPageDetail extends React.Component {

  componentDidMount() {
    if (!this.props.data) {
      this.props.getDatasetData(this.props.datasetSlug);
    }
  }

  render() {
    return (
      <div className="l-main">

        explore detail {this.props.datasetSlug}

      </div>
    );
  }
}

DataPageDetail.propTypes = {
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
  widget: React.PropTypes.any
};

export default DataPageDetail;
