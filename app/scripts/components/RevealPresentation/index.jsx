import React from 'react';
import Reveal from 'reveal.js';
import ShareModal from '../../../Modal/ShareModal';


class RevealPresentation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalShare: false,
      shareUrl: '',
      shareTitle: '',
      widgetSlug: ''
    };
    this.setShareModal = this.setShareModal.bind(this);
  }

  componentDidMount() {
    // Add event listeners
    this.initializeReveal();
  }

  componentWillUnmount() {
    // Remove event listeners
  }

  setShareModal(url, section, widgetSlug) {
    this.setState({
      modalShare: true,
      shareUrl: url,
      shareTitle: `Share this ${section}`,
      widgetSlug
    });
  }

  initializeReveal() {
    Reveal.initialize({
      controls: false,
      progress: false,
      slideNumber: false,
      history: true,
      keyboard: true,
      overview: true,
      center: true,
      touch: true,
      loop: false,
      hideAddressBar: true, // Hides the address bar on mobile devices
      transition: 'slide', // none/fade/slide/convex/concave/zoom
      transitionSpeed: 'default', // default/fast/slow
    });
    // Slide number formatting can be configured using these variables:
    //  "h.v":  horizontal . vertical slide number (default)
    //  "h/v":  horizontal / vertical slide number
    //    "c":  flattened slide number
    //  "c/t":  flattened slide number / total slides
    Reveal.slide(0, 0);
    Reveal.configure({ slideNumber: 'c/t' });
    // Reveal.addEventListener('ready', (event) => this.updateSlidesInfo(event).bind(this));
    // Reveal.addEventListener('slidechanged', (event) => this.updateSlidesInfo(event).bind(this));
  }
  goToSlide(indexh, indexv) {
    Reveal.slide(indexh, indexv);
  }

  render() {
    return (<div className="reveal">
      {this.props.children}

      <div className="reveal-controls -horizontal -left">
        <div className="navigate-container">
          <a href="#" className="navigate-left"> Prev Chapter </a>
        </div>
      </div>
      <div className="reveal-controls -horizontal -right">
        <div className="navigate-container">
          <a href="#" className="navigate-right"> Next Chapter </a>
        </div>
      </div>
      <div className="reveal-controls -vertical">
        <div className="navigate-container">
          <a href="#" className="navigate-up">
          </a>
        </div>
        <div className="navigate-container">
          <a href="#" className="navigate-down">
          </a>
        </div>
      </div>
      <div className="reveal-actions">
        <div className="index">
          <div className="menu-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <a id="sliderTitles" href="#">Start</a>
        </div>
        <div className="toolbar">
          <a href="#" className="download">Download</a>
          <a style={{ cursor: 'pointer' }} className="share coming-soon" onClick={() => this.setShareModal('http://climateserv.nsstc.nasa.gov', 'map')}>Share</a>
        </div>
      </div>
      <ShareModal
        title={this.state.shareTitle}
        url={this.state.shareUrl}
        opened={this.state.modalShare}
        close={() => this.setState({ modalShare: false })}
        widgetSlug={this.state.widgetSlug}
      />
    </div>);
  }
}

RevealPresentation.propTypes = {
  /**
   * Define the content of the reveal presentation
   * Required
   */
  children: React.PropTypes.any,
  /**
   * Define the content of the reveal presentation
   * Required
   */
  slideTitles: React.PropTypes.array
};

export default RevealPresentation;
