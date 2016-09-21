import React from 'react';
import Reveal from 'reveal.js';
import Modal from '../Modal/Modal';
import MainNav from '../../components/Navigation/MainNav';
import { Link } from 'react-router';
import logoImage from '../../../images/prep-logo.png';


class RevealPresentation extends React.Component {

  constructor() {
    super();
    this.state = {
      modalPresentation: false
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
    Reveal.configure({ slideNumber: 'c/t' });
    // Reveal.addEventListener('ready', (event) => this.updateSlidesInfo(event).bind(this));
    // Reveal.addEventListener('slidechanged', (event) => this.updateSlidesInfo(event).bind(this));
  }

  goToSlide(indexh, indexv) {
    this.setState({ modalPresentation: false });
    Reveal.slide(indexh, indexv);
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
        <header className="l-header -float">
          <div className="l-header-nav -dark">
            <div className="row align-middle">
              <div className="column small-10 medium-4">
                <Link to={'/'} className="logo">
                  <img src={logoImage} alt="Partnership for Resilience and Preparedness" />
                </Link>
              </div>
              <div className="column small-2 medium-8">
                <MainNav />
              </div>
            </div>
          </div>
        </header>

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
              <div className="menu-icon" onClick={() => this.setState({ modalPresentation: true })}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <a id="sliderTitles">{this.props.slideTitles[this.getCurrentSlideIndex().indexh][this.getCurrentSlideIndex().indexv] || 'Start'}</a>
            </div>
            <div className="toolbar">
              <a className="download">Download</a>
              <a className="share coming-soon">Share</a>
            </div>
          </div>
        </div>
        {this.state.modalPresentation &&
        <Modal
          opened={this.state.modalPresentation}
          close={() => this.setState({ modalPresentation: false })}
          className="presentation"
        >
          <h1 className="title" onClick={() => this.goToSlide(0, 0)}>Table of
            contents</h1>
          {
            this.props.slideTitles.map((slide, index) => {
              return (
                <ul className="index">
                  <li>
                    <a style={{ cursor: 'pointer' }} onClick={() => this.goToSlide(index, 0)}>{slide[0] }</a>
                  </li>
                  {slide.map((subslide, subindex) => {
                    return (
                      <ul className="-no-bullet">
                        <li>
                          <a style={{ cursor: 'pointer' }} onClick={() => this.goToSlide(index, subindex)}>{subslide}</a>
                        </li>
                      </ul>
                    );
                  })
                  }
                </ul>
              );
            })
          }

        </Modal>
        }
      </div>

    );
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
