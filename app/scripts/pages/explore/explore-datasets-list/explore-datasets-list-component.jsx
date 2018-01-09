import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from 'components/Loading/LoadingSpinner';
import DatasetCard from 'components/dataset-card/dataset-card-component';

class ExploreDatasetsList extends PureComponent {
  render() {
    const { datasets, status, isFetching, error } = this.props;

    if (isFetching) return (<LoadingSpinner />);
    if (status === 'error') return (<p>{error}</p>);

    return (
      <div className="list-container">
        {datasets.length ? datasets.map(dataset =>
          (<DatasetCard
            key={dataset.id}
            dataset={dataset}
            onToggleDataset={this.props.toggleDataset}
            onToggleInfo={this.props.toggleInfo}
          />)) : <p className="no-data">There are not datasets with these filters.</p>}
      </div>
    );
  }
}

ExploreDatasetsList.defaultProps = {
  datasets: {},
  toggleInfo: () => {},
  toggleDataset: () => {}
};

ExploreDatasetsList.propTypes = {
  datasets: PropTypes.array.isRequired,
  status: PropTypes.oneOf(['success', 'error']),
  error: PropTypes.object,
  isFetching: PropTypes.bool,
  toggleDataset: PropTypes.func,
  toggleInfo: PropTypes.func
};

export default ExploreDatasetsList;
