import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import sortBy from 'lodash/sortBy';

import Tooltip from 'rc-tooltip/dist/rc-tooltip';
import Icon from 'components/ui/Icon';

import 'rc-tooltip/assets/bootstrap_white.css';
import './legend-multi-layer-selector-styles.scss';

class LegendMultiLayerSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibilityHover: false,
      visibilityClick: false
    }

    this.onChangeLayer = this.onChangeLayer.bind(this);
  }

  toggleVisibilityOnClick(visible) {
    this.setState({visibilityHover: false});
    this.setState({visibilityClick: visible});
    this.props.onVisibleChange({isLayerVisible: visible});
  }

  onChangeLayer(layer) {
    this.props.onMultiLayer({
      layerId: layer.id,
      id: layer.dataset
    });
  }

  render() {
    const {
      layerSpec,
      isLayerVisible,
      isTooltipOpen
    } = this.props;

    const {visibilityClick, visibilityHover} = this.state;

    const buttonClass = classnames({
      '-active': isLayerVisible
    });

    const tooltipContentClick = (
      <div className="tooltip-content">
        <h5 className="title">Layers</h5>

        <ul className="layer-list">
          {sortBy(layerSpec.layers, 'name').map((l) => {
            const liClass = classnames({
              '-active': layerSpec.id === l.id
            });

            return (
              <li
                key={l.id}
                className={liClass}
              >
                <button onClick={() => this.onChangeLayer(l)}>
                  {l.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );

    const tooltipContentHover = (
      <div className="tooltip-content">
        <h5 className="title">Layers</h5>
      </div>
    );

    return (
      <div className="c-legend-multi-layer-selector">
        <Tooltip
          overlay={tooltipContentClick}
          placement="bottom"
          trigger={'click'}
          overlayClassName="c-legend-multi-layer-selector"
          onVisibleChange={visible => this.toggleVisibilityOnClick(visible)}
        >
          <Tooltip
            visible={!visibilityClick && visibilityHover}
            overlay={tooltipContentHover}
            placement="bottom"
            trigger={isTooltipOpen ? '' : 'hover'}
            mouseEnterDelay={0.4}
            onVisibleChange={visible=> this.setState({visibilityHover: visible})}
          >
            <button
              type="button"
              className={buttonClass}
            >
              <Icon name="icon-layers" className="-normal" />
            </button>
          </Tooltip>
        </Tooltip>
      </div>
    );
  }
}

LegendMultiLayerSelector.propTypes = {
  layerSpec: PropTypes.object,
  onMultiLayer: PropTypes.func
};

export default LegendMultiLayerSelector;
