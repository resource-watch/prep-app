import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({ user }) => {
  const { photo, name } = user;

  if (photo && photo !== '') {
    return (
      <div
        className="user-avatar"
        style={{ backgroundImage: `url(${photo})` }}
      />
    )
  }

  return (
    <div className="user-initials">
      {name[0]}
    </div>
  );
};

Avatar.propTypes = {
  user: PropTypes.object.isRequired
};

export default Avatar;
