import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import isEmpty from 'lodash/isEmpty';

// Components
import NexGDDPTool from 'components/nexgddp-tool/NexGDDPTool';

class NexGDDPEmbedPage extends PureComponent {
  componentDidMount() {
    if (isEmpty(this.props.data)) {
      this.props.getDatasetByIdOrSlug(
        this.props.dataset,
        ['metadata', 'widget', 'layer']
      );
    }
  }

  componentWillUnmount() {
    if (!isEmpty(this.props.data)) this.setState({ data: {} });
  }

  render() {
    const { dataset } = this.props;

    return (
      <div className="-theme-2">
        <NexGDDPTool
          dataset={dataset}
        />
      </div>
    );
  }
}

NexGDDPEmbedPage.propTypes = {
  dataset: PropTypes.string,
  data: PropTypes.object,

  getDatasetByIdOrSlug: PropTypes.func
};

NexGDDPEmbedPage.defaultProps = {
  dataset: '',
  data: {}
};

export default NexGDDPEmbedPage;
