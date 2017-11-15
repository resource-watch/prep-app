import React from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { toggleTooltip } from '../redactions/tooltip';

// Services
import DatasetService from '../services/DatasetService';

// Components
import Spinner from '../ui/Spinner';
import Checkbox from '../form/Checkbox';

import FilterStringTooltip from '../tooltip/FilterStringTooltip';
import FilterNumberTooltip from '../tooltip/FilterNumberTooltip';
import FilterDateTooltip from '../tooltip/FilterDateTooltip';

class FilterTooltip extends React.Component {
  constructor(props) {
    super(props);

    const filters = props.widgetEditor.filters;
    const filter = filters && filters.find(f => f.name === props.name);

    this.state = {
      selected: (filter && filter.value) || [],
      notNullSelected: filter && filter.notNull,
      loading: true
    };

    // DatasetService
    this.datasetService = new DatasetService(props.datasetID, {
      apiURL: process.env.RW_API_URL
    });

    this.onScreenClick = this.onScreenClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onApply = this.onApply.bind(this);
    this.onToggleLoading = this.onToggleLoading.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.onScreenClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onScreenClick);
  }

  onChange(selected) {
    this.setState({ selected });
  }

  onApply() {
    const { selected, notNullSelected } = this.state;
    this.props.onApply(selected, notNullSelected);

    // We close the tooltip
    requestAnimationFrame(() => {
      this.props.toggleTooltip(false);
    });
  }

  onScreenClick(e) {
    const el = document.querySelector('.c-tooltip-editor');
    const clickOutside = el && el.contains && !el.contains(e.target);
    if (clickOutside) {
      this.props.toggleTooltip(false);
    }
  }

  onToggleLoading(loading) {
    this.setState({ loading });
  }

  handleNotNullSelection(value) {
    this.setState({
      notNullSelected: value
    });
  }

  render() {
    const { type } = this.props;
    const { loading, notNullSelected } = this.state;

    return (
      <div className="c-filter-tooltip">
        {!!loading &&
          <Spinner
            className="-light -small"
            isLoading={loading}
          />
        }

        {!loading &&
          <div className="c-checkbox">
            <Checkbox
              properties={{
                title: 'Not null values',
                checked: notNullSelected,
                default: false
              }}
              onChange={elem => this.handleNotNullSelection(elem.checked)}
            />
          </div>
        }

        {type === 'string' &&
          <FilterStringTooltip
            {...this.props}
            loading={this.state.loading}
            selected={this.state.selected}
            onChange={this.onChange}
            onToggleLoading={this.onToggleLoading}
            onApply={this.onApply}
          />
        }

        {type === 'number' &&
          <FilterNumberTooltip
            {...this.props}
            loading={this.state.loading}
            selected={this.state.selected}
            onChange={this.onChange}
            onToggleLoading={this.onToggleLoading}
            onApply={this.onApply}
          />
        }

        {type === 'date' &&
          <FilterDateTooltip
            {...this.props}
            loading={this.state.loading}
            selected={this.state.selected}
            onChange={this.onChange}
            onToggleLoading={this.onToggleLoading}
            onApply={this.onApply}
          />
        }
      </div>
    );
  }
}

FilterTooltip.propTypes = {
  tableName: PropTypes.string.isRequired,
  datasetID: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onResize: PropTypes.func, // Passed from the tooltip component
  onApply: PropTypes.func.isRequired,
  // store
  toggleTooltip: PropTypes.func.isRequired,
  widgetEditor: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
  toggleTooltip: (opened, opts) => {
    dispatch(toggleTooltip(opened, opts));
  }
});

const mapStateToProps = state => ({
  widgetEditor: state.widgetEditor
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterTooltip);
