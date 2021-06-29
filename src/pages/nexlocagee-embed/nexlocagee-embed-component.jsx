import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import isEmpty from 'lodash/isEmpty';

// Components
import NexLocaGeeTool from 'components/nexlocagee-tool';

class NexLocaGeeEmbedPage extends PureComponent {
  componentDidMount() {
    if (isEmpty(this.props.dataset)) {
      this.props.fetchDataset(this.props.datasetSlug);
      this.props.getDatasetByIdOrSlug(
        this.props.datasetSlug,
        ['metadata', 'widget', 'layer']
      );
    }
  }

  componentWillUnmount() {
    if (!isEmpty(this.props.dataset)) this.setState({ data: {} });
  }

  render() {
    const { dataset, embed } = this.props;

    const title = dataset.metadata && dataset.metadata.length && dataset.metadata[0].name
      ? dataset.metadata[0].name
      : dataset.name;

    return (
      <div>
        <h2>{title}</h2>

        {!isEmpty(dataset) &&
          <NexLocaGeeTool
            embed={embed}
            dataset={dataset}
          />
        }
      </div>
    );
  }
}

NexLocaGeeEmbedPage.propTypes = {
  embed: PropTypes.bool,
  datasetSlug: PropTypes.string,
  dataset: PropTypes.object,
  getDatasetByIdOrSlug: PropTypes.func,
  fetchDataset: PropTypes.func,
};

NexLocaGeeEmbedPage.defaultProps = {
  datasetSlug: '',
  dataset: {}
};

export default NexLocaGeeEmbedPage;
