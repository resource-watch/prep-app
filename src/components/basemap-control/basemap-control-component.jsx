import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Helpers
import { logEvent } from 'helpers/analytics';

// Components
import TetherComponent from 'react-tether';
import Icon from 'components/ui/Icon';
import Checkbox from 'components/Form/Checkbox';
import RadioGroup from 'components/Form/RadioGroup';
import { basemapsSpec, labelsSpec, waterSpec } from './basemap-control-constants';

export default class BasemapControl extends React.Component {
  constructor(props) {
    super(props);

    this.state = { active: false };

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.onScreenClick = this.onScreenClick.bind(this);
    this.onBasemapChange = this.onBasemapChange.bind(this);
    this.onLabelChange = this.onLabelChange.bind(this);
    this.onWaterChange = this.onWaterChange.bind(this);
    this.onBoundariesChange = this.onBoundariesChange.bind(this);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onScreenClick);
  }

  onScreenClick(e) {
    const el = document.querySelector('.c-tooltip.basemap-tooltip');
    const clickOutside = el && el.contains && (!el.contains(e.target));

    if (clickOutside) {
      this.toggleDropdown(false);
    }
  }

  onBasemapChange(basemap) {
    this.props.setBasemap(basemap);

    logEvent('Explore data', 'Change basemap', basemap);
  }

  onLabelChange(label) {
    this.props.setLabels(label);

    logEvent('Explore data', 'Change labels', label);
  }

  onBoundariesChange(boundaries) {
    this.props.setBoundaries(boundaries.checked);

    logEvent('Explore data', 'Change boundaries', boundaries.checked);
  }

  onWaterChange(water) {
    this.props.setWater(water);

    logEvent('Explore data', 'Change water basemap', water);
  }

  toggleDropdown(to) {
    const active = (typeof to !== 'undefined' && to !== null) ? to : !this.state.active;

    this.setState({ active });

    requestAnimationFrame(() => {
      if (to) {
        window.addEventListener('click', this.onScreenClick);
      } else {
        window.removeEventListener('click', this.onScreenClick);
      }
    });
    this.setState({ active });
  }

  // RENDER
  render() {
    const { basemap, labels, water, boundaries } = this.props;
    const { active } = this.state;

    const currentBasemap = basemapsSpec[basemap];
    const currentLabels = labelsSpec[labels];
    const currentWater = waterSpec[water];

    const classNames = classnames({ [this.props.className]: !!this.props.className });

    return (
      <div className={`c-basemap-control ${classNames}`}>
        <TetherComponent
          attachment="bottom right"
          constraints={[{ to: 'window' }]}
          targetOffset="-2px 100%"
          classes={{ element: 'c-tooltip -arrow-bottom-right basemap-tooltip' }}
        >
          {/* First child: This is what the item will be tethered to */}
          <button
            type="button"
            className="c-button-map"
            onClick={() => this.toggleDropdown(true)}
          >
            <Icon name="icon-layers" className="-small" />
          </button>

          {/* Second child: If present, this item will be tethered to the the first child */}
          {active &&
            <div className="basemap-options">
              <RadioGroup
                options={Object.keys(basemapsSpec).map((k) => {
                  const bs = basemapsSpec[k];
                  return {
                    label: bs.label,
                    value: bs.id
                  };
                })}
                name="basemap"
                properties={{ default: currentBasemap.id }}
                onChange={this.onBasemapChange}
              />

              <div className="divisor" />
              <RadioGroup
                options={Object.keys(labelsSpec).map((k) => {
                  const ls = labelsSpec[k];
                  return {
                    label: ls.label,
                    value: ls.id
                  };
                })}
                name="labels"
                properties={{ default: currentLabels.id }}
                onChange={this.onLabelChange}
              />

              <div className="divisor" />
              <RadioGroup
                options={Object.keys(waterSpec).map((k) => {
                  const ls = waterSpec[k];
                  return {
                    label: ls.label,
                    value: ls.id
                  };
                })}
                name="water"
                properties={{ default: currentWater.id }}
                onChange={this.onWaterChange}
              />

              <div className="divisor" />
              <Checkbox
                properties={{
                  name: 'boundaries',
                  title: 'Boundaries',
                  checked: boundaries
                }}
                onChange={this.onBoundariesChange}
              />
            </div>
          }
        </TetherComponent>
      </div>
    );
  }
}

BasemapControl.propTypes = {
  basemap: PropTypes.oneOf(['default', 'dark', 'light', 'satellite', 'terrain']),
  labels: PropTypes.oneOf(['none', 'dark', 'light']),
  water: PropTypes.oneOf(['none', 'dark', 'light']),
  boundaries: PropTypes.bool,
  className: PropTypes.string,
  setBasemap: PropTypes.func,
  setLabels: PropTypes.func,
  setWater: PropTypes.func,
  setBoundaries: PropTypes.func
};
