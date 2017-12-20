import { Component, createElement } from 'react';

import DatasetFilterComponent from './dataset-filter-component';

class DatasetFilterContainer extends Component {
  render() {
    return createElement(DatasetFilterComponent, {
      ...this.props
    });
  }
}


export default DatasetFilterContainer;
