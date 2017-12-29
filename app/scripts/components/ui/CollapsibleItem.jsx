import React from 'react';
import PropTypes from 'prop-types';

// Libraries
import classnames from 'classnames';

class CollapsibleItem extends React.Component {
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
    const { className, title, description, list, content } = this.props;
    const classNames = classnames({
      'c-collapsible-item': true,
      [className]: !!className,
      '-hidden': this.state.hidden
    });

    return (
      <div className={classNames}>
        <button className="collapsible-title" type="button" onClick={this.onToggleList}>
          <h1>{title}</h1>
        </button>

        {description && <span className="collapsible-title-description">{description}</span>}
        <div className="collapsible-item-container">
          {content &&
            <div className="collapsible-item">
              {content}
            </div>
          }
          {list &&
            <ul className="collapsible-item">
              {list.map(l => (
                <li className="list-item" key={l.id}>
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

CollapsibleItem.propTypes = {
  className: PropTypes.string,
  title: PropTypes.any.isRequired,
  description: PropTypes.string,
  list: PropTypes.array,
  content: PropTypes.any,
  hidden: PropTypes.any
};

CollapsibleItem.defaultProps = {
  collapse: true,
  hidden: true,
  arrowPosition: 'left'
};

export default CollapsibleItem;
