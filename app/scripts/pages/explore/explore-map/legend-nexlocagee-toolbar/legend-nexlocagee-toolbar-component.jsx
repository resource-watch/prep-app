import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import './legend-nexlocagee-toolbar-style.scss';

class LegendNexLocaGeeToolbar extends PureComponent {
  static propTypes = {
    datasetId: PropTypes.string,
    nexLocaGeeDatasets: PropTypes.arrayOf(PropTypes.shape({})),
    layers: PropTypes.arrayOf(PropTypes.shape({})),
    onMultiLayer: PropTypes.func,
  }

  static defaultProps = {
    datasetId: null,
    nexLocaGeeDatasets: null,
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

    this.onPeriodChange = this.onPeriodChange.bind(this);
    this.onScenarioChange = this.onScenarioChange.bind(this);
  }

  componentDidMount() {
    this.updatingCombos();
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
    const { datasetId, onMultiLayer } = this.props;
    const { period } = this.state;
    const { value } = scenario;

    const dataset = this.getDataset(datasetId);
    const { metadata } = dataset;
    const { info } = metadata[0];
    const { change } = info;
    const scenarioDatasetId = change[value];

    const { layer: layers } = this.getDataset(scenarioDatasetId);
    const activeLayer = layers.find(({ layerConfig }) => layerConfig.order === period.value);

    this.setState({ scenario }, () => {
      onMultiLayer({
        ...this.state,
        id: scenarioDatasetId,
        layerId: activeLayer.id,
        previousId: datasetId,
      });
    });
  }

  getDataset = (datasetId) => {
    const { nexLocaGeeDatasets } = this.props;
    return nexLocaGeeDatasets.find(({ id }) => id === datasetId);
  }

  updatingCombos() {
    const { datasetId, layers, onMultiLayer } = this.props;
    const dataset = this.getDataset(datasetId);
    const { metadata } = dataset;
    const { info } = metadata[0];
    const { change } = info;

    const periodsOptions = layers.map(
        ({ layerConfig }) => ({
          label: `${layerConfig.order - 15}-${layerConfig.order + 15}`,
          value: layerConfig.order,
        })
      )
      .sort((a, b) => (a.value - b.value));
    const period = periodsOptions[0];

    // Scenarios: always are two; high and low
    const scenariosOptions = [{ label: 'Low emissions', value: 'low' }, { label: 'High emissions', value: 'high' }];
    const scenario = scenariosOptions.find(({ value }) => datasetId === change[value]) || scenariosOptions[0];
    const activeLayer = layers.find(({ layerConfig }) => layerConfig.order === period.value);

    this.setState({
      period,
      periodsOptions,
      scenario,
      scenariosOptions,
    }, () => {
      onMultiLayer({
        ...this.state,
        id: activeLayer.dataset,
        layerId: activeLayer.id,
      });
    });
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
