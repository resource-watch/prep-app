import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Redux
import { toggleTooltip } from 'actions/tooltip';
import { setMapZoom, setMapCenter } from 'actions/nexlocageetool';

const COPY_MSG = {
  default: 'Copy all',
  success: 'Copied!',
  error: 'Error!'
};

const PASTE_MSG = {
  default: 'Paste',
  success: 'Pasted!',
  error: 'Error!'
};

const CLIPBOARD_KEY = 'nexgdddp-loca-clipboard';

class PositionControlTooltip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      copyStatus: COPY_MSG.default,
      pasteStatus: PASTE_MSG.default,
      canPaste: false
    };

    this.onClickScreen = this.onClickScreen.bind(this);
    this.onChangeZoom = this.onChangeZoom.bind(this);
    this.onChangeLatLng = this.onChangeLatLng.bind(this);
    this.onClickCopy = this.onClickCopy.bind(this);
    this.onClickPaste = this.onClickPaste.bind(this);
    this.checkStorage = this.checkStorage.bind(this);
  }

  componentWillMount() {
    this.checkStorage();
  }

  componentDidMount() {
    window.addEventListener('storage', this.checkStorage);
    document.addEventListener('click', this.onClickScreen);
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.checkStorage);
    document.removeEventListener('click', this.onClickScreen);
  }

  onClickScreen(e) {
    const el = document.querySelector('.c-position-control-tooltip');
    const clickOutside = el && el.contains && !el.contains(e.target);

    if (clickOutside) {
      const { toggleTooltip } = this.props;
      toggleTooltip(false);
    }
  }

  /**
   * Event handler executed when the user changes the zoom
   * @param {number} zoom Zoom
   */
  onChangeZoom(zoom) {
    const { setZoom } = this.props;
    setZoom(zoom);
  }

  /**
   * Event handler executed when the user changes the lat/lng
   * @param {number[]} latLng Latitude and longitude coordinates
   */
  onChangeLatLng(latLng) {
    const { setLatLng } = this.props;
    setLatLng(latLng);
  }

  /**
   * Event handler executed when the user clicks the copy button
   */
  onClickCopy() {
    if (this.copyStatusTimeout) {
      clearTimeout(this.copyStatusTimeout);
      this.copyStatusTimeout = null;
    }

    const { zoom, latLng } = this.props;

    try {
      localStorage.setItem(CLIPBOARD_KEY, JSON.stringify({
        zoom,
        latLng
      }));
      this.setState({ copyStatus: COPY_MSG.success, canPaste: true });
    } catch (e) {
      this.setState({ copyStatus: COPY_MSG.error });
    }

    this.copyStatusTimeout = setTimeout(
      () => this.setState({ copyStatus: COPY_MSG.default }),
      3000
    );
  }

  /**
   * Event handler executed when the user clicks the paste button
   */
  onClickPaste() {
    if (this.pasteStatusTimeout) {
      clearTimeout(this.pasteStatusTimeout);
      this.pasteStatusTimeout = null;
    }

    try {
      const { zoom, latLng } = JSON.parse(localStorage.getItem(CLIPBOARD_KEY));
      if (zoom !== undefined) this.onChangeZoom(zoom);
      if (latLng !== undefined) this.onChangeLatLng(latLng);
      this.setState({ pasteStatus: PASTE_MSG.success });
    } catch (e) {
      this.setState({ pasteStatus: PASTE_MSG.error });
    }

    this.pasteStatusTimeout = setTimeout(
      () => this.setState({ pasteStatus: PASTE_MSG.default }),
      3000
    );
  }

  /**
   * Check the state of the clipboard in the localStorage and
   * update the "canPaste" state property accordingly
   */
  checkStorage() {
    try {
      const clipboard = localStorage.getItem(CLIPBOARD_KEY);

      if (clipboard) {
        const { zoom, latLng } = JSON.parse(clipboard);
        this.setState({ canPaste: zoom !== undefined && latLng !== undefined });
      } else {
        this.setState({ canPaste: false });
      }
    } catch (e) {
      this.setState({ canPaste: false });
    }
  }

  render() {
    const { copyStatus, pasteStatus, canPaste } = this.state;
    const { zoom, latLng } = this.props;

    return (
      <div className="c-position-control-tooltip">
        <h3>Map position</h3>
        <label htmlFor="zoom-input" title="Zoom">
          Zoom:
          <input
            type="text"
            id="zoom-input"
            value={zoom}
            onChange={e => this.onChangeZoom(+e.target.value)}
          />
        </label>
        <label htmlFor="lat-input" title="Latitude">
          Latitude:
          <input
            type="text"
            id="lat-input"
            value={latLng && latLng[0]}
            onChange={e => this.onChangeLatLng([
              Number.isNaN(+e.target.value) ? latLng[0] : +e.target.value,
              latLng[1]
            ])}
          />
        </label>
        <label htmlFor="lng-input" title="Longitude">
          Longitude:
          <input
            type="text"
            id="lng-input"
            value={latLng && latLng[1]}
            onChange={e => this.onChangeLatLng([
              latLng[0],
              Number.isNaN(+e.target.value) ? latLng[1] : +e.target.value,
            ])}
          />
        </label>
        <div className="buttons">
          <button
            type="button"
            className="c-new-button -transparent -dark -compressed"
            onClick={this.onClickCopy}
          >
            {copyStatus}
          </button>
          { canPaste && (
            <button
              type="button"
              className="c-new-button -transparent -dark -compressed"
              onClick={this.onClickPaste}
            >
              {pasteStatus}
            </button>
          )}
        </div>
      </div>
    );
  }
}

PositionControlTooltip.propTypes = {
  zoom: PropTypes.number.isRequired,
  latLng: PropTypes.arrayOf(PropTypes.number).isRequired,
  setZoom: PropTypes.func.isRequired,
  setLatLng: PropTypes.func.isRequired,
  toggleTooltip: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  zoom: state.nexlocageetool.map.zoom,
  latLng: state.nexlocageetool.map.center
});

const mapDispatchToProps = {
  toggleTooltip,
  setZoom: setMapZoom,
  setLatLng: setMapCenter
};

export default connect(mapStateToProps, mapDispatchToProps)(PositionControlTooltip);
