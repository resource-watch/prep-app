import React from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from '../Loading/LoadingSpinner';

class IFrame extends React.Component {
  constructor(props) {
    super(props);
    this.allowGoInside = true;
    this.state = {
      loaded: false,
      height: props.height || 400
    };
  }

  componentDidMount() {
    this.allowGoInside = this.props.src.indexOf('/proxy?url=') > -1;
    this.refs.iframe.addEventListener('load', () => this.onLoad());
  }

  componentWillUnmount() {
    this.refs.iframe.removeEventListener('load', () => this.onLoad());
  }

  onLoad() {
    if (!this.props.height) {
      let height = this.props.src.indexOf('maps.arcgis.com') ? 650 : 400;
      if (this.allowGoInside) {
        height = this.refs.iframe.contentDocument.body.scrollHeight;
      }
      this.setState({ loaded: true, height });
    }
    this.setState({ loaded: true });
  }

  render() {
    let loading;
    if (!this.state.loaded) loading = <LoadingSpinner inner />;

    return (
      <div className="c-iframe" style={{ height: this.state.height }}>
        {loading}
        <iframe ref="iframe" src={this.props.src} sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-pointer-lock" onError={e => console.error(e)} />
      </div>
    );
  }
}

IFrame.propTypes = {
  /**
   * The source url to load iframe
   */
  src: PropTypes.string.isRequired
};

export default IFrame;
