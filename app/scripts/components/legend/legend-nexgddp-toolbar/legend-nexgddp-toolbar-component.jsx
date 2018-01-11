import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SimpleSelect } from 'react-selectize';
import 'react-selectize/themes/index.css';
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
        const dateData = json.temporalResolution.map(t => ({ label: t.label, value: t.id }));
        const scenariosData = json.scenarios.map(s => ({ label: s.label, value: s.id }));
        const scenarios = {
          options: scenariosData,
          selection: scenariosData[0]
        };
        const date = {
          options: dateData,
          selection: dateData[0]
        };
        this.setState({ scenarios, date });
      })
      .catch(error => console.error(error));
  }

  render() {
    const { scenarios, date } = this.state;
    return (
      <div className="c-legend-nexgddp-toolbar">
        {this.state.date && <SimpleSelect
          name="date"
          value={date.selection}
          options={date.options}
          onChange={() => {}}
          theme="material"
          tether
        />}
        {this.state.scenarios && <SimpleSelect
          name="scenario"
          value={scenarios.selection}
          options={scenarios.options}
          onChange={() => {}}
          theme="material"
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
