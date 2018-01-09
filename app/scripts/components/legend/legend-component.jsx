import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/ui/Icon';
import LegendBasic from './legend-basic/LegendBasic';
import LegendChoropleth from './legend-choropleth/LegendChoropleth';
import LegendGradient from './legend-gradient/LegendGradient';

import './legend-style.scss';

class Legend extends PureComponent {
  render() {
    const { layerSpec, onClose, onInfo } = this.props;
    const { name, legendConfig } = layerSpec;
    const { type, unit } = legendConfig;

    return (
      <div className="c-legend">
        <div className="c-legend-header">
          <h3>{name} {unit && <span>({unit})</span>}</h3>
          {this.props.toolbar && <div className="c-legend-toolbar">
            <button type="button" onClick={() => console.log('opacity')}><Icon name="icon-opacity" className="-normal" /></button>
            <button type="button" onClick={() => onInfo(layerSpec)}><Icon name="icon-info" className="-normal" /></button>
            <button type="button" onClick={() => onClose(layerSpec)}><Icon name="icon-cross" className="-normal" /></button>
          </div>}
        </div>
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
  toolbar: PropTypes.bool,
  onInfo: PropTypes.func,
  onClose: PropTypes.func
};

Legend.defaultProps = {
  toolbar: true,
  onInfo: () => {},
  onClose: () => {}
};

export default Legend;
