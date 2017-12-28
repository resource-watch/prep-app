import React from 'react';
import find from 'lodash/find';
import PropTypes from 'prop-types';
import CollapsibleItem from 'components/ui/CollapsibleItem';
import DatasetsList from 'components/datasets-list/datasets-list-component';
import { CORE_DATASETS } from 'components/datasets-list/datasets-list-constants';

const CoreDatasetsList = (props) => {
  const { datasets, toggleDataset, toggleInfo } = props;
  const content = CORE_DATASETS.map(g => (
    <article className="dataset-group" key={g.id}>
      <h1 className="group-title">{g.title}</h1>
      <h2 className="group-description">{g.description}</h2>
      <div className="subgroups-list">
        {g.subgroups.map((sg) => {
          const list = datasets.filter((d) => {
            return sg.datasets.includes(d.id);
          });
          const isActive = !!!(find(list, { isLayerActive: true }));
          const content = (
            <DatasetsList
              {...datasets}
              toggleDataset={toggleDataset}
              toggleInfo={toggleInfo}
              datasets={list}
            />
          );
          const datasetNames = list.map(dataset => {
            const metadata = dataset.metadata && dataset.metadata.length ? dataset.metadata[0] || {} : {};
            const info = metadata ? metadata.info || {} : {};
            const title = info.title || metadata.name || dataset.name;
            return title;
          }).join(', ');

          return (
            <CollapsibleItem
              key={sg.id}
              title={sg.title}
              description={datasetNames}
              content={content}
              hidden={isActive}
            />
          );
        })}
      </div>
    </article>
  ));

  return (
    <div>
      {content}
    </div>
  );
};

CoreDatasetsList.propTypes = {
  datasets: PropTypes.array
};

CoreDatasetsList.defaultProps = {
  datasets: []
};

export default CoreDatasetsList;