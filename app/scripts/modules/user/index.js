import { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { setConfig } from 'widget-editor';

import { browserHistory } from 'react-router';

import UserService from 'services/user-service';

import authActions from '../auth/auth-actions';
import actions from './user-actions';
import * as reducers from './user-reducer';
import initialState from './user-initial-state';
import UserComponent from './user-component';

const allActions = Object.assign({}, actions, authActions);

const mapStateToProps = state => ({
  active: state.user.active,
  session: state.auth.session,
  data: state.user.data
});

class UserContainer extends Component {
  constructor(props) {
    super(props);

    this.handleHover = this.handleHover.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentDidMount() {
    const { data } = this.props;
    if (!isEmpty(data)) return;
    this.handleUserData();
  }

  handleUserData() {
    const {
      session, setUserToken, updateUserData,
      getUserFavourites, getUserCollections
    } = this.props;
    const { token } = localStorage;
    if (!(session || token)) return;

    const userDataPromise = UserService.getSessionUserData(token);
    setUserToken(`Bearer ${token}`);

    userDataPromise
      .then((data) => {
        updateUserData(data);
        getUserFavourites();
        getUserCollections();
      })
      .catch(({ errors }) => {
        const { status, details } = errors;
        console.error(status, details);
        this.handleLogOut();
      });
  }

  handleLogOut(e) {
    const { updateUserData, logOutSuccess } = this.props;
    if (e) e.preventDefault();
    localStorage.removeItem('token');
    updateUserData({});
    logOutSuccess(false);
    setConfig({ userToken: null });
    browserHistory.push('/');
  }

  handleHover(state) {
    const { toggleActive } = this.props;
    toggleActive(state);
  }

  render() {
    return createElement(UserComponent, {
      ...this.props,
      handleHover: this.handleHover,
      handleLogOut: this.handleLogOut
    });
  }
}

UserContainer.propTypes = {
  toggleActive: PropTypes.func.isRequired,
  logOutSuccess: PropTypes.func.isRequired,
  updateUserData: PropTypes.func.isRequired,
  setUserToken: PropTypes.func.isRequired,
  getUserFavourites: PropTypes.func.isRequired,
  getUserCollections: PropTypes.func.isRequired,
  session: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired
};

export { allActions, reducers, initialState };

export default connect(mapStateToProps, allActions)(UserContainer);
