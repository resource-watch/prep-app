import React from 'react';
import PropTypes from 'prop-types';

// Libraries
import classnames from 'classnames';
import Fuse from 'fuse.js';

// Components
import Icon from './Icon';

// Constants
import { SELECT_SEARCH_OPTIONS } from '../../general-constants/general';


export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.onToggle = this.onToggle.bind(this);
    this.onSearch = this.onSearch.bind(this);
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
    const { list, options } = this.props;
    const value = e.currentTarget.value;
    const fuse = new Fuse(list, { ...SELECT_SEARCH_OPTIONS, ...options });
    const filteredList = value !== '' ? fuse.search(value) : list;

    this.props.onChange(filteredList, value);
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
  list: PropTypes.array.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.object,
  className: PropTypes.string,
  // Actions
  onChange: PropTypes.func
};

Search.defaultProps = {
  list: [],
  label: 'Search',
  placeholder: '',
  options: {}
};
