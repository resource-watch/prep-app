import React from 'react';
import Reveal from 'reveal.js';
import Modal from '../Modal/Modal';

class RevealPresentation extends React.Component {

  constructor() {
    super();
    this.state = {
      modalTable: false
    };
  }

  componentDidMount() {
    // Add event listeners
    this.initializeReveal();
  }

  componentWillUnmount() {
    // Remove event listeners
  }

  getCurrentSlideIndex() {
    const index = Reveal.getIndices(Reveal.getCurrentSlide());
    index.h = index.h ? index.h : 0;
    index.v = index.v ? index.v : 0;
    return { indexh: index.h, indexv: index.v };
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
    Reveal.configure({ slideNumber: 'h.v' });
    // Reveal.addEventListener('ready', (event) => this.updateSlidesInfo(event).bind(this));
    // Reveal.addEventListener('slidechanged', (event) => this.updateSlidesInfo(event).bind(this));
  }

  goToSlide(indexh, indexv) {
    Reveal.slide(indexh, indexv);
  }

  render() {
    return (
      <div className="reveal">
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
          <div className="menu-icon" onClick={() => this.setState({ modalTable: true })}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <a id="sliderTitles" href="#">{this.props.slideTitles[this.getCurrentSlideIndex().indexh][this.getCurrentSlideIndex().indexv] || 'Start'}</a>
        </div>
        <div className="toolbar">
          <a href="#" className="download">Download</a>
          <a href="#" className="share coming-soon">Share</a>
        </div>
      </div>
      {this.state.modalTable &&
        <Modal
          opened={this.state.modalTable}
          close={() => this.setState({ modalTable: false })}
        >
          <h2>Table of contents</h2>

        </Modal>
      }
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
