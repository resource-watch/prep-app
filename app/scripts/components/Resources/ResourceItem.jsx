import Thumbnail from '../Thumbnails/Thumbnail';

export default function ResourceItem(props) {
  const { data } = props;

  return (
    <div className="columns small-12 medium-4">
      <div className="c-article-module">
        <Thumbnail
          url={data.url}
          src={data.image}
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
