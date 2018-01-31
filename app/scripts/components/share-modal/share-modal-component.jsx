import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Components
import Modal from '../Modal/Modal';
import ShareUrl from '../../containers/Modal/ShareUrl';

class ShareModalComponent extends PureComponent {
  componentWillMount() {
    const { link, embed } = this.props.links;

    if (!link && embed) {
      this.props.setTab('embed');
    }
  }

  componentWillReceiveProps(nextProps) {
    const { link, embed } = nextProps.links;

    if (!link && embed) {
      this.props.setTab('embed');
    }
  }

  navbar() {
    return (
      <div className="c-nav-tab">
        <ul>
          {Object.keys(this.props.links).map((t) => {
            const classNames = classnames({
              '-active': this.props.tab === t
            });

            return (
              <li
                key={t}
                className={classNames}
                onClick={() => this.props.setTab(t)}
              >
                <span className="link">{t}</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  render() {
    const { open, links, tab } = this.props;

    return (
      <Modal
        className="-share"
        opened={open}
        close={() => this.props.setOpen(false)}
        navbar={() => this.navbar()}
      >
        <div className="content">
          <div className="embed-content">

            <h3>
              {tab === 'embed' ?
                'Share into my web' :
                'Share this page'
              }
            </h3>

            <p>
              {tab === 'embed' ?
                'You may include this content on your webpage. To do this, copy the following html code and insert it into the source code of your page:' :
                'Click and paste link in email or IM'
              }
            </p>

            <ShareUrl
              url={links[tab]}
              iframe={tab === 'embed'}
              analytics={this.props.analytics}
            />
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
  tab: PropTypes.string,
  links: PropTypes.object,
  setOpen: PropTypes.func,
  setTab: PropTypes.func,
  /**
   * Define the category and action for the analytics
   * event
   */
  analytics: PropTypes.shape({
    category: PropTypes.string,
    action: PropTypes.string
  })
};

export default ShareModalComponent;
