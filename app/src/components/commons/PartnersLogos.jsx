import React, { Component } from 'react';

class PartnersLogos extends Component {

  componentDidMount() {
    if (!this.props.data.length) {
      this.props.getPartners();
    }
  }

  render() {
    const partners = this.props.data.map((d, i) => {
      return (
        <a href={d.url} rel="noreferrer" target="_blank" className="logo" key={i}>
          <img src={`${config.assetsUrl}/${d.logo_file_name}`}
            width={d.logo_size.width}
            height={d.logo_size.height}
            alt={d.name} />
        </a>
      );
    });
    return (
      <div className="c-partners-logos">
        {partners}
      </div>
    );
  }

}

PartnersLogos.defaultProps = {
  data: []
};

export default PartnersLogos;
