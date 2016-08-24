import React from 'react';
import LoadingSpinner from '../Loading/LoadingSpinner';

class IFrame extends React.Component {
  constructor() {
    super();
    this.allowGoInside = true;
    this.state = {
      loaded: false,
      height: 400
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
    let height = this.props.src.indexOf('maps.arcgis.com') ? 650 : 400;
    if (this.allowGoInside) {
      height = this.refs.iframe.contentDocument.body.scrollHeight;
    }
    this.setState({ loaded: true, height });
  }

  render() {
    let loading;
    if (!this.state.loaded) loading = <LoadingSpinner />;

    return (
      <div className="c-iframe" style={{ height: this.state.height }}>
        {loading}
        <iframe ref="iframe" src={this.props.src}></iframe>
      </div>
    );
  }
}

IFrame.propTypes = {
  /**
   * The source url to load iframe
   */
  src: React.PropTypes.string.isRequired
};

export default IFrame;
