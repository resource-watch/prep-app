import React from 'react';
import PropTypes from 'prop-types';

// Components
import TreeSelector from 'components/tree-selector/tree-selector';

class DashboardsFilters extends React.PureComponent {
  render() {
    return (
      <div>
        <div className="row">
          <div className="columns small-12 medium-6">
            <TreeSelector
              data={this.props.topics}
              placeholderText="Topics"
              onChange={(_, selectedNodes) => this.props.onChangeTopics(selectedNodes.map(n => n.value))}
            />
          </div>
          <div className="columns small-12 medium-6">
            <TreeSelector
              data={this.props.geographies}
              placeholderText="Geographies"
              onChange={(_, selectedNodes) => this.props.onChangeGeographies(selectedNodes.map(n => n.value))}
            />
          </div>
        </div>
      </div>
    );
  }
}

DashboardsFilters.propTypes = {
  topics: PropTypes.array.isRequired,
  geographies: PropTypes.array.isRequired,
  onChangeTopics: PropTypes.func.isRequired,
  onChangeGeographies: PropTypes.func.isRequired
};

export default DashboardsFilters;
