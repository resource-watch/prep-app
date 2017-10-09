import React from 'react';
import PropTypes from 'prop-types';

// Libraries
import classnames from 'classnames';

// Components
import Icon from './Icon';

export default class CollapsibleList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: props.hidden || false
    };

    // Bindings
    this.onToggleList = this.onToggleList.bind(this);
  }

  onToggleList() {
    this.setState({ hidden: !this.state.hidden });
  }

  render() {
    const { className, title, list, collapse, content, arrowPosition } = this.props;
    const classNames = classnames({
      'c-collapsible-item': true,
      [className]: !!className,
      '-hidden': this.state.hidden
    });
    const arrowIconName = this.state.hidden ? 'icon-arrow-right' : 'icon-arrow-down';

    return (
      <div className={classNames}>
        <h1 className="collapsible-title">
          {collapse && arrowPosition === 'left' &&
            <button className="btn btn-collapse -left" onClick={this.onToggleList}>
              <Icon name={arrowIconName} className="-smaller" />
              {title}
            </button>
          }
          {collapse && arrowPosition === 'right' &&
            <button className="btn btn-collapse -right" onClick={this.onToggleList}>
              <Icon name={arrowIconName} className="-smaller" />
            </button>
          }
        </h1>
        <div className="collapsible-item-container">
          {content &&
            <div className="collapsible-item">
              {content}
            </div>
          }
          {list &&
            <ul className="collapsible-item">
              {list.map((l, i) => (
                <li className="list-item" key={i}>
                  <div className="child-container">
                    <span>{l.name}</span>
                  </div>
                </li>
              ))}
            </ul>
          }
        </div>
      </div>
    );
  }
}

CollapsibleList.propTypes = {
  className: PropTypes.string,
  title: PropTypes.any.isRequired,
  list: PropTypes.array,
  content: PropTypes.any,
  hidden: PropTypes.any,
  arrowPosition: PropTypes.string,
  collapse: PropTypes.bool
};

CollapsibleList.defaultProps = {
  collapse: true,
  hidden: true,
  arrowPosition: 'left'
};
