import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router';
import Icon from 'components/ui/Icon';
import Switch from 'components/Button/Switch';
import VegaChart from 'components/Chart/VegaChart';
import { getTitle, getInfo, getMetadata } from 'components/dataset-card/dataset-helper';

class DatasetInfo extends PureComponent {
  static getHeader(dataset) {
    const info = getInfo(dataset);
    const title = getTitle(dataset);
    const organization = info['organization-long'] || info.organization;

    return (
      <header className="header-container">
        <h3 className="item-title">{title}</h3>
        {organization && <span className="item-subtitle">{organization}</span>}
      </header>
    );
  }

  static getContent(dataset) {
    const metadata = getMetadata(dataset);
    const info = getInfo(dataset);
    const description = metadata.description || info.description;
    const { source } = info;

    return (
      <div className="content-container">
        {description && <div className="item-prop">
          <span className="prop-label">Description: </span>
          <ReactMarkdown source={description} className="c-markdown -inline" />
        </div>}

        {source && <div className="item-prop">
          <span className="prop-label">Data source: </span>
          <ReactMarkdown source={source} className="c-markdown" />
        </div>}

        <div className="button-container">
          <Link to={`/dataset/${dataset.slug}`}>
            <button type="button" className="c-new-button -light -transparent">Learn more</button>
          </Link>
        </div>
      </div>
    );
  }

  render() {
    const { dataset, toggleDataset, isFetching } = this.props;
    const info = getInfo(dataset);
    const hasLayer = !!(dataset.layer && dataset.layer.length);
    const hasWidget = !!(dataset.widget && dataset.widget.length);

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
                </a>}
              <Link to={`/dataset/${dataset.slug}`} className="info-tool more">
                <Icon name="icon-share" className="-medium" />
                Learn more
              </Link>
              {hasLayer && <span className="info-tool layer">
                <Switch
                  onChange={() => toggleDataset(dataset)}
                  checked={dataset.isLayerActive}
                />
                Map
              </span>}
            </nav>

            {DatasetInfo.getContent(dataset)}

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
  toggleDataset: PropTypes.func
};

DatasetInfo.defaultProps = {
  dataset: {}
};

export default DatasetInfo;
