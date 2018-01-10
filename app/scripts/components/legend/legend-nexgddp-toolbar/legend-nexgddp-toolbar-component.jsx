import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ScenarioSelect from 'components/nexgddp-tool/scenario-select/ScenarioSelect';
import DateRangeSelect from 'components/nexgddp-tool/date-range-select/DateRangeSelect';
import './legend-nexgddp-toolbar-style.scss';

class LegendNexGDDPToolbar extends PureComponent {
  componentDidMount() {
    const { layerSpec } = this.props;
    const { layerConfig } = layerSpec;
    const { indicator } = layerConfig;
    const url = `${config.apiUrlRW}/nexgddp/info/${indicator}`;

    fetch(url)
      .then((response) => {
        if (response.ok) return response.json();
        throw Error(response);
      })
      .then((json) => {
        console.log(json);
      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div className="c-legend-nexgddp-toolbar">
        <DateRangeSelect />
        <ScenarioSelect />
      </div>
    );
  }
}

LegendNexGDDPToolbar.propTypes = {
  layerSpec: PropTypes.object
};

export default LegendNexGDDPToolbar;
