import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/ui/Icon';
import LegendActions from './legend-actions';
import LegendNexGDDPToolbar from './legend-nexgddp-toolbar';
import LegendBasic from './legend-types/legend-basic/LegendBasic';
import LegendChoropleth from './legend-types/legend-choropleth/LegendChoropleth';
import LegendGradient from './legend-types/legend-gradient/LegendGradient';

import './legend-style.scss';

class Legend extends PureComponent {
  getLegendToolbar() {
    const { layerSpec } = this.props;
    if (layerSpec.provider === 'nexgddp') return (<LegendNexGDDPToolbar layerSpec={layerSpec} />);
    return null;
  }

  render() {
    const { layerSpec, onClose, onInfo } = this.props;
    const { name, legendConfig } = layerSpec;
    const { type, unit } = legendConfig;

    return (
      <div className="c-legend">
        <div className="c-legend-header">
          <h3>{name} {unit && <span>({unit})</span>}</h3>
          {this.props.actions &&
            <LegendActions
              onInfo={() => onInfo(layerSpec)}
              onClose={() => onClose(layerSpec)}
            />}
        </div>
        {this.props.toolbar && this.getLegendToolbar()}
        <div className="c-legend-content">
          {(type === 'basic') && <LegendBasic legendSpec={legendConfig} />}
          {(type === 'choropleth') && <LegendChoropleth legendSpec={legendConfig} />}
          {(type === 'gradient') && <LegendGradient legendSpec={legendConfig} />}
        </div>
      </div>
    );
  }
}

Legend.propTypes = {
  layerSpec: PropTypes.object,
  actions: PropTypes.bool,
  toolbar: PropTypes.bool,
  onInfo: PropTypes.func,
  onClose: PropTypes.func
};

Legend.defaultProps = {
  actions: true,
  toolbar: true,
  onInfo: () => {},
  onClose: () => {}
};

export default Legend;
