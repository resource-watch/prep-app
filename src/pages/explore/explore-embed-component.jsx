import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Icon from 'components/ui/Icon';
import DatasetInfo from './explore-dataset-info';
import ExploreMap from './explore-map';

class ExplorePage extends PureComponent {
  static propTypes = {
    embed: PropTypes.bool,
    selectedDataset: PropTypes.object,
    fetchDatasets: PropTypes.func,
    toggleInfo: PropTypes.func,
    initialURLParams: PropTypes.func,
    updateURLParams: PropTypes.func
  }

  static defaultProps = {
    currentTab: 'core_datasets',
    fetchLocations: () => {},
    fetchDatasets: () => {},
    fetchCoreDatasets: () => {},
    getDatasetsByGraph: () => {}
  }

  componentWillMount() {
    const { initialURLParams } = this.props;
    initialURLParams();
  }

  componentDidMount() {
    const { updateURLParams, fetchLocations, fetchDatasets, fetchCoreDatasets } = this.props;
    updateURLParams();
    fetchLocations();
    fetchDatasets();
    fetchCoreDatasets();
  }

  render() {
    const { selectedDataset, toggleInfo, embed } = this.props;

    const infoClassNames = classnames({
      '-embed': embed,
      '-open': selectedDataset
    });

    return (
      <div className="l-explore">
        {/* Datasets panel info */}
        <div className={`c-info-sidebar ${infoClassNames}`}>
          {selectedDataset && (
            <div className="actions">
              <div>
                <button
                  type="button"
                  className="toggle-status"
                  onClick={() => toggleInfo(selectedDataset)}
                >
                  <Icon name="icon-arrow-left" className="-medium" />
                </button>
              </div>
            </div>
          )}

          <DatasetInfo embed={embed} />
        </div>

        {/* Map */}
        <ExploreMap embed={embed} />
      </div>
    );
  }
}

export default ExplorePage;
