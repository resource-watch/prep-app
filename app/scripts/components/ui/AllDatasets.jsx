import React from 'react';
import PropTypes from 'prop-types';


export default function AllDatasets({ data }) {
  return (
    <div className="columns small-12 dataset-items">
      {data.map(d => d.item)}
    </div>
  );
}

AllDatasets.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array
};
