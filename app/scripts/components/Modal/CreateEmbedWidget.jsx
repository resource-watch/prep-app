import React from 'react';
import PropTypes from 'prop-types';
import { getConfig, WidgetService } from 'widget-editor';

// Components
import LoadingSpinner from 'components/Loading/LoadingSpinner';

class CreateEmbedWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
      saved: false
    };

    this.onCreateWidget = this.onCreateWidget.bind(this);
  }


  /**
   * Event handler executed when the user creates an
   * embed widget
   * @param {Event} e Event
   */
  onCreateWidget(e) {
    e.preventDefault();

    const { url, dataset, links } = this.props;
    const form = e.target;
    const formData = new FormData(form);
    const title = formData.get('title');
    const description = formData.get('description');

    if (!title.length) {
      this.setState({ error: 'You need to give your widget a title.' });
      return;
    }

    this.setState({ loading: true, error: false });

    const widgetConfig = {
      type: 'embed',
      url
    };

    const widget = {
      name: title,
      description,
      widgetConfig
    };

    WidgetService.saveUserWidget(widget, dataset, getConfig().userToken)
      .then((res) => {
        if (!links.length) return null;

        const { id } = res.data;

        return fetch(`${getConfig().url}/dataset/${dataset}/widget/${id}/metadata`, {
          method: 'POST',
          body: JSON.stringify({
            application: getConfig().applications,
            language: 'en',
            info: { widgetLinks: links }
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getConfig().userToken}`
          }
        });
      })
      .then(() => this.setState({ saved: true, error: false }))
      .catch(() => this.setState({ saved: false, error: true }))
      .then(() => this.setState({ loading: false }));
  }

  render() {
    const { loading, error, saved } = this.state;

    return (
      <div className="c-create-embed-widget">
        { loading && <LoadingSpinner inner transparent /> }
        { !loading && error && (
          <p className="error">{'Sorry, the widget couldn\'t be created. Try again in a few minutes.'}</p>
        )}
        { !saved && (
          <form onSubmit={this.onCreateWidget}>
            <label htmlFor="share-modal-widget-title">Widget title</label>
            <input type="text" id="share-modal-widget-title" name="title" placeholder="Widget title" required />
            <label htmlFor="share-modal-description">Description</label>
            <textarea id="share-modal-description" name="description" placeholder="Description" />
            <button type="submit" className="c-button -border -fill">Create</button>
          </form>
        )}
        { saved && (
          <div>
            <p>The widget has been saved!</p>
            <a href="/myprep/widgets/my_widgets" className="c-button -border -fill">Check your widgets</a>
          </div>
        )}
      </div>
    );
  }
}

CreateEmbedWidget.propTypes = {
  /**
   * URL of the page to embed in the widget
   */
  url: PropTypes.string.isRequired,
  /**
   * ID of the dataset attached to the widget
   */
  dataset: PropTypes.string.isRequired,
  /**
   * Links to add to the metadata, for example,
   * additional datasets
   */
  links: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
  }))
};

CreateEmbedWidget.defaultProps = {
  links: []
};

export default CreateEmbedWidget;
