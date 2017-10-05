import React from 'react';
import PropTypes from 'prop-types';

// Constants
import { DATASETS_GROUPS } from '../../general-constants/datasets-groups';

export default class CoreDatasets extends React.Component {
  getContent() {
    return DATASETS_GROUPS.map((gs) => {
      return (
        <article>
          <h1 className="group-title">{gs.title}</h1>
          <h2 className="group-description">{gs.description}</h2>
        </article>
      );
    });
  }

  render() {
    const content = this.getContent();

    return (
      <div className="columns small-12 dataset-items">
        {content}
      </div>
    );
  }
}

CoreDatasets.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array
};
