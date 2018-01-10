import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ScenarioSelect from 'components/nexgddp-tool/scenario-select/ScenarioSelect';
import DateRangeSelect from 'components/nexgddp-tool/date-range-select/DateRangeSelect';
import './legend-nexgddp-toolbar-style.scss';

class LegendNexGDDPToolbar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      scenarios: null
    };
  }

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
        const scenariosData = json.scenarios.map(s => ({ label: s.label, value: s.id }));
        const scenarios = {
          options: scenariosData,
          selection: scenariosData[0]
        };
        this.setState({ scenarios });
      })
      .catch(error => console.error(error));
  }

  render() {
    console.log(this.state.scenarios);
    return (
      <div className="c-legend-nexgddp-toolbar">
        <DateRangeSelect />
        {this.state.scenarios && <ScenarioSelect scenario={this.state.scenarios} />}
      </div>
    );
  }
}

LegendNexGDDPToolbar.propTypes = {
  layerSpec: PropTypes.object
};

export default LegendNexGDDPToolbar;
