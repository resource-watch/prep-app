import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DatasetCard from 'components/dataset-card/dataset-card-component';

class DatasetsList extends PureComponent {
  componentDidMount() {
    this.props.fetchDatasets();
  }

  render() {
    const { datasets, status, isFetching } = this.props;

    if (isFetching) return (<p>Is loading...</p>);
    if (status === 'error') return (<p>Something wrong...</p>);
  
    return (
      <div className="list-container">
        {datasets.length ? datasets.map((dataset) =>
          <DatasetCard
            key={dataset.id}
            dataset={dataset}
            onToggleDataset={this.props.toggleDataset}
            onToggleInfo={this.props.toggleInfo}
          />) :
          <p>No datasets found.</p>}
      </div>
    );
  }
}

DatasetsList.defaultProps = {
  datasets: {}
};

DatasetsList.propTypes = {
  datasets: PropTypes.array.isRequired,
  status: PropTypes.oneOf(['success', 'error']),
  // error: PropTypes.object,
  isFetching: PropTypes.bool
};

export default DatasetsList;
