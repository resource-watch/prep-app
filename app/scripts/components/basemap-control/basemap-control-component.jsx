import React from 'react';
import PropTypes from 'prop-types';

// Components
import TetherComponent from 'react-tether';
import Icon from 'components/ui/Icon';
import Checkbox from 'components/Form/Checkbox';
import RadioGroup from 'components/Form/RadioGroup';

export default class BasemapControl extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    };

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.onScreenClick = this.onScreenClick.bind(this);
    this.onBasemapChange = this.onBasemapChange.bind(this);
    this.onLabelChange = this.onLabelChange.bind(this);
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
    const { basemapControl } = this.props;

    this.props.setBasemap(basemapControl.basemaps[basemap]);
  }

  onLabelChange(label) {
    this.props.setLabels(label.checked);
  }

  onBoundariesChange(boundaries) {
    this.props.setBoundaries(boundaries.checked);
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
    const { basemap, basemapControl } = this.props;
    const { active } = this.state;

    return (
      <div className="c-basemap-control">
        <TetherComponent
          attachment="bottom right"
          constraints={[{
            to: 'window'
          }]}
          targetOffset="-2px 100%"
          classes={{
            element: 'c-tooltip -arrow-bottom-right basemap-tooltip'
          }}
        >
          {/* First child: This is what the item will be tethered to */}
          <button type="button" className="btn-basemaps" onClick={() => this.toggleDropdown(true)}>
            <Icon name="icon-layers" className="-small" />
          </button>

          {/* Second child: If present, this item will be tethered to the the first child */}
          {active &&
            <div className="basemap-options">
              <RadioGroup
                options={Object.keys(basemapControl.basemaps).map((k) => {
                  const bs = basemapControl.basemaps[k];
                  return {
                    label: bs.label,
                    value: bs.id
                  };
                })}
                name="basemap"
                properties={{
                  default: basemap.id
                }}
                onChange={this.onBasemapChange}
              />
              <div className="divisor" />
              <Checkbox
                properties={{
                  name: 'label',
                  title: 'Label',
                  value: 'label'
                }}
                onChange={this.onLabelChange}
              />

              <div className="divisor" />
              <Checkbox
                properties={{
                  name: 'boundaries',
                  title: 'Boundaries',
                  value: 'boundaries'
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
  // STORE
  basemapControl: PropTypes.object,
  basemap: PropTypes.object,

  // ACTIONS
  setBasemap: PropTypes.func,
  setLabels: PropTypes.func,
  setBoundaries: PropTypes.func
};
