import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Icon from 'components/ui/Icon';
import DatasetInfo from './explore-dataset-info';
import ExploreMap from './explore-map';

class ExplorePage extends PureComponent {
  componentWillMount() {
    this.props.initialURLParams();
  }

  componentDidMount() {
    this.props.updateURLParams();
    this.props.fetchLocations();
    this.props.fetchDatasets();
    this.props.fetchCoreDatasets();
  }

  render() {
    const { selectedDataset, toggleInfo, embed } = this.props;

    const infoClassNames = classnames({
      '-embed': embed,
      '-open': selectedDataset
    });

    return (
      <div className="l-explore -theme-2">
        {/* Datasets panel info */}
        <div className={`c-info-sidebar ${infoClassNames}`}>
          {selectedDataset &&
            <div className="actions">
              <div>
                <button
                  className="toggle-status"
                  onClick={() => toggleInfo(selectedDataset)}
                >
                  <Icon name="icon-arrow-left" className="-medium" />
                </button>
              </div>
            </div>
          }

          <DatasetInfo />
        </div>

        {/* Map */}
        <ExploreMap />
      </div>
    );
  }
}

ExplorePage.defaultProps = {
  currentTab: 'core_datasets',
  fetchLocations: () => {},
  fetchDatasets: () => {},
  fetchCoreDatasets: () => {},
  getDatasetsByGraph: () => {}
};

ExplorePage.propTypes = {
  embed: PropTypes.bool,
  selectedDataset: PropTypes.object,
  fetchDatasets: PropTypes.func,
  toggleInfo: PropTypes.func,
  initialURLParams: PropTypes.func,
  updateURLParams: PropTypes.func
};

export default ExplorePage;
