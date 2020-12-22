import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import './legend-nexlocagee-toolbar-style.scss';

class LegendNexLocaGeeToolbar extends PureComponent {
  static propTypes = {
    datasetId: PropTypes.string,
    defaultDatasetType: PropTypes.shape({}),
    defaultPeriod: PropTypes.shape({}),
    defaultScenario: PropTypes.shape({}),
    nexLocaGeeDatasets: PropTypes.arrayOf(PropTypes.shape({})),
    layers: PropTypes.arrayOf(PropTypes.shape({})),
    onMultiLayer: PropTypes.func,
  }

  static defaultProps = {
    datasetId: null,
    defaultDatasetType: null,
    defaultPeriod: null,
    defaultScenario: null,
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
      datasetType: null,
      datasetTypeOptions: null,
      period: null,
      periodsOptions: null,
      scenario: null,
      scenariosOptions: null
    };

    this.onDatasetTypeChange = this.onDatasetTypeChange.bind(this);
    this.onPeriodChange = this.onPeriodChange.bind(this);
    this.onScenarioChange = this.onScenarioChange.bind(this);
  }

  componentDidMount() {
    this.updatingCombos();
  }

  onDatasetTypeChange(datasetType) {
    const { datasetId, onMultiLayer } = this.props;
    const { period, scenario } = this.state;

    const dataset = this.getDataset(datasetId);
    const { metadata } = dataset;
    const { info } = metadata[0];
    const datasetTypeId = info[datasetType.value][scenario.value];

    const { layer: layers } = this.getDataset(datasetTypeId);
    const activeLayer = layers.find(({ layerConfig }) => layerConfig.order === period.value);

    this.setState({ datasetType, activeLayer }, () => {
      onMultiLayer({
        ...this.state,
        id: activeLayer.dataset,
        layerId: activeLayer.id,
        previousId: datasetId,
        datasetType,
      });
    });
  }

  onPeriodChange(period) {
    const { value } = period;
    const { onMultiLayer, layers } = this.props;
    const activeLayer = layers.find(({ layerConfig }) => layerConfig.order === value);

    this.setState({ period, activeLayer }, () => {
      onMultiLayer({
        ...this.state,
        id: activeLayer.dataset,
        layerId: activeLayer.id,
        period,
      });
    });
  }

  onScenarioChange(scenario) {
    const { datasetId, defaultDatasetType, onMultiLayer } = this.props;
    const { period } = this.state;
    const { value } = scenario;

    const dataset = this.getDataset(datasetId);
    const { metadata } = dataset;
    const { info } = metadata[0];
    const scenarioDatasetId = info[defaultDatasetType.value][value];

    const { layer: layers } = this.getDataset(scenarioDatasetId);
    const activeLayer = layers.find(({ layerConfig }) => layerConfig.order === period.value);

    this.setState({ scenario, activeLayer }, () => {
      onMultiLayer({
        ...this.state,
        id: activeLayer.dataset,
        layerId: activeLayer.id,
        previousId: datasetId,
        scenario,
      });
    });
  }

  getDataset = (datasetId) => {
    const { nexLocaGeeDatasets } = this.props;
    return nexLocaGeeDatasets.find(({ id }) => id === datasetId);
  }

  updatingCombos() {
    const { datasetId, defaultPeriod, defaultScenario, layers, onMultiLayer } = this.props;
    const dataset = this.getDataset(datasetId);
    const { metadata } = dataset;
    const { info } = metadata[0];
    const { absolute } = info;
    const isAbsolute = datasetId === absolute.low || datasetId === absolute.high;

    // Period
    const periodsOptions = layers.map(
        ({ layerConfig }) => ({
          label: `${layerConfig.order - 15}-${layerConfig.order + 15}`,
          value: layerConfig.order,
        })
      )
      .sort((a, b) => (a.value - b.value));
    const period = defaultPeriod || periodsOptions[0];

    // Dataset types: absolute or change
    const datasetTypeOptions = [{ label: 'Absolute', value: 'absolute' }, { label: 'Change', value: 'change' }];
    const datasetType = isAbsolute ? datasetTypeOptions[0] : datasetTypeOptions[1];

    // Scenarios: always are two; high and low
    const scenariosOptions = [{ label: 'Low emissions', value: 'low' }, { label: 'High emissions', value: 'high' }];
    const scenario = defaultScenario || scenariosOptions[0];

    const activeLayer = layers.find(({ layerConfig }) => layerConfig.order === period.value);

    this.setState({
      datasetType,
      datasetTypeOptions,
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
      datasetType,
      datasetTypeOptions,
      period,
      periodsOptions,
      scenario,
      scenariosOptions
    } = this.state;

    return (
      <div className="c-legend-nexgddp-toolbar">
        {periodsOptions && (
          <Select
            name="datasetType"
            value={datasetType}
            options={datasetTypeOptions}
            onChange={this.onDatasetTypeChange}
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
