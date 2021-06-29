import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class RelatedDatasets extends React.Component {
  componentWillMount() {
    for (let i = 0, slugsLength = this.props.slugs.length; i < slugsLength; i++) {
      if (this.props.slugs[i]) this.props.getDatasetByIdOrSlug(this.props.slugs[i], ['metadata']);
    }
  }


  render() {
    if (!this.props.slugs.length) return null;

    const { data } = this.props;

    return (
      <div className="l-related-datasets">
        <div className="row">
          <div className="columns small-12">
            <h2 className="-left"> Related datasets </h2>
          </div>
        </div>
        <div className="row">
          {this.props.slugs.map((item, index) => {
            if (data[item] && data[item].metadata.length) {
              const datasetData = data[item];
              const datasetMetadata = datasetData.metadata[0].attributes.info;
              return (
                <div
                  className="columns small-12 medium-4 align-stretch"
                  key={`dashboard-metadata-${index}`}
                  style={{ display: 'flex' }}
                >
                  <div className="dataset">
                    <Link to={`/dataset/${item}`} className="title">
                      {datasetData.name}
                    </Link>
                    <div className="links">
                      {datasetData.connector_url &&
                        <a href={datasetData.connector_url} rel="noreferrer" target="_blank">
                          {datasetData.provider}
                        </a>
                      }
                      {datasetMetadata.source &&
                        <a className="-ellipsis" href={datasetMetadata.source} rel="noreferrer" target="_blank">
                          {datasetMetadata.organization}
                        </a>
                      }
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  }
}

RelatedDatasets.propTypes = {
  slugs: PropTypes.array.isRequired,
  data: PropTypes.object,
  metadata: PropTypes.object,
  getDatasetByIdOrSlug: PropTypes.func.isRequired
};

export default RelatedDatasets;
