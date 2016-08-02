import React, { Component } from 'react';
import {lory} from 'lory.js';

class PartnersLogos extends Component {

  componentDidMount() {
    if (!this.props.data.length) {
      this.props.getPartners();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.refs.slider && !this.slider) {
      this.slider = lory(this.refs.slider, {infinite: 5});
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(this.slider.next, 7000);
    }
  }

  render() {
    const partners = this.props.data.map(d => (
      <li className="js_slide" key={`partner-slider-${d.id}`}>
        <a href={d.url} rel="noreferrer" target="_blank" className="logo">
          <img
            src={config.apiUrl + d.logo}
            width={d.logo_size.width}
            height={d.logo_size.height}
            style={{width: d.logo_size.width / 2, height: d.logo_size.height / 2}}
            alt={d.name}
          />
        </a>
      </li>
    ));

    return (
      <div ref="slider" className="c-partners-logos slider js_slider">
        <div className="frame js_frame">
          <ul className="slides js_slides">
            {partners}
          </ul>
        </div>
      </div>
    );
  }

}

PartnersLogos.defaultProps = {
  data: []
};

PartnersLogos.propTypes = {
  // Define the partners list
  data: React.PropTypes.array,
  // Define the function to get the partners list
  getPartners: React.PropTypes.func.isRequired
};

export default PartnersLogos;
