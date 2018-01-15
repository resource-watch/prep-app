import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import Icon from 'components/ui/Icon';
import Switch from 'components/Button/Switch';
import VegaChart from 'components/Chart/VegaChart';
import { getTitle, getInfo, getMetadata } from 'components/dataset-card/dataset-helper';

// data
import TOPICS from 'pages/explore/explore-dataset-filters/data/topics.json';
import GEOGRAPHIES from 'pages/explore/explore-dataset-filters/data/geographies.json';

class DatasetInfo extends PureComponent {
  static getHeader(dataset) {
    const info = getInfo(dataset);
    const title = getTitle(dataset);
    const organization = info['organization-long'] || info.organization_long || info.organization;

    return (
      <header className="header-container">
        <h3 className="item-title">{title}</h3>
        {organization && <span className="item-subtitle">{organization}</span>}
      </header>
    );
  }

  onClickTag(tag) {
    const { key, value } = tag;

    this.props.onSetDatasetFilter({ [key]: [value] });
    this.props.getDatasetsByGraph();
  }

  getItemList(list = []) {
    const contentList = list.map((item, index) =>
      (<li
        key={item.value}
        className="item-list"
      >
        {!!(index && index < list.length) && ', ' }
        <span onClick={() => { this.onClickTag(item); }}>{item.label}</span>
      </li>));

    return (<ul className="item-list">{contentList}</ul>);
  }

  getContent(dataset) {
    const { embed } = this.props;
    const info = getInfo(dataset);
    const description = info.function;
    const { source } = info;
    const datasetTags = (((dataset.vocabulary || [])[0] || {}).tags || []);
    const areasList = [];

    const topicsList = datasetTags.filter(tag =>
      TOPICS.find(topic => topic.value === tag))
      .map((tagValue) => {
        if (TOPICS.find(topic => topic.value === tagValue)) {
          const foundTopic = TOPICS.find(topic => topic.value === tagValue);

          if (foundTopic) return ({ label: foundTopic.label, value: tagValue, key: 'topics' });
        }

        return false;
      });

    datasetTags.filter(tag =>
      GEOGRAPHIES.find(topic => topic.value === tag || (topic.children || []).find(child => child.value === tag)))
      .map(tagValue =>
        GEOGRAPHIES.forEach((_topic) => {
          if (_topic.value === tagValue) {
            areasList.push({ label: _topic.label, value: tagValue, key: 'geographies' });
            return false;
          }

          if ((_topic.children || []).find(child => child.value === tagValue)) {
            (_topic.children || []).forEach((child) => {
              if (child.value === tagValue) {
                areasList.push({ label: child.label, value: tagValue, key: 'geographies' });
                return false;
              } else if ((child.children || []).length) {
                child.children.find((subchild) => {
                  if (subchild.value === tagValue) {
                    areasList.push({ label: subchild.label, value: tagValue, key: 'geographies' });
                    return false;
                  }
                  return false;
                });
              }
              return false;
            });
          }

          return false;
        })
      );

    const linkTarget = {
      ...embed && { target: '_blank' }
    };

    return (
      <div className="content-container">
        {description && <div className="item-prop">
          <span className="prop-label">Description: </span>
          <ReactMarkdown source={description} className="c-markdown -inline" />
        </div>}

        {dataset.data_source && <div className="item-prop">
          <span className="prop-label">Data source: </span>
          <ReactMarkdown source={dataset.data_source} className="c-markdown" />
        </div>}
        {!!topicsList.length && <div className="item-prop">
          <span className="prop-label">Topics: </span>
          {this.getItemList(topicsList)}
        </div>}
        {!!areasList.length && <div className="item-prop">
          <span className="prop-label">Areas: </span>
          {this.getItemList(areasList)}
        </div>}

        {source && <div className="item-prop">
          <span className="prop-label">Data source: </span>
          <ReactMarkdown source={source} className="c-markdown" />
        </div>}

        <div className="button-container">
          <a
            className="c-new-button -light -transparent"
            href={`${window.location.origin}/dataset/${dataset.slug}`}
            {...linkTarget}
          >
            Learn more
          </a>
        </div>
      </div>
    );
  }

  render() {
    const { dataset, toggleDataset, embed } = this.props;
    const info = getInfo(dataset);
    const hasLayer = !!(dataset.layer && dataset.layer.length);
    const hasWidget = !!(dataset.widget && dataset.widget.length);
    const linkTarget = {
      ...embed && { target: '_blank' }
    };


    return (
      <div className="info-container">
        <div className="row content collapse">
          <div className="columns small-12 dataset-items">
            {DatasetInfo.getHeader(dataset)}

            <nav className="info-actions">
              {info.dataDownload &&
                <a download href={info.dataDownload} className="info-tool download">
                  <Icon name="icon-download" className="-medium" />
                  Download
                </a>
              }

              <a
                href={`${window.location.origin}/dataset/${dataset.slug}`}
                className="info-tool more"
                {...linkTarget}
              >
                <Icon name="icon-share" className="-medium" />
                Learn more
              </a>

              {hasLayer && <span className="info-tool layer">
                <Switch
                  onChange={() => toggleDataset(dataset)}
                  checked={dataset.isLayerActive}
                />
                Map
              </span>}
            </nav>

            {this.getContent(dataset)}

            {hasWidget && dataset.widget.map((w) => {
              if (w.widgetConfig.type === 'map') {
                return null;
              }
              if (w.widgetConfig.type === 'embed') {
                return (
                  <div className="widget-container" key={w.id}>
                    <iframe
                      src={w.widgetConfig.url}
                      width="100%"
                      height="500"
                      frameBorder="0"
                      title={w.name}
                    />
                  </div>
                );
              }
              return (
                <div className="widget-container" key={w.id}>
                  <VegaChart data={w.widgetConfig} />
                </div>
              );
            })}

            <div className="content-container">
              <p>We’re actively adding new datasets to PREP. If you can’t find what you’re looking for, you can suggest a dataset for us to consider:</p>

              <div className="button-container">
                <a href="https://docs.google.com/forms/d/1wZzQno3De7Ul6vlOkkdHhWK_9csErSrOlo6pOAZHIds/viewform?edit_requested=true" target="_blank" rel="noopener noreferrer">
                  <button type="button" className="c-new-button -light -transparent">Suggest dataset</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DatasetInfo.propTypes = {
  dataset: PropTypes.object,
  embed: PropTypes.bool,
  toggleDataset: PropTypes.func,
  onSetDatasetFilter: PropTypes.func,
  getDatasetsByGraph: PropTypes.func
};

DatasetInfo.defaultProps = {
  dataset: {}
};

export default DatasetInfo;
