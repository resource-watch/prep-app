import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { toastr } from 'react-redux-toastr';

// services
import UserService from 'services/user-service';

import Avatar from 'components/avatar';
import Icon from 'components/ui/Icon';
import UserOptions from 'components/user-options/user-options-component';

// styles
import './user-style.scss';

class User extends React.PureComponent {
  static handleLogOut(e) {
    if (e) e.preventDefault();

    UserService.logout()
      .then(() => {
        localStorage.removeItem('token');
        window.location.href = `/logout?callbackUrl=${window.location.href}`;
      })
      .catch(({ errors }) => {
        const { status, details } = errors;
        console.error(status, details);

        toastr.error('Ops, something went wrong.', details);
      });
  }

  render() {
    const {
      handleHover,
      active,
      session,
      data
    } = this.props;

    return (
      <div
        className="c-user"
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
      >
        { session && !isEmpty(data) ?
          <Avatar user={data} /> :
          (
            <div className="user-empty">
              <Icon name="icon-user" className="-extra-large" />
            </div>
          )
        }
        { active &&
          <UserOptions handleLogOut={e => User.handleLogOut(e)} session={session} data={data} />
        }
      </div>
    );
  }
}

User.propTypes = {
  handleHover: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  session: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired
};

export default User;
