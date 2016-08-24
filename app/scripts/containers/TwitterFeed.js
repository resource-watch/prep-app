import { connect } from 'react-redux';
import { getTwitterFeed } from '../actions/twitter';
import TwitterFeed from '../components/TwitterFeed';

const mapStateToProps = (state) => ({
  data: state.twitterFeed.list
});

const mapDispatchToProps = (dispatch) => ({
  getTwitterFeed: () => dispatch(getTwitterFeed())
});

export default connect(mapStateToProps, mapDispatchToProps)(TwitterFeed);
