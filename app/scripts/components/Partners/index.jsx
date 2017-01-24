import React from 'react';
import Article from '../Content/Article';
import Thumbnail from '../Thumbnails/Thumbnail';
import { Link } from 'react-router';

function Partners(props) {
  return (
    <div className="c-partners">
      <Article grid="small-12">
        <div className="row align-stretch">
          {props.data.map((partner, i) => {
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
          <div className="columns small-12">
            <p>The U.S. Global Change Research Program (USGCRP) will coordinate the U.S. government’s involvement in PREP.</p>
          </div>
        </div>
        <div className="row">
          <div className="columns small-12 medium-4">
            <div className="c-article-module">
              <Thumbnail
                url={'http://www.globalchange.gov/'}
                src={`${config.apiUrl}/system/partners/logos/000/000/013/medium/logo-globalchange-small.png?1473415466`}
                alt={'U.S. Global Change Research Program (USGCRP)'}
                border={'neutral'}
              />
              <h3 className="parter-name">U.S. Global Change Research Program (USGCRP)</h3>
              <p className="partner-desc">Lorem ispum.</p>
              <Link to={'/partners/???'} className="partner-link">Read more</Link>
            </div>
          </div>
        </div>
      </Article>
    </div>
  );
}

export default Partners;
