import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

// Libraries
import classnames from 'classnames';

// Components
import Icon from './Icon';


export default class Search extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      open: props.open
    };

    this.onToggle = this.onToggle.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.changed = debounce(this.props.onChange, 150);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.open !== nextProps.open && nextProps.open !== undefined) {
      this.setState({ open: nextProps.open });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.open && !prevState.open) {
      this.input.focus();
    }
  }

  onToggle() {
    this.setState({ open: !this.state.open });
  }

  onSearch(e) {
    const value = e.target.value;
    this.setState({ value }, () => {
      this.props.onChange(value);
    });
  }

  render() {
    const { open } = this.state;
    const { className, label, placeholder } = this.props;
    const classNames = classnames(
      'c-search',
      { [className]: !className }
    );

    return (
      <div className={classNames}>
        {!open ?
          <button className="label-container" onClick={this.onToggle}>
            <span>{label}</span>
            <Icon name="icon-search" />
          </button> :
          <div>
            <input
              ref={(n) => { this.input = n; }}
              className="search-box"
              type="text"
              onKeyUp={this.onSearch}
              placeholder={placeholder}
            />

            <button onClick={this.onToggle}>
              <Icon name="icon-search" />
            </button>
          </div>
        }
      </div>
    );
  }
}

Search.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  open: PropTypes.bool,
  onChange: PropTypes.func
};

Search.defaultProps = {
  label: 'Search',
  placeholder: '',
  open: false
};
