import React from 'react';
import Article from '../Content/Article';
import Thumbnail from '../Thumbnails/Thumbnail';


function Partners(props) {

  return (
    <div className="c-partners">
      <Article grid="small-12">
        <div className="row align-stretch">
          {props.data.map((partner, i)=>{
            return (
              <div className="columns small-12 medium-4" key={i}>
                <div className="c-article-module">
                  <Thumbnail
                    url={partner.url}
                    src={config.apiUrl + partner.logo_large}
                    alt={partner.name}
                    border={'neutral'}
                  />
                  <h3>{partner.name}</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam egestas sollicitudin pulvinar. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc pharetra, tortor a imperdiet ultrices, nunc augue ornare lacus, quis ultrices sem lorem id sapien. Sed sodales vitae nisl ut consectetur.</p>
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
