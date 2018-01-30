import React from 'react';
import PropTypes from 'prop-types';
import { logEvent } from 'helpers/analytics';
import Thumbnail from 'components/Thumbnails/Thumbnail';

export default function ResourceItem(props) {
  const { data } = props;

  return (
    <div className="columns small-12 medium-4">
      <div className="c-article-module">
        <Thumbnail
          url={data.url}
          src={data.photo.original}
          alt={data.title}
          border={'neutral'}
          analytics={{
            category: 'Resources',
            action: 'Clicks on an external tool'
          }}
        />

        <h3>{data.title}</h3>
        <p>
          {data.description}
        </p>
        <a
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => logEvent('Resources', 'Clicks on an external tool', data.title)}
        >
          {data.url}
        </a>
      </div>
    </div>
  );
}

ResourceItem.propTypes = {
  data: PropTypes.object
};
