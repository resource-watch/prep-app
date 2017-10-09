import React from 'react';
import PropTypes from 'prop-types';

// Components
import FilterTabs from '../../containers/Explore/FilterTabs';
import CollapsibleItem from './CollapsibleItem';

// Constants
import { DATASETS_GROUPS } from '../../general-constants/datasets-groups';

export default class DatasetsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.type !== nextProps.type && this.node) {
      this.node.scrollIntoView();
    }
  }

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
    const { filters } = this.state;
    const { data, type } = this.props;
    const content = this.getContent();

    return (
      <div ref={(n) => { this.node = n; }} className="c-datasets-list">
        {type === 'all_datasets' &&
          <div className="list-filters">
            <button onClick={() => this.setState({ filters: !filters })}>
              <span>Filter results</span>
            </button>

            <span></span>
          </div>
        }

        {type === 'all_datasets' &&
          <div className={`filters-content`}>
            {filters && <FilterTabs />}
          </div>
        }

        {type === 'core_datasets' ?
          content :
          <div className="list-container">
            {data.map(d => d.item)}
          </div>
        }

        {type === 'core_datasets' &&
          <footer className="sidebar-footer">
            <p>These datasets are a curated collection. If you don't find what you are interested in, you can explore all the data:</p>

            <div className="footer-actions">
              <button className="c-button" onClick={() => this.props.onChangeTab('all_datasets')}>
                Browse all datasets
              </button>
            </div>
          </footer>
        }
      </div>
    );
  }
}

DatasetsList.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array,
  type: PropTypes.string,
  // Actions
  onChangeTab: PropTypes.func
};
