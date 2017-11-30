import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import Icon from 'components/ui/Icon';
import UserOptions from 'components/user-options/user-options-component';

// styles
import './user-style.scss';

class User extends PureComponent {
  render() {
    const {
      handleHover,
      active,
      session,
      data,
      handleLogOut
    } = this.props;
    return (
      <div
        className="c-user"
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
      >
        { session && !isEmpty(data) ?
          <div className="user-avatar" style={{ backgroundImage: `url(${data.photo})` }} />
          :
          <div className="user-empty">
            <Icon name="icon-nav-user" className="-bigger" />
          </div>
        }
        { active &&
          <UserOptions handleLogOut={e => handleLogOut(e)} session={session} data={data} />
        }
      </div>
    );
  }
}

User.propTypes = {
  handleHover: PropTypes.func.isRequired,
  handleLogOut: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  session: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired
};

User.defaultProps = {
  data: {}
};

export default User;
