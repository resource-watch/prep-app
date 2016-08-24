import React from 'react';
import Slider from '../../lib/react-slick/react-slick';

const settings = {
  dots: false,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 7000,
  infinite: true,
  speed: 500,
  slidesToShow: 2
};

class TwitterFeed extends React.Component {

  componentDidMount() {
    if (!this.props.data.length) {
      this.props.getTwitterFeed();
    }
  }

  render() {
    const tweets = this.props.data.map(tweet => {
      return (
        <div className="tweet-item" key={tweet.id}>
          <p>{tweet.text}</p>
        </div>
      );
    });
    return (
      <div className={`c-twitter-feed ${this.props.sliced && '-sliced'}`}>
        <div className="twitter-icon">
          <svg width="22" height="16" viewBox="0 0 22 16"><title>Twitter</title><path d="M17.372 2.64c-.017-.006-.029-.023-.046-.034-.811-.766-1.766-1.132-2.863-1.086l-.034-.08c.011-.006.017-.006.023-.006.994-.234 1.583-.468 1.76-.725.063-.206-.012-.32-.229-.349a5.525 5.525 0 0 0-1.377.337c.526-.337.726-.577.611-.697-.514.017-1.068.28-1.651.8.217-.371.297-.571.24-.606-.274.195-.52.4-.726.623-.44.492-.794.949-1.063 1.366L12 2.217c-.697 1.143-1.183 2.286-1.474 3.452l-.109.085-.022.023a5.503 5.503 0 0 0-1.52-1.331c-.71-.469-1.543-.909-2.503-1.337a21.914 21.914 0 0 0-3.19-1.349c-.005 1.211.584 2.177 1.755 2.88v.023a3.657 3.657 0 0 0-1.2.177c.075 1.126.869 1.897 2.366 2.326l-.006.023a1.712 1.712 0 0 0-1.451.6c.491.971 1.366 1.44 2.628 1.4-.245.131-.445.274-.571.434-.234.24-.309.526-.234.857.274.492.76.72 1.48.686l.04.051-.023.023c-1.24 1.286-2.732 1.869-4.486 1.743L3.452 13c-1.07-.005-2.212-.525-3.452-1.554 1.246 1.806 2.897 3.109 4.943 3.926 2.343.777 4.68.834 7.017.165H12c2.269-.657 4.189-2.011 5.778-4.057.731-1.074 1.188-2.097 1.371-3.074 1.183.04 2.04-.303 2.566-1.034l-.012-.018c-.394.138-1.165.098-2.308-.137v-.131c0-.006 0-.006.005 0 1.252-.143 1.989-.549 2.229-1.223-.874.343-1.737.349-2.589.029-.154-1.189-.708-2.27-1.668-3.252" fill="#FFF" fillRule="evenodd"></path></svg>
        </div>
        <h3 className="-inverse">@{config.twitterUser}</h3>
        <Slider {...settings}>
          {tweets}
        </Slider>
      </div>
    );
  }

}

export default TwitterFeed;
