import React from 'react';
import Article from '../Content/Article';
import Thumbnail from '../Thumbnails/Thumbnail';
import { Link } from 'react-router';

function Partners(props) {
  return (
    <div className="c-partners">

      <Article grid="small-12">
        <div className="row align-center">
          <div className="column small-12"><h2>Founding parterns</h2></div>
        </div>
        <div className="row align-stretch">
          {props.foundingPartners.map((partner, i) => {
            return (
              <div className="columns small-12 medium-4" key={i}>
                <div className="c-article-module">
                  <Thumbnail
                    src={config.apiUrl + partner.images.thumbnail}
                    alt={partner.name}
                    border={'neutral'}
                  />
                  <h3 className="partner-name">{partner.name}</h3>
                  <p className="partner-desc">{partner.description}</p>
                  <Link to={`/partners/${partner.id}`} className="partner-link">Read more</Link>
                </div>
              </div>
            );
          })}
        </div>
      </Article>

      <Article grid="small-12">
        <div className="row">
          <div className="column small-12"><h2>Parterns</h2></div>
        </div>
        <div className="row align-stretch">
          {props.partners.map((partner, i) => {
            return (
              <div className="columns small-12 medium-4" key={i}>
                <div className="c-article-module">
                  <Thumbnail
                    src={config.apiUrl + partner.images.thumbnail}
                    alt={partner.name}
                    border={'neutral'}
                  />
                  <h3 className="partner-name">{partner.name}</h3>
                  <p className="partner-desc">{partner.description}</p>
                  <Link to={`/partners/${partner.id}`} className="partner-link">Read more</Link>
                </div>
              </div>
            );
          })}
        </div>
      </Article>
    </div>
  );
}

export default Partners;
