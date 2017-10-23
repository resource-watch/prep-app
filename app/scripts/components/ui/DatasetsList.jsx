import React from 'react';
import PropTypes from 'prop-types';

// Libraries
import classnames from 'classnames';
import isEqual from 'lodash/isEqual';

// Components
import FilterTabs from '../../containers/Explore/FilterTabs';
import CollapsibleItem from './CollapsibleItem';
import Icon from '../ui/Icon';
import Search from '../ui/Search';
import DatasetItem from '../Explore/DatasetItem';
import Switch from '../Button/Switch';

// Constants
import { DATASETS_GROUPS } from '../../general-constants/datasets-groups';

export default class DatasetsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: false,
      search: {
        list: props.data || [],
        value: ''
      },
      sticky: false
    };

    this.onSearch = this.onSearch.bind(this);
    this.onAddListener = this.onAddListener.bind(this);
  }

  componentDidMount() {
    const sidebar = document.getElementsByClassName('sidebar-container');

    if (sidebar && sidebar.length) {
      sidebar[0].addEventListener('scroll', this.onAddListener);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.type !== nextProps.type && this.node) {
      this.node.scrollIntoView();
    }

    if (!isEqual(this.props.data, nextProps.data)) {
      this.setState({ search: { list: nextProps.data || [], value: '' } });
    }
  }

  onAddListener(e) {
    const header = document.getElementsByClassName('sidebar-header')[0];

    if (this.tools && !this.state.sticky && e.target.scrollTop > header.offsetHeight) {
      this.setState({ sticky: true });
    } else if (this.tools && this.state.sticky && e.target.scrollTop <= header.offsetHeight) {
      this.setState({ sticky: false });
    }
  }

  onSearch(list, value) {
    this.setState({ search: { list, value } });
  }

  /* All datasets content */
  getAllDatasetsContent() {
    const { filters, search, sticky } = this.state;

    return (
      <div className="datasets-list-content">
        <div ref={n => this.tools = n} className={`list-filters ${filters ? '-open' : ''} ${sticky ? '-fixed' : ''}`}>
          <button className="btn-filters" onClick={() => this.setState({ filters: !filters })}>
            <span>Filter results</span>
            {filters ?
              <Icon name="icon-arrow-up" /> :
              <Icon name="icon-arrow-down" />
            }
          </button>

          <Search open={filters ? false : undefined} list={this.props.data} onChange={this.onSearch} label="Search dataset" />
        </div>

        <div className={`filters-content ${filters ? '-open' : ''} ${sticky ? '-fixed' : ''}`}>
          {filters && <FilterTabs />}
        </div>

        {search.list.length > 0 ?
          <div className="list-container -padding">
            {this.getDatasetItems(search.list)}
          </div> :
          <p className="no-data">No datasets with these filters selected</p>
        }
      </div>
    );
  }


  /* Core datasets */
  getCoreContent() {
    const { data } = this.props;

    return DATASETS_GROUPS.map((g, j) => (
      <article className="dataset-group" key={j}>
        <h1 className="group-title">{g.title}</h1>
        <h2 className="group-description">{g.description}</h2>
        <div className="subgroups-list">
          {g.subgroups.map((sg, i) => {
            const list = data.filter(d => sg.datasets.includes(d.id));
            const content = this.getDatasetItems(list);

            return <CollapsibleItem key={i} title={sg.title} content={content} />
          })}
        </div>
      </article>
    ));
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

  /* Datasets item content */
  getDatasetItems(list) {
    return list.map((dataset) => {
      const isInfoPanelOpen = dataset.id && this.props.infoSidebarMetadata.open &&
        this.props.infoSidebarMetadata.datasetId === dataset.id;

      return (
        <DatasetItem
          key={`map-layer-${dataset.id}`}
          dataset={dataset || {}}
          layerActive={dataset.active || false}
          infoActive={isInfoPanelOpen}
          onCloseInfo={this.props.onCloseInfo}
          onInfoClick={this.props.onInfoClick}
          onSwitchChange={this.props.onSwitchChange}
        />
      );
    });
  }

  render() {
    const { type, className } = this.props;
    const classNames = classnames(
      'c-datasets-list',
      { [className]: !!className }
    );

    return (
      <div ref={(n) => { this.node = n; }} className={classNames}>
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
  infoSidebarMetadata: PropTypes.object,
  // Actions
  onChangeTab: PropTypes.func,
  onSwitchChange: PropTypes.func,
  onCloseInfo: PropTypes.func,
  onInfoClick: PropTypes.func
};
