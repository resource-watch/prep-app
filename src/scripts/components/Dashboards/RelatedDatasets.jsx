import React from 'react';
import { Link } from 'react-router';

class RelatedDatasets extends React.Component {

  componentWillMount() {
    for (let i = 0, slugsLength = this.props.slugs.length; i < slugsLength; i++) {
      if (this.props.slugs[i]) this.props.getDatasetById(this.props.slugs[i]);
    }
  }

  render() {
    const data = this.props.data;
    return (
      <div className="l-related-datasets">
        <div className="row">
          <h2 className="-left"> Related datasets </h2>
        </div>
        <div className="row">
          {this.props.slugs.map((item, index) => {
            if (data[item]) {
              const metadata = data[item].attributes.info.attributes;
              return (
                <div
                  className="columns small-12 medium-4 align-stretch"
                  key={`dashboard-metadata-${index}`}
                  style={{ display: 'flex' }}
                >
                  <div className="dataset">
                    <Link to={`/dataset/${item}`} className="title">
                      {metadata.title}
                    </Link>
                    <div className="links">
                      <a href="http://www.wri.org" rel="noreferrer" target="_blank">
                        WRI
                      </a>
                      <a href="http://www.wri.org" rel="noreferrer" target="_blank">
                        WRI
                      </a>
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
  slugs: React.PropTypes.array,
  data: React.PropTypes.object,
  getDatasetById: React.PropTypes.func.isRequired
};

export default RelatedDatasets;
