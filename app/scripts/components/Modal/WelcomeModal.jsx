import React from 'react';
import Modal from './Modal';
import Button from '../Button/Button';
import Article from '../Content/Article';

class WelcomeModal extends React.Component {

  constructor(props) {
    super(props);
  }

  getContent() {
    return (
      <div className="m-content">
        <article>
          <h2>{this.props.title}</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam egestas sollicitudin pulvinar. Class aptent
            taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc pharetra, tortor a
            imperdiet
            ultrices, nunc augue ornare lacus, quis ultrices sem lorem id sapien. Sed sodales vitae nisl ut consectetur.
            Vivamus leo felis, efficitur vel massa a, auctor cursus est. Etiam tortor turpis, dictum et rhoncus in,
            lacinia
            feugiat est. Sed lobortis maximus diam, vel malesuada tortor pulvinar sed. Sed vulputate vehicula erat nec
            laoreet. Nam finibus elit tellus, id bibendum purus aliquam vel. Mauris vitae vulputate justo, convallis
            hendrerit purus. Donec sem erat, aliquam ut aliquet ullamcorper, venenatis.</p>
        </article>
      </div>
    );
  }

  render() {
    return (
      <Modal
        opened={this.props.opened}
        close={this.props.close}
        hideCloseButton={this.props.hideCloseButton}
      >

        <div className="content">
          {this.getContent()}
        </div>

        <div className="row align-center">
          <div className="small-2">
            <Button click={() => this.props.close()} themeColor border>
              Continue
            </Button>
          </div>
        </div>

      </Modal>

    );
  }
}

WelcomeModal.propTypes = {
  /**
   * Define the welcome modal title
   */
  title: React.PropTypes.string.isRequired,
  /**
   * Define the welcome modal status
   */
  opened: React.PropTypes.bool.isRequired,
  /**
   * Define whether the modal has a close button or not
   */
  hideCloseButton: React.PropTypes.bool,
  /**
   * Define the welcome modal function to close the modal
   */
  close: React.PropTypes.func.isRequired
};

export default WelcomeModal;
