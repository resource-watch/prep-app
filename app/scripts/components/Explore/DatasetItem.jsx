import React from 'react';

// Libraries
import classnames from 'classnames';


class DatasetItem extends React.Component {
  render() {
    const { classNames, metadata, leftElement, toolsElements } = this.props;
    const className = classnames(
      'c-dataset-item',
      { [classNames]: !!classNames }
    );

    return (
      <div className={className}>
        <header className="item-header">
          <div className="header-container">
            <div className="title-container">
              {leftElement &&
                <div className="left-element">
                  {leftElement}
                </div>
              }
              <h1 className="item-title">{metadata.title}</h1>
            </div>
            {toolsElements && toolsElements.length > 0 &&
              <div className="item-tools">
                {toolsElements}
              </div>
            }
          </div>
          <h2 className="subtitle">{metadata.subtitle}</h2>
        </header>


        <div className="item-content">
          {metadata.description && <p className="description">{metadata.description}</p>}
          {metadata.tags &&
            <div className="tags-container">
              {metadata.tags.map((t, i) => (
                <span key={i} className="c-tag tag">{t}</span>
              ))}
            </div>
          }
        </div>
      </div>
    );
  }
}

DatasetItem.propTypes = {
  classNames: React.PropTypes.string,
  metadata: React.PropTypes.object,
  leftElement: React.PropTypes.any,
  toolsElements: React.PropTypes.any
};

DatasetItem.defaultProps = {
  metadata: {}
};

export default DatasetItem;
