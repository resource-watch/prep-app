import React from 'react';
import PropTypes from 'prop-types';

// Components
import CollapsibleItem from './CollapsibleItem';

// Constants
import { DATASETS_GROUPS } from '../../general-constants/datasets-groups';

export default class DatasetsList extends React.Component {
  getContent() {
    const { data } = this.props;

    return DATASETS_GROUPS.map((g, j) => (
      <article className="dataset-group" key={j}>
        <h1 className="group-title">{g.title}</h1>
        <h2 className="group-description">{g.description}</h2>
        <div className="subgroups-list">
          {g.subgroups.map((sg, i) => {
            const content = data.filter(d => sg.datasets.includes(d.id))
              .map(d => d.item);

            return <CollapsibleItem key={i} title={sg.title} content={content} />
          })}
        </div>
      </article>
    ));
  }

  render() {
    const { data, type } = this.props;
    const content = this.getContent();

    return (
      <div className="c-datasets-list">
        {type === 'core_datasets' ?
          content :
          data.map(d => d.item)
        }
      </div>
    );
  }
}

DatasetsList.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array,
  type: PropTypes.string
};
