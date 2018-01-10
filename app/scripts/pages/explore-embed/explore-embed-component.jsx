import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Icon from 'components/ui/Icon';
import DatasetInfo from './explore-dataset-info';
import ExploreMap from './explore-map';

class ExplorePage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isSidebarHidden: props.isSidebarHidden
    };
  }

  componentWillMount() {
    this.props.initialURLParams();
  }

  componentDidMount() {
    this.props.updateURLParams();
    this.props.fetchDatasets();
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
  isSidebarHidden: false,
  fetchDatasets: () => {}
};

ExplorePage.propTypes = {
  embed: PropTypes.bool,
  selectedDataset: PropTypes.object,
  isSidebarHidden: PropTypes.bool,
  fetchDatasets: PropTypes.func,
  toggleInfo: PropTypes.func,
  initialURLParams: PropTypes.func,
  updateURLParams: PropTypes.func
};

export default ExplorePage;
