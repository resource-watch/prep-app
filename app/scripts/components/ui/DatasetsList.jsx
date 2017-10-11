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
        list: props.data,
        value: ''
      }
    };

    this.onSearch = this.onSearch.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.type !== nextProps.type && this.node) {
      this.node.scrollIntoView();
    }

    if (!isEqual(this.props.data, nextProps.data)) {
      this.setState({ search: { list: nextProps.data, value: '' } });
    }
  }

  onSearch(list, value) {
    this.setState({ search: { list, value } });
  }

  getAllDatasetsContent() {
    const { filters, search } = this.state;

    return (
      <div className="datasets-list-content">
        <div className={`list-filters ${filters ? '-open' : ''}`}>
          <button className="btn-filters" onClick={() => this.setState({ filters: !filters, search: false })}>
            <span>Filter results</span>
            {filters ?
              <Icon name="icon-arrow-up" /> :
              <Icon name="icon-arrow-down" />
            }
          </button>

          <Search list={this.props.data} onChange={this.onSearch} />
        </div>

        <div className={`filters-content ${filters ? '-open' : ''}`}>
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

  getDatasetItems(list) {
    return list.map((dataset) => {
      const isInfoPanelOpen = dataset.id && this.props.infoSidebarMetadata.open &&
        this.props.infoSidebarMetadata.datasetId === dataset.id;
      const metadata = { title: '', subtitle: '', description: '', tags: [] };
      metadata.title = dataset.metadata && dataset.metadata.length ?
        dataset.metadata[0].attributes.name : dataset.name;

      let layerIcon = null;
      let datasetInfoElement = null;

      // Set metadata
      if (dataset.metadata && dataset.metadata.length) {
        const info = dataset.metadata[0].attributes.info;
        if (info) {
          if (info.organization) metadata.subtitle = info.organization;
          if (info.short_description) metadata.description = info.short_description;
        }
      }

      for (let i = 0; i < dataset.vocabulary[0].attributes.tags.length; i++) {
        metadata.tags.push(dataset.vocabulary[0].attributes.tags[i]);
      }

      // Set actions
      if (dataset.layer && dataset.layer.length) {
        layerIcon = (
          <Switch
            onChange={() => this.props.onSwitchChange(dataset)}
            checked={dataset.active || false}
          />
        );
      }
      if (dataset.id) {
        datasetInfoElement = isInfoPanelOpen ?
          (<button key={'info-close'} onClick={() => this.props.onCloseInfo()} className="cancel">
            <Icon name="icon-cancel" />
          </button>) :
          (<button key={'info-open'} onClick={() => this.props.onInfoClick(dataset.id)} className="info">
            <Icon name="icon-info" />
          </button>);
      }


      return (
        <DatasetItem
          key={`map-layer-${dataset.id}`}
          leftElement={layerIcon}
          toolsElements={[datasetInfoElement]}
          metadata={metadata}
          layerActive={dataset.active || false}
          infoActive={isInfoPanelOpen}
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
