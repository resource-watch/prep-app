import React from 'react';
import PropTypes from 'prop-types';
import DatasetCard from 'components/dataset-card/dataset-card-component';

const DatasetsList = ({ datasets, status, isFetching }) => {
  if (isFetching) return (<p>Is loading...</p>);
  if (status === 'error') return (<p>Something wrong...</p>);

  return (
    <div className="list-container">
      {datasets.length && datasets.map((dataset) => <DatasetCard {...dataset} />)}
    </div>
  );
};

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
