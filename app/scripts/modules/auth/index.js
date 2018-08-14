import { connect } from 'react-redux';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { setConfig } from 'widget-editor';

import { browserHistory } from 'react-router';
import actions from './auth-actions';
import initialState from './auth-reducer-initial-state';
import * as reducers from './auth-reducer';

const mapStateToProps = state => ({ session: state.auth.session });

class AuthContainer extends Component {
  componentWillMount() {
    const { location } = this.props;
    const { token } = location;

    if (token) {
      this.handleAuthenticationAction();
      localStorage.setItem('token', token);
    } else {
      browserHistory.push('/');
    }

    // We update the widget editor's config
    setConfig({ userToken: token || null });
  }

  handleAuthenticationAction() {
    const { logInSuccess } = this.props;
    logInSuccess(true);
  }

  render() {
    return false;
  }
}

AuthContainer.propTypes = {
  location: PropTypes.object.isRequired,
  logInSuccess: PropTypes.func.isRequired
};

export { actions, reducers, initialState };

export default connect(mapStateToProps, actions)(AuthContainer);
