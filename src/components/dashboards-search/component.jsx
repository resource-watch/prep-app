import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

const DashboardSearch = ({ setSearchTerm }) => {
  const handleSearch = useCallback((e) => {
    setSearchTerm(e.currentTarget.value);
  }, []);

  return (
    <div>
      <div className="row">
        <div className="columns small-10 small-offset-1">
          <div className="c-form-container -inline">
            <label>Search: </label>
            <input
              type="search"
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

DashboardSearch.propTypes = {
  setSearchTerm: PropTypes.func.isRequired,
};

export default DashboardSearch;
