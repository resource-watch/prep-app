import React from 'react';
import PropTypes from 'prop-types';
import Thumbnail from 'components/Thumbnails/Thumbnail';

export default function ResourceItem(props) {
  const { data } = props;

  return (
    <div className="columns small-12 medium-4">
      <div className="c-article-module">
        <Thumbnail
          url={data.url}
          src={data.photo.medium}
          alt={data.title}
          border={'neutral'}
        />

        <h3>{data.title}</h3>
        <p>
          {data.description}
        </p>
        <a href={data.url} target="_blank" rel="noopener noreferrer">{data.url}</a>
      </div>
    </div>
  );
}

ResourceItem.propTypes = {
  data: PropTypes.object
};
