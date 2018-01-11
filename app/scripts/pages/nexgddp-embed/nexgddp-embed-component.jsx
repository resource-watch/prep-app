import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Components
import NexGDDPTool from 'components/nexgddp-tool/NexGDDPTool';

class NexGDDPEmbedPage extends PureComponent {
  render() {
    const { dataset } = this.props;

    return (
      <div className="-theme-2">
        <NexGDDPTool
          dataset={dataset} // Use route slug to get it
        />
      </div>
    );
  }
}

NexGDDPEmbedPage.propTypes = {
  dataset: PropTypes.string
};

NexGDDPEmbedPage.defaultProps = {
  dataset: ''
};

export default NexGDDPEmbedPage;
