import React from 'react';
import PropTypes from 'prop-types';

import { logEvent } from 'helpers/analytics';

import LegendOpacitySelector from 'components/legend/legend-opacity-selector';
import LegendBoundingSelector from 'components/legend/legend-bounding-selector';
import LegendMultiLayerSelector from 'components/legend/legend-multi-layer-selector';
import LegendCloseSelector from 'components/legend/legend-close-selector';
import LegendInfoSelector from 'components/legend/legend-info-selector';
import LegendVisibilitySelector from 'components/legend/legend-visibility-selector';
import Icon from 'components/ui/Icon';

import './legend-actions-style.scss';

class LegendActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpacityVisible: false,
      isLayerVisible: false
    };

    // BINDINGS //
    this.onVisibleChange = this.onVisibleChange.bind(this);
    this.onClickInfo = this.onClickInfo.bind(this);
  }

  /**
   * Event handler executed when the user toggles the
   * info sidebar of a dataset
   * @param {object} layer Layer
   */
  onClickInfo(layer) {
    this.props.onInfo(layer);

    if (!layer.isSelected) {
      logEvent('Explore menu', 'Click for more info', layer.name);
    }
  }

  onVisibleChange(visibility) {
    this.setState(visibility);
  }

  render() {
    const { isOpacityVisible, isLayerVisible } = this.state;
    const { layerSpec, onOpacity, onVisibility, onMultiLayer, onFitBounds, onClose } = this.props;

    const isTooltipOpen = isOpacityVisible || isLayerVisible;

    return (
      <div className="c-legend-actions">
        {layerSpec.layerConfig && layerSpec.layerConfig.bbox &&
          <LegendBoundingSelector
            layerSpec={layerSpec}
            onFitBounds={onFitBounds}
            isTooltipOpen={isTooltipOpen}
          />
        }

        <LegendOpacitySelector
          layerSpec={layerSpec}
          onOpacityChange={onOpacity}
          onVisibleChange={this.onVisibleChange}
          isOpacityVisible={isOpacityVisible}
          isTooltipOpen={isTooltipOpen}
        />

        {layerSpec.provider !== 'nexgddp' && layerSpec.layers.length > 1 &&
          <LegendMultiLayerSelector
            layerSpec={layerSpec}
            onMultiLayer={onMultiLayer}
            onVisibleChange={this.onVisibleChange}
            isLayerVisible={isLayerVisible}
            isTooltipOpen={isTooltipOpen}
          />
        }

        <LegendVisibilitySelector
          layerSpec={layerSpec}
          onVisibility={onVisibility}
          isTooltipOpen={isTooltipOpen}
          isVisible={layerSpec.visibility}
        />

        <LegendInfoSelector
          layerSpec={layerSpec}
          onClickInfo={this.onClickInfo}
          isTooltipOpen={isTooltipOpen}
          isActive={layerSpec.isSelected}
        />

        <LegendCloseSelector
          layerSpec={layerSpec}
          onClose={onClose}
          isTooltipOpen={isTooltipOpen}
        />
      </div>
    );
  }
}

LegendActions.propTypes = {
  layerSpec: PropTypes.object,
  onOpacity: PropTypes.func,
  onVisibility: PropTypes.func,
  onInfo: PropTypes.func,
  onClose: PropTypes.func,
  onMultiLayer: PropTypes.func,
  onFitBounds: PropTypes.func
};

LegendActions.defaultProps = {
  onOpacity: () => {},
  onVisibility: () => {},
  onInfo: () => {},
  onClose: () => {},
  onMultiLayer: () => {},
  onFitBounds: () => {}
};

export default LegendActions;
