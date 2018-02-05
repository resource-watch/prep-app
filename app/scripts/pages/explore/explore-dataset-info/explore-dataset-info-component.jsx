import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { VegaChart } from 'widget-editor';

import { logEvent } from 'helpers/analytics';

import Icon from 'components/ui/Icon';
import Switch from 'components/Button/Switch';
import { getTitle, getInfo } from 'components/dataset-card/dataset-helper';
import Tooltip from 'rc-tooltip/dist/rc-tooltip';
import CollectionsPanel from 'components/collections-panel';
import { Link } from 'react-router';

// data
import TOPICS from 'pages/explore/explore-dataset-filters/data/topics.json';

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

  /**
   * Event handler executed when the user toggles
   * on or off a dataset
   * @param {object} dataset Dataset
   */
  onToggleDataset(dataset) {
    this.props.toggleDataset(dataset);

    if (!dataset.isLayerActive) {
      logEvent('Explore data', 'Toggles on a layer', getTitle(dataset));
    }
  }

  /**
   * Return the basic props of the links ("href" or "to" and
   * eventually "_target")
   * @param {string} relativeHref Relative URL
   */
  getLinkProps(relativeHref) {
    return Object.assign(
      {},
      this.props.embed
        ? { href: `${window.location.origin}${relativeHref}`, target: '_blank' }
        : { to: relativeHref }
    );
  }

  getItemList(list = []) {
    const contentList = list.map((item, index) =>
      (<li
        key={item.value}
        className="item-tag"
      >
        {!!(index && index < list.length) && ', ' }
        <span onClick={() => { this.onClickTag(item); }}>{item.label}</span>
      </li>));

    return (<ul className="item-tag">{contentList}</ul>);
  }

  getContent(dataset) {
    const { embed } = this.props;
    const info = getInfo(dataset);
    const description = info.function;
    const { source } = info;
    const datasetTags = (((dataset.vocabulary || [])[0] || {}).tags || []);

    const topicsList = datasetTags.filter(tag =>
      TOPICS.find(topic => topic.value === tag))
      .map((tagValue) => {
        if (TOPICS.find(topic => topic.value === tagValue)) {
          const foundTopic = TOPICS.find(topic => topic.value === tagValue);

          if (foundTopic) return ({ label: foundTopic.label, value: tagValue, key: 'topics' });
        }

        return false;
      });

    const LinkComponent = embed ? 'a' : Link;

    return (
      <div className="content-container">
        {description && <div className="item-prop">
          <span className="prop-label">Description: </span>
          <ReactMarkdown source={description} className="c-markdown -inline" />
        </div>}

        {!!dataset.layer &&
          <div className="item-prop">
            <span className="prop-label">Layers: </span>

            <ul className="item-list">
              {dataset.layer.map(l => (
                <li
                  key={l.id}
                >
                  <h4>{l.name}</h4>

                  {l.description &&
                    <ReactMarkdown source={l.description} className="c-markdown -inline" />
                  }
                </li>
              ))}
            </ul>
          </div>
        }

        {dataset.data_source && <div className="item-prop">
          <span className="prop-label">Data source: </span>
          <ReactMarkdown source={dataset.data_source} className="c-markdown" />
        </div>}

        {!!topicsList.length && <div className="item-prop">
          <span className="prop-label">Topics: </span>
          {this.getItemList(topicsList)}
        </div>}

        {source && <div className="item-prop">
          <span className="prop-label">Data source: </span>
          <ReactMarkdown source={source} className="c-markdown" />
        </div>}

        <div className="button-container">
          <LinkComponent
            {...this.getLinkProps(`/dataset/${dataset.slug}`)}
            className="c-new-button -light -transparent"
            onClick={() => logEvent('Explore menu', 'Click through to dataset page', getTitle(dataset))}
          >
            Learn more
          </LinkComponent>
        </div>
      </div>
    );
  }

  render() {
    const { dataset, embed, user } = this.props;
    const info = getInfo(dataset);
    const hasLayer = !!(dataset.layer && dataset.layer.length);
    const hasWidget = !!(dataset.widget && dataset.widget.length);
    const { token } = user;

    const LinkComponent = embed ? 'a' : Link;

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

              {token && <Tooltip
                overlay={<CollectionsPanel
                  resource={dataset}
                  resourceType="dataset"
                />}
                overlayClassName="c-rc-tooltip -blue-arrow"
                overlayStyle={{
                  color: '#1a3e62'
                }}
                placement="bottom"
                trigger="click"
              >
                <button className="c-btn star-button save">
                  <Icon name="icon-star-full" className="-medium" />
                  Save dataset
                </button>
              </Tooltip>}

              <LinkComponent
                {...this.getLinkProps(`/dataset/${dataset.slug}`)}
                className="info-tool more"
                onClick={() => logEvent('Explore menu', 'Click through to dataset page', getTitle(dataset))}
              >
                <Icon name="icon-share" className="-medium" />
                Learn more
              </LinkComponent>

              {hasLayer && <span className="info-tool layer">
                <Switch
                  onChange={() => this.onToggleDataset(dataset)}
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
                  <VegaChart data={w.widgetConfig} reloadOnResize />
                </div>
              );
            })}

            <div className="content-container">
              <p>We’re actively adding new datasets to PREP. If you can’t find what you’re looking for, you can suggest a dataset for us to consider:</p>

              <div className="button-container">
                <a
                  href="https://docs.google.com/forms/d/1wZzQno3De7Ul6vlOkkdHhWK_9csErSrOlo6pOAZHIds/viewform?edit_requested=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="c-new-button -light -transparent"
                  onClick={() => logEvent('Explore menu', 'Click to suggest a dataset', 'Click')}
                >
                  Suggest dataset
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
  user: PropTypes.object,
  embed: PropTypes.bool,
  toggleDataset: PropTypes.func,
  onSetDatasetFilter: PropTypes.func,
  getDatasetsByGraph: PropTypes.func
};

DatasetInfo.defaultProps = {
  dataset: {}
};

export default DatasetInfo;
