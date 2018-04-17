import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import isEmpty from 'lodash/isEmpty';

// Components
import NexGDDPTool from 'components/nexgddp-tool/NexGDDPTool';

class NexGDDPEmbedPage extends PureComponent {
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

    const title = dataset.metadata && dataset.metadata.length && dataset.metadata[0].attributes.name
      ? dataset.metadata[0].attributes.name
      : dataset.name;

    return (
      <div className="-theme-2">
        <h2>{title}</h2>

        {!isEmpty(dataset) &&
          <NexGDDPTool
            embed={embed}
            dataset={dataset}
          />
        }
      </div>
    );
  }
}

NexGDDPEmbedPage.propTypes = {
  embed: PropTypes.bool,
  datasetSlug: PropTypes.string,
  dataset: PropTypes.object,
  getDatasetByIdOrSlug: PropTypes.func
};

NexGDDPEmbedPage.defaultProps = {
  datasetSlug: '',
  dataset: {}
};

export default NexGDDPEmbedPage;
