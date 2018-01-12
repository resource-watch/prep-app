import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import { SimpleSelect } from 'react-selectize';
import 'react-selectize/themes/index.css';
import './legend-nexgddp-toolbar-style.scss';

class LegendNexGDDPToolbar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      temporalResolution: null,
      temporalResolutionOptions: null,
      period: null,
      periodsOptions: null,
      scenario: null,
      scenariosOptions: null
    };

    this.updatingPeriods = this.updatingPeriods.bind(this);
    this.onResolutionChange = this.onResolutionChange.bind(this);
    this.onPeriodChange = this.onPeriodChange.bind(this);
    this.onScenarioChange = this.onScenarioChange.bind(this);
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
      .then(json => this.updatingCombos(json))
      .catch(error => console.error(error));
  }

  onResolutionChange(temporalResolution) {
    this.setState({ temporalResolution }, this.updatingPeriods);
  }

  onPeriodChange(period) {
    this.setState({ period });
  }

  onScenarioChange(scenario) {
    this.setState({ scenario });
  }

  updatingPeriods() {
    const periodsOptions = find(this.state.temporalResolutionOptions, {
      value: this.state.temporalResolution.value
    }).periods.map(p => ({ label: p.label, value: p.id }));
    this.setState({ period: periodsOptions[0], periodsOptions });
  }

  updatingCombos(data) {
    // Temporal resolution (decadal, 30 years)
    const temporalResolutionOptions = data.temporalResolution.map(t => ({ label: t.label, value: t.id, periods: t.periods }));
    // Scenarios
    const scenariosOptions = data.scenarios.map(s => ({ label: s.label, value: s.id }));

    this.setState({
      temporalResolution: temporalResolutionOptions[0],
      temporalResolutionOptions,
      scenario: scenariosOptions[0],
      scenariosOptions
    }, this.updatingPeriods);
  }

  render() {
    const {
      temporalResolution,
      temporalResolutionOptions,
      period,
      periodsOptions,
      scenario,
      scenariosOptions
    } = this.state;

    return (
      <div className="c-legend-nexgddp-toolbar">
        {temporalResolutionOptions && <SimpleSelect
          name="temporal_resolution"
          value={temporalResolution}
          options={temporalResolutionOptions}
          onValueChange={this.onResolutionChange}
          theme="material"
          hideResetButton
          tether
        />}
        {periodsOptions && <SimpleSelect
          name="periods"
          value={period}
          options={periodsOptions}
          onValueChange={this.onPeriodChange}
          theme="material"
          hideResetButton
          tether
        />}
        {scenariosOptions && <SimpleSelect
          name="scenario"
          value={scenario}
          options={scenariosOptions}
          onValueChange={this.onScenarioChange}
          theme="material"
          hideResetButton
          tether
        />}
      </div>
    );
  }
}

LegendNexGDDPToolbar.propTypes = {
  layerSpec: PropTypes.object
};

export default LegendNexGDDPToolbar;
