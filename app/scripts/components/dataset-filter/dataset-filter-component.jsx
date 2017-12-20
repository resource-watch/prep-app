import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import DropdownTreeSelect from 'react-dropdown-tree-select';

// styles
import './dataset-filter-styles.scss';

class DatasetFilter extends PureComponent {
  render() {
    const { showDropdown, placeholderText, data, onChange, classNames } = this.props;
    const datasetFilterClass = classnames({
      'c-dataset-filter': true,
      classNames: !!classNames
    });

    return (
      <div className={datasetFilterClass}>
        <DropdownTreeSelect
          showDropdown={showDropdown}
          placeholderText={placeholderText}
          data={data}
          onChange={((currentNode, selectedNodes) => { onChange(currentNode, selectedNodes); })}
        />
      </div>
    );
  }
}

DatasetFilter.propTypes = {
  data: PropTypes.array.isRequired,
  classNames: PropTypes.string,
  onChange: PropTypes.func,
  placeholderText: PropTypes.string,
  showDropdown: PropTypes.bool
};

DatasetFilter.defaultProps = {
  data: [],
  showDropdown: true,
  onChange: () => {}
};

export default DatasetFilter;
