import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Components
import Modal from 'components/Modal/Modal';

class EmbedModalComponent extends PureComponent {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    config: PropTypes.shape({}),
    setOpen: PropTypes.func.isRequired
  };

  render() {
    const { open, config, setOpen } = this.props;

    const { title, src } = config;

    return (
      <Modal
        className="-embed"
        opened={open}
        close={() => setOpen(false)}
        // navbar={() => this.navbar()}
      >
        <div className="content">
          <h2>
            {title}
          </h2>

          <iframe
            style={{
              width: '100%',
              height: 400
            }}
            src={src}
            title="embed-modal"
            frameBorder="0"
          />
        </div>
      </Modal>
    );
  }
}

export default EmbedModalComponent;
