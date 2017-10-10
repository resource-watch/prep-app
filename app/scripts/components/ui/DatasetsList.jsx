import React from 'react';
import PropTypes from 'prop-types';

// Components
import FilterTabs from '../../containers/Explore/FilterTabs';
import CollapsibleItem from './CollapsibleItem';
import Icon from '../ui/Icon';

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

  getCoreContent() {
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

  getAllDatasetsContent() {
    const { filters } = this.state;
    const { data } = this.props;

    return (
      <div className="datasets-list-content">
        <div className={`list-filters ${filters ? '-open' : ''}`}>
          <button className="btn-filters" onClick={() => this.setState({ filters: !filters })}>
            <span>Filter results</span>
            {filters ?
              <Icon name="icon-arrow-up" /> :
              <Icon name="icon-arrow-down" />
            }
          </button>

          <span></span>
        </div>

        <div className={`filters-content ${filters ? '-open' : ''}`}>
          {filters && <FilterTabs />}
        </div>

        {data.length > 0 ?
          <div className="list-container">
            {data.map(d => d.item)}
          </div> :
          <p className="no-data">No datasets with these filters selected</p>
        }
      </div>
    );
  }

  getCoreDatasetsContent() {
    const content = this.getCoreContent();

    return (
      <div className="datasets-list-content">
        <div className="list-container">
          {content}

          <footer className="sidebar-footer">
            <p>These datasets are a curated collection. If you don't find what you are interested in, you can explore all the data:</p>

            <div className="footer-actions">
              <button className="c-button" onClick={() => this.props.onChangeTab('all_datasets')}>
                Browse all datasets
              </button>
            </div>
          </footer>
        </div>
      </div>
    );
  }

  render() {
    const { type } = this.props;

    return (
      <div ref={(n) => { this.node = n; }} className="c-datasets-list">
        {type === 'core_datasets' ?
          this.getCoreDatasetsContent() :
          this.getAllDatasetsContent()
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
