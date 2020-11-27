import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import './legend-nexlocagee-toolbar-style.scss';

class LegendNexLocaGeeToolbar extends PureComponent {
  static propTypes = {
    layers: PropTypes.arrayOf(PropTypes.shape({})),
    onMultiLayer: PropTypes.func
  }

  static defaultProps = {
    layers: null,
    onMultiLayer: () => {}
  }

  constructor(props) {
    super(props);

    this.state = {
      activeLayer: null,
      temporalResolution: null,
      temporalResolutionOptions: null,
      period: null,
      periodsOptions: null,
      scenario: null,
      scenariosOptions: null
    };

    this.updatingPeriods = this.updatingPeriods.bind(this);
    this.onPeriodChange = this.onPeriodChange.bind(this);
    this.onScenarioChange = this.onScenarioChange.bind(this);
  }

  componentDidMount() {
    const { layers } = this.props;
    this.updatingCombos(layers);
  }

  onPeriodChange(period) {
    const { value } = period;
    const { onMultiLayer, layers } = this.props;
    const activeLayer = layers.find(({ layerConfig }) => layerConfig.order === value);

    this.setState({ period, activeLayer }, () => {
      onMultiLayer({ ...this.state, id: activeLayer.dataset, layerId: activeLayer.id });
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

  updatingCombos(layers) {
    const periodsOptions = layers.map(({ layerConfig }) => ({ label: layerConfig.order, value: layerConfig.order }))
      .sort((a, b) => (a.value - b.value));
    const period = periodsOptions[0];

    this.setState({
      period,
      periodsOptions,
    })
    // const { layerSpec } = this.props;
    // const {
    //   temp_resolution: propTemporalSolution,
    //   scenario: propScenarioSolution
    // } = layerSpec;

    // // Temporal resolution (decadal, 30 years)
    // const temporalResolutionOptions = data.temporalResolution.map(t => ({ label: t.label, value: t.id, periods: t.periods }));
    // const temporalResolution = temporalResolutionOptions.find(t => t.value === propTemporalSolution) || temporalResolutionOptions[0];

    // // Scenarios
    // const scenariosOptions = data.scenarios.map(s => ({ label: s.label, value: s.id }));
    // const scenario = scenariosOptions.find(s => s.value === propScenarioSolution) || scenariosOptions[0];

    // this.setState({
    //   temporalResolution,
    //   temporalResolutionOptions,
    //   scenario,
    //   scenariosOptions
    // }, this.updatingPeriods);
  }

  render() {
    const {
      period,
      periodsOptions,
      scenario,
      scenariosOptions
    } = this.state;

    return (
      <div className="c-legend-nexgddp-toolbar">
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
