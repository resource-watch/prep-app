import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import isEmpty from 'lodash/isEmpty';

// Components
import NexGDDPGeeTool from 'components/nexgddp-gee-tool/NexGDDPGeeTool';

class NexGDDPGeeEmbedPage extends PureComponent {
  componentDidMount() {
    if (isEmpty(this.props.dataset)) {
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
          <NexGDDPGeeTool
            embed={embed}
            dataset={dataset}
          />
        }
      </div>
    );
  }
}

NexGDDPGeeEmbedPage.propTypes = {
  embed: PropTypes.bool,
  datasetSlug: PropTypes.string,
  dataset: PropTypes.object,
  getDatasetByIdOrSlug: PropTypes.func
};

NexGDDPGeeEmbedPage.defaultProps = {
  datasetSlug: '',
  dataset: {}
};

export default NexGDDPGeeEmbedPage;
