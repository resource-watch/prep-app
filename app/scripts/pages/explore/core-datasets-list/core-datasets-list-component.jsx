import React from 'react';
import find from 'lodash/find';
import PropTypes from 'prop-types';
import LoadingSpinner from 'components/Loading/LoadingSpinner';
import CollapsibleItem from 'components/ui/CollapsibleItem';
import DatasetsList from '../explore-datasets-list/explore-datasets-list-component';
import coreDatasets from './core-datasets-list-data.json';

const CoreDatasetsList = (props) => {
  const { datasets, toggleDataset, toggleInfo, error, isFetching } = props;

  if (isFetching) return (<LoadingSpinner />);

  if (error && !isFetching) {
    return (
      <div>
        Something wrong.
      </div>
    );
  }

  const subGroups = (subgroup) => {
    const list = datasets.filter(d => subgroup.datasets.includes(d.id));
    const isActive = !find(list, { isLayerActive: true });
    const subContent = (
      <DatasetsList
        {...datasets}
        toggleDataset={toggleDataset}
        toggleInfo={toggleInfo}
        datasets={list}
      />
    );

    if (list.length === 0) return null;

    const datasetNames = list.map((dataset) => {
      const metadata = dataset.metadata && dataset.metadata.length ? dataset.metadata[0] || {} : {};
      const info = metadata ? metadata.info || {} : {};
      const title = info.title || metadata.name || dataset.name;
      return title;
    }).join(', ');

    return (
      <CollapsibleItem
        key={subgroup.id}
        title={subgroup.title}
        description={datasetNames}
        content={subContent}
        hidden={isActive}
      />
    );
  };

  const subGroupsTree = group => group.subgroups.map(subgroup => (
    <div className="firs-level" key={subgroup.id}>
      {subGroups(subgroup)}
      <div className="second-level">
        {(subgroup.subgroups || []).map(sg => subGroups(sg))}
      </div>
    </div>
  ));

  const content = coreDatasets.map(g => (
    <article className="dataset-group" key={g.id}>
      <h1 className="group-title">{g.title}</h1>
      <h2 className="group-description">{g.description}</h2>
      <div className="subgroups-list">
        {subGroupsTree(g)}
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
  datasets: PropTypes.array,
  error: PropTypes.object,
  isFetching: PropTypes.bool,
  toggleDataset: PropTypes.func,
  toggleInfo: PropTypes.func
};

CoreDatasetsList.defaultProps = {
  datasets: [],
  error: null,
  isFetching: () => {},
  toggleDataset: () => {},
  toggleInfo: () => {}
};

export default CoreDatasetsList;
