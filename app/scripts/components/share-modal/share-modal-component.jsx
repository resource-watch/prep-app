import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// Components
import Modal from '../Modal/Modal';
import ShareUrl from '../../containers/Modal/ShareUrl';


const navbar = () => (
  <div className="c-nav-tab">
    <ul>
      <li className="-active">
        <span className="link">Link</span>
      </li>
      <li className="">
        <span className="link">Embed</span>
      </li>
    </ul>
  </div>
);


class ShareModalComponent extends PureComponent {
  // componentDidMount() {
  //   const { linkUrl, embedUrl } = this.props.links;
  //   if (linkUrl) this.setActiveTab('linkUrl');
  //   if (embedUrl) this.setActiveTab('embedUrl');
  // }

  navbar() {
    const { linkUrl, embedUrl } = this.props.links;

    return (
      <div className="c-nav-tab">
        <ul>
          <li className="-active">
            <span className="link">Link</span>
          </li>
          <li className="">
            <span className="link">Embed</span>
          </li>
        </ul>
      </div>
    );
  }

  render() {
    return (
      <Modal
        className="-share"
        opened={this.props.open}
        navbar={() => navbar()}
      >
        <div className="content">
          <div className="embed-content">
            <h3>Share this page</h3>
            <p>Copy and paste link in email or IM</p>
            <ShareUrl url={'http://www.hello.com'} />
          </div>
        </div>
      </Modal>
    );
  }
}

ShareModalComponent.contextTypes = {
  router: React.PropTypes.object,
  location: React.PropTypes.object
};

ShareModalComponent.propTypes = {
  open: PropTypes.bool,
  links: PropTypes.object,
  linkUrl: PropTypes.string,
  embedUrl: PropTypes.string
};

export default ShareModalComponent;
