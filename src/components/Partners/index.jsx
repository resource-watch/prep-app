import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Article from '../Content/Article';
import Thumbnail from '../Thumbnails/Thumbnail';

function Partners(props) {
  function partnerItem(partner) {
    return (
      <div className="columns small-12 medium-4" key={partner.id}>
        <div className="c-article-module">
          <Thumbnail
            src={process.env.REACT_APP_ASSETS_URL + partner.thumbnail}
            alt={partner.name}
            border="neutral"
          />
          <h3 className="partner-name">{partner.name}</h3>
          <Link to={`/partners/${partner.id}`} className="partner-link">Read more</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="c-partners">

      <Article grid="small-12">
        <div className="row align-center">
          <div className="column small-12"><h2>Founding partners</h2></div>
        </div>
        <div className="row align-stretch">
          {props.foundingPartners.map(partnerItem)}
        </div>
      </Article>

      <Article grid="small-12">
        <div className="row">
          <div className="column small-12"><h2>Partners</h2></div>
        </div>
        <div className="row align-stretch">
          {props.partners.map(partnerItem)}
        </div>
      </Article>
    </div>
  );
}

Partners.propTypes = {
  partners: PropTypes.array,
  foundingPartners: PropTypes.array
};

export default Partners;
