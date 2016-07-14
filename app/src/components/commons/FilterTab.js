import React from 'react';
import Button from './Button';

function FilterBar(props) {
  return (
    <div className="c-filter-tab">
      <ul>
        <li className="">
          <Button click={props.click}> Topics </Button>
        </li>
        <li className="">
          <Button click={props.click}> Areas </Button>
        </li>
        <li className="">
          <Button click={props.click}> Date </Button>
        </li>
      </ul>
    </div>
  );
}

FilterBar.propTypes = {
  /**
   * Define click handler function
   */
  click: React.PropTypes.func
};

export default FilterBar;
