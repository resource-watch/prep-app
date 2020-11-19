import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import './legend-nexlocagee-toolbar-style.scss';

class LegendNexLocaGeeToolbar extends PureComponent {
  static propTypes = {
    layerSpec: PropTypes.object,
    onMultiLayer: PropTypes.func
  }

  static defaultProps = {
    layerSpec: {},
    onMultiLayer: () => {}
  }

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

    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Upgrade-Insecure-Requests': 1
      }
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw Error(response);
      })
      .then(json => this.updatingCombos(json))
      .catch(error => console.error(error));
  }

  onResolutionChange(temporalResolution) {
    const { onMultiLayer, layerSpec } = this.props;
    this.setState({ temporalResolution }, () => {
      this.updatingPeriods();
      onMultiLayer({ ...this.state, id: layerSpec.dataset });
    });
  }

  onPeriodChange(period) {
    const { onMultiLayer, layerSpec } = this.props;
    this.setState({ period }, () => {
      onMultiLayer({ ...this.state, id: layerSpec.dataset });
    });
  }

  onScenarioChange(scenario) {
    const { onMultiLayer, layerSpec } = this.props;
    this.setState({ scenario }, () => {
      onMultiLayer({ ...this.state, id: layerSpec.dataset });
    });
  }

  updatingPeriods() {
    const { layerSpec, onMultiLayer } = this.props;
    const { period: propPeriod } = layerSpec;
    const { temporalResolutionOptions, temporalResolution } = this.state;
    const temporalResolutionResult = temporalResolutionOptions.find(t => t.value === temporalResolution.value);
    const periodsOptions = temporalResolutionResult.periods.map(p => ({ label: p.label, value: p.id }));
    const period = periodsOptions.find(s => s.value === (propPeriod || {}).label) || periodsOptions[0];

    this.setState({
      period,
      periodsOptions
    }, () => {
      onMultiLayer({ ...this.state, id: layerSpec.dataset });
    });
  }

  updatingCombos(data) {
    const { layerSpec } = this.props;
    const {
      temp_resolution: propTemporalSolution,
      scenario: propScenarioSolution
    } = layerSpec;

    // Temporal resolution (decadal, 30 years)
    const temporalResolutionOptions = data.temporalResolution.map(t => ({ label: t.label, value: t.id, periods: t.periods }));
    const temporalResolution = temporalResolutionOptions.find(t => t.value === propTemporalSolution) || temporalResolutionOptions[0];

    // Scenarios
    const scenariosOptions = data.scenarios.map(s => ({ label: s.label, value: s.id }));
    const scenario = scenariosOptions.find(s => s.value === propScenarioSolution) || scenariosOptions[0];

    this.setState({
      temporalResolution,
      temporalResolutionOptions,
      scenario,
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
        {temporalResolutionOptions && (
          <Select
            name="temporal_resolution"
            value={temporalResolution}
            options={temporalResolutionOptions}
            onChange={this.onResolutionChange}
            menuPosition="fixed"
            menuShouldBlockScroll
            className="c-toolbar-select"
            classNamePrefix="react-select"
          />
        )}
        {periodsOptions && (
          <Select
            name="periods"
            value={period}
            options={periodsOptions}
            onChange={this.onPeriodChange}
            menuPosition="fixed"
            menuShouldBlockScroll
            className="c-toolbar-select"
            classNamePrefix="react-select"
          />
        )}
        {scenariosOptions && (
          <Select
            name="scenario"
            value={scenario}
            options={scenariosOptions}
            onChange={this.onScenarioChange}
            menuPosition="fixed"
            menuShouldBlockScroll
            className="c-toolbar-select"
            classNamePrefix="react-select"
          />
        )}
      </div>
    );
  }
}

export default LegendNexLocaGeeToolbar;
