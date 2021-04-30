import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import './user-options-style.scss';

class UserOptions extends React.Component {
  render() {
    const token = localStorage.getItem('token');
    const {
      session,
      data,
      handleLogOut
    } = this.props;

    return (
      <div className="c-user-options">
        {session && !isEmpty(data) && (
          <ul className="user-options-list">
            <li>
              <a href={`/myprep?token=${token}`}>
                Profile
              </a>
            </li>
            <li>
              <Link to="/" onClick={handleLogOut}>
                Logout
              </Link>
            </li>
          </ul>
        )}
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
