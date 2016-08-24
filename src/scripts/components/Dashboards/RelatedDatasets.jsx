import React from 'react';
import { Link } from 'react-router';

class RelatedDatasets extends React.Component {

  componentWillMount() {
    for (let i = 0, slugsLength = this.props.slugs.length; i < slugsLength; i++) {
      if (this.props.slugs[i]) this.props.getDatasetById(this.props.slugs[i]);
    }
  }


  render() {
    if (!this.props.slugs.length) return null;

    const { data, metadata } = this.props;
    return (
      <div className="l-related-datasets">
        <div className="row">
          <div className="columns small-12">
            <h2 className="-left"> Related datasets </h2>
          </div>
        </div>
        <div className="row">
          {this.props.slugs.map((item, index) => {
            if (data[item] && metadata[item]) {
              const datasetData = data[item];
              const datasetMetadata = metadata[item].attributes.info.attributes;
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
  slugs: React.PropTypes.array.isRequired,
  data: React.PropTypes.object,
  metadata: React.PropTypes.object,
  getDatasetById: React.PropTypes.func.isRequired
};

export default RelatedDatasets;
