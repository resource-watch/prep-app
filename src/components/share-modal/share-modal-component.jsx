import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Components
import Modal from 'components/Modal/Modal';
import ShareUrl from 'containers/Modal/ShareUrl';
import CreateEmbedWidget from 'containers/Modal/CreateEmbedWidget';

class ShareModalComponent extends PureComponent {
  componentDidMount() {
    // We make sure that there's always an active tab
    const keys = Object.keys(this.props.links);
    if (keys.length) {
      this.props.setTab(keys[0]);
    }
  }

  getHelp() {
    return (
      <div>
        <h3>Add to my dashboard</h3>
        <p>Users can create customized dashboards through their <a href="/sing-in">MyPREP account</a>. We also welcome hearing from groups interested in developing dashboards and stories to be published on PREPdata.</p>
        <p><a href="/contact">Contact us</a> if you&apos;re interested. If you are interested in data storytelling, you may wish to try <a href="https://learn.arcgis.com/en/projects/get-started-with-story-maps/">Esri Story Maps</a>.</p>
      </div>
    );
  }

  /**
   * Return the content of the current tab
   */
  getContent() {
    const { tab, links } = this.props;
    let content = null;

    if (tab === 'link') {
      content = (
        <div className="embed-content">
          <h3>Share this page</h3>
          <p>Click and paste link in email or IM</p>
          <ShareUrl
            url={links[tab]}
            iframe={false}
            analytics={this.props.analytics}
          />
          {this.getHelp()}
        </div>
      );
    } else if (tab === 'embed') {
      content = (
        <div className="embed-content">
          <h3>Share into my web</h3>
          <p>You may include this content on your webpage. To do this, copy the following html code and insert it into the source code of your page:</p>
          <ShareUrl
            url={links[tab]}
            iframe
            analytics={this.props.analytics}
          />
          {this.getHelp()}
        </div>
      );
    } else if (tab === 'widget') {
      content = (
        <div className="embed-content">
          <h3>Create a widget</h3>
          <p>{'Give your widget a name and description and you\'re ready.'}</p>
          <CreateEmbedWidget
            url={links[tab].url}
            dataset={links[tab].dataset}
            links={links[tab].widgetLinks || []}
          />
          {this.getHelp()}
        </div>
      );
    }

    return content;
  }

  navbar() {
    return (
      <div className="c-nav-tab">
        <ul>
          {Object.keys(this.props.links).map((t) => {
            const classNames = classnames({ '-active': this.props.tab === t });

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
    const { open } = this.props;

    return (
      <Modal
        className="-share"
        opened={open}
        close={() => this.props.setOpen(false)}
        navbar={() => this.navbar()}
      >
        <div className="content">
          {this.getContent()}
        </div>
      </Modal>
    );
  }
}

ShareModalComponent.contextTypes = {
  router: PropTypes.object,
  location: PropTypes.object
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
