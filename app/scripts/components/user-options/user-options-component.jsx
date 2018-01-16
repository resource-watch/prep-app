import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import './user-options-style.scss';

function UserOptions(props) {
  const token = localStorage.getItem('token');

  return (
    <div className="c-user-options">
      { props.session && !isEmpty(props.data) ?
        <ul className="user-options-list">
          <li>
            <a href={`/myprep/auth?token=${token}`} rel="noreferrer noopener" >Profile</a>
          </li>
          <li>
            <Link to="/" onClick={props.handleLogOut}>Logout</Link>
          </li>
        </ul>
        :
        <ul className="user-options-list">
          <li>
            <a
              href={`${process.env.RW_API_LOGIN_URL}/facebook?callbackUrl=${process.env.CALLBACK_URL}&origin=${process.env.APPLICATIONS}&token=true&application=prep`}
            >Facebook</a>
          </li>
          <li>
            <a
              href={`${process.env.RW_API_LOGIN_URL}/google?callbackUrl=${process.env.CALLBACK_URL}&origin=${process.env.APPLICATIONS}&token=true&application=prep`}
            >Google</a>
          </li>
          <li>
            <a
              href={`${process.env.RW_API_LOGIN_URL}/twitter?callbackUrl=${process.env.CALLBACK_URL}&origin=${process.env.APPLICATIONS}&token=true&application=prep`}
            >Twitter</a>
          </li>
        </ul>
      }
    </div>
  );
}

UserOptions.propTypes = {
  session: PropTypes.bool.isRequired,
  handleLogOut: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

export default UserOptions;
