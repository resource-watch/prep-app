import React from 'react';
import { Link } from 'react-router';
import { logEvent } from 'helpers/analytics';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import './user-options-style.scss';

class UserOptions extends React.Component {
  constructor(props) {
    super(props);
    this.onClickLink = this.onClickLink.bind(this);
  }

  /**
   * Event handler executed when the user clicks one
   * of the social media links
   * @param {MouseEvent} e Event
   */
  onClickLink(e) { // eslint-disable-line class-methods-use-this
    e.preventDefault();
    logEvent('User account', 'Create an account', e.target.innerText);
    window.location = e.target.href;
  }

  render() {
    const token = localStorage.getItem('token');

    return (
      <div className="c-user-options">
        { this.props.session && !isEmpty(this.props.data) ?
          <ul className="user-options-list">
            <li>
              <a href={`/myprep/auth?token=${token}`} rel="noreferrer noopener" >Profile</a>
            </li>
            <li>
              <Link to="/" onClick={this.props.handleLogOut}>Logout</Link>
            </li>
          </ul>
          :
          <ul className="user-options-list">
            <li>
              <a
                href={`${process.env.RW_API_LOGIN_URL}/facebook?callbackUrl=${process.env.CALLBACK_URL}&origin=${process.env.APPLICATIONS}&token=true&application=prep`}
                onClick={this.onClickLink}
              >Facebook</a>
            </li>
            <li>
              <a
                href={`${process.env.RW_API_LOGIN_URL}/google?callbackUrl=${process.env.CALLBACK_URL}&origin=${process.env.APPLICATIONS}&token=true&application=prep`}
                onClick={this.onClickLink}
              >Google</a>
            </li>
            <li>
              <a
                href={`${process.env.RW_API_LOGIN_URL}/twitter?callbackUrl=${process.env.CALLBACK_URL}&origin=${process.env.APPLICATIONS}&token=true&application=prep`}
                onClick={this.onClickLink}
              >Twitter</a>
            </li>
          </ul>
        }
      </div>
    );
  }
}

UserOptions.propTypes = {
  session: PropTypes.bool.isRequired,
  handleLogOut: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

export default UserOptions;
