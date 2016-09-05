import React from 'react';
import Article from '../Content/Article';
import Thumbnail from '../Thumbnails/Thumbnail';


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
                    url={partner.url}
                    src={config.apiUrl + partner.images.thumbnail}
                    alt={partner.name}
                    border={'neutral'}
                  />
                  <h3>{partner.name}</h3>
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
