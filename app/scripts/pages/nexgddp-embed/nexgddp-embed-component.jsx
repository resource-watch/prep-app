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

    return (
      <div className="-theme-2">
        <h2>{dataset.name}</h2>

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
