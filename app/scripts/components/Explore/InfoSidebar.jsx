import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

import filtersConfig from '../../../scripts/filters.json';


class InfoSidebar extends React.Component {
  constructor() {
    super();
    this.state = {
      sidebarOpen: true
    };
  }

  // componentDidMount() {
  //   this.props.setTooltip({
  //     text: 'Climate Data Initiative dataset',
  //     width: '135'
  //   });
  // }
  //
  // onTagHover(e) {
  //   // Get elements
  //   const tag = e.target;
  //   const tooltip = ReactDOM.findDOMNode(this.tagTooltip);
  //   const tooltipParent = tooltip.parentNode;
  //   // const tooltipText = tooltip.firstChild;
  //
  //   // Get elements' position
  //   const tParentBounds = tooltipParent.getBoundingClientRect();
  //   const tagBounds = tag.getBoundingClientRect();
  //
  //   // Get elements' height and width
  //   const tagWidth = tag.offsetWidth;
  //   // const tagHeight = tag.offsetHeight;
  //   // const tooltipTextWidth = tooltipText.offsetWidth;
  //   // const tooltipTextHeight = tooltipText.offsetHeight;
  //
  //   // Update the state of the tooltip
  //   this.props.setTooltip(
  //     {
  //       hidden: false,
  //       // position: {
  //       //   top: (tagBounds.top - (tParentBounds.top + (tagHeight + tooltipTextHeight))),
  //       //   left: (tagBounds.left - (tooltipTextWidth / 2) + (tagWidth / 2))
  //       // },
  //       position: {
  //         top: tagBounds.top - tParentBounds.top,
  //         left: tagBounds.left + (tagWidth / 2)
  //       }
  //     }
  //   );
  // }
  //
  // onTagLeave() {
  //   this.props.setTooltip({ hidden: true });
  // }
  //
  // switchChange(dataset) {
  //   dataset.id === this.props.selectedDatasetId &&
  //     this.props.deselectDataset();
  //   this.props.switchChange(dataset);
  // }
  //
  // getContent() {
  //   if (!this.props.listReceived) {
  //     return <LoadingSpinner />;
  //   }
  //   if (!this.props.data.length) {
  //     return <p>No datasets with these filters selected</p>;
  //   }
  //
  //   const layers = this.props.data.map((dataset, index) => {
  //     let layerIcon = (
  //       <div className="detail-space" />
  //     );
  //
  //     let datasetIcon = null;
  //
  //     let subtitle = '';
  //     let partner = '';
  //
  //     if (dataset.metadata && dataset.metadata.length) {
  //       const metadata = dataset.metadata[0].attributes.info;
  //       if (metadata) {
  //         if (metadata.subtitle) {
  //           subtitle = metadata.subtitle;
  //         }
  //         if (metadata.organization) {
  //           partner = metadata.organization;
  //         }
  //       }
  //     }
  //
  //     if (dataset.layer && dataset.layer.length) {
  //       layerIcon = (
  //         <Switch
  //           onChange={() => this.switchChange(dataset)}
  //           checked={dataset.active || false}
  //         />
  //       );
  //     }
  //     if (dataset.id) {
  //       datasetIcon = (
  //         <Link className="detail-link" to={`/dataset/${dataset.id}`}>
  //           <svg width="16" height="16" viewBox="0 0 16 16"><title>View page</title>
  //             <path d="M0 0v16h14v-2H2V2h12V0H0zm12 4l4 4-4 4V4zM6 7h6v2H6V7z" fillRule="evenodd" />
  //           </svg>
  //         </Link>
  //       );
  //     }
  //
  //     let cdiTag = false;
  //     for (let i = 0; i < dataset.vocabulary[0].attributes.tags.length; i++) {
  //       if (dataset.vocabulary[0].attributes.tags[i] === 'cdi') {
  //         cdiTag = true;
  //       }
  //     }
  //
  //     return (
  //       <div className="layer" key={`map-layer-${index}`}>
  //         {layerIcon}
  //         <span className="layerItem">
  //           {cdiTag
  //             ? <strong
  //               className="title"
  //               onClick={() => this.props.onInfoClick(dataset.id)}
  //             >
  //               {dataset.name}
  //               <div
  //                 onMouseEnter={e => this.onTagHover(e)}
  //                 onMouseLeave={() => this.onTagLeave()}
  //                 className="-highlighted-tag"
  //               >
  //                 CDI
  //               </div>
  //             </strong>
  //             : <strong
  //               className="title"
  //               onClick={() => this.props.onInfoClick(dataset.id)}
  //             >
  //               {dataset.name}
  //             </strong>
  //           }
  //           <span className="subtitle">{subtitle}</span>
  //           { dataset.env === 'preproduction' ? <span style={{ color: 'red', fontSize: '11px' }}>Preproduction</span> : null }
  //           <span className="subtitle">Source: <strong>{partner}</strong></span>
  //         </span>
  //         {datasetIcon}
  //       </div>
  //     );
  //   });
  //
  //   return layers;
  // }
  //
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.dataset.active);
  }

  toggleToolbarStatus() {
    this.setState({
      sidebarOpen: !this.state.sidebarOpen
    });
  }

  getHeader() {
    const { metadata, details } = this.props;
    const dataset = details[metadata.datasetId];

    return dataset ?
      <header className="header-container">
        <h1 className="item-title">{dataset.name}</h1>
        {dataset.subtitle && <h2 className="item-subtitle">{dataset.subtitle}</h2>}
      </header> :
      <header className="header-container" />;
  }

  getContent() {
    const { metadata, details } = this.props;
    const dataset = details[metadata.datasetId];
    const allFilters = filtersConfig.filters;
    const topicsList = dataset && dataset.vocabulary && dataset.vocabulary.length ?
      dataset.vocabulary[0].attributes.tags.filter(t => allFilters.topics[t]).map(t => allFilters.topics[t]) : [];
    const areasList = dataset && dataset.vocabulary && dataset.vocabulary.length ?
      dataset.vocabulary[0].attributes.tags.filter(t => allFilters.geography[t]).map(t => allFilters.geography[t]) : [];

    return dataset ?
      <div className="content-container">
        <p className="item-prop description"><span className="prop-label">Description: </span>{dataset.metadata[0].attributes.description}</p>
        {/* <p className="item-prop"><span className="prop-label">Data source: </span>{dataset.data_source}</p> */}
        <p className="item-prop topics"><span className="prop-label">Topics: </span>{topicsList.join(', ')}</p>
        <p className="item-prop areas"><span className="prop-label">Area: </span>{areasList.join(', ')}</p>
      </div> :
      <div className="content-container" />;
  }

  getActionsBar() {
    const { dataset, selectedDatasetId } = this.props;
    let layerIcon = null;
    let downloadIcon = null;

    if (dataset && dataset.layer && dataset.layer.length) {
      layerIcon = (
        <button onClick={() => this.switchChange(dataset)}>
          <span
            title="Visibility"
            className={`icon ${dataset.id !== selectedDatasetId ? '-hide' : ''}`}
          >
            <svg width="13" height="9" viewBox="0 0 13 9"><title>icon-eye</title><path d="M4.933 4.5c0 .855.698 1.545 1.567 1.545s1.567-.69 1.567-1.545S7.369 2.955 6.5 2.955s-1.567.69-1.567 1.545zM13 4.5C11.755 2.265 9.312 0 6.5 0 3.695 0 1.245 2.265 0 4.5 1.245 6.735 3.695 9 6.5 9c2.812 0 5.255-2.265 6.5-4.5zm-9.415 0c0-1.582 1.307-2.865 2.915-2.865S9.415 2.918 9.415 4.5c0 1.582-1.307 2.865-2.915 2.865S3.585 6.082 3.585 4.5z" fillRule="evenodd" /></svg>
          </span>
          Map
        </button>
      );
    }

    if (dataset && dataset.metadata && dataset.metadata.length && dataset.metadata[0].attributes.info.data_download) {
      downloadIcon = (
        <a download href={dataset.metadata[0].attributes.info.data_download}>
          <svg className="icon" width="10" height="12" viewBox="0 0 10 12"><title>Download</title>
            <g fill="none" fillRule="evenodd">
              <path d="M4 0h2v7H4zM0 10h10v2H0z" />
              <path
                d="M4.243 8.192l.707.707L9.9 3.95 8.484 2.537 4.95 6.07 1.414 2.536 0 3.95l4.243 4.242z"
              />
            </g>
          </svg>
          Download
        </a>
      );
    }

    return (
      <nav className="info-actions">
        {downloadIcon}
        <Link to={`/dataset/${dataset.id}`}>Learn more</Link>
        {layerIcon}
      </nav>
    );
  }

  switchChange(dataset) {
    if (dataset.id === this.props.selectedDatasetId) this.props.deselectDataset();
    this.props.switchChange(dataset);
  }

  render() {
    const { metadata } = this.props;

    return (
      <div className={['c-info-sidebar', metadata.open ? '-open' : ''].join(' ')}>
        <div className="actions">
          <div>
            {/* <button
              className={['toggle-status', this.state.sidebarOpen ? '-open' : ''].join(' ')}
              onClick={() => this.toggleToolbarStatus()}
            >
              <span />
            </button> */}
          </div>
        </div>
        <div className="row content collapse">
          <div className="columns small-12 dataset-items">
            {this.getHeader()}
            {this.getActionsBar()}
            {this.getContent()}
          </div>
        </div>
        {/* <div className="actions-mobile">
          <Button
            border
            click={() => this.toggleToolbarStatus()}
          >
            Apply
          </Button>

        </div> */}
      </div>
    );
  }
}

InfoSidebar.propTypes = {
  dataset: React.PropTypes.object,
  /**
   * Define the dataset metadata
   */
  metadata: React.PropTypes.object,
  /**
   * Define the datasets details
   */
  details: React.PropTypes.object,
  /**
   * Define the layers on change switch function
   */
  switchChange: React.PropTypes.func.isRequired,
  // /**
  //  * Define if got the dataset list
  //  */
  // listReceived: React.PropTypes.bool,
  // /**
  //  * Define the tooltip text and position
  //  */
  // setTooltip: React.PropTypes.func.isRequired,
  /**
   * Define function to close info sidebar
   */
  onClose: React.PropTypes.func.isRequired,
  /**
   * Define function to unselect dataset
   */
  deselectDataset: React.PropTypes.func,
  selectedDatasetId: React.PropTypes.string
  // /**
  //  * Define the tooltip properties.
  //  */
  // tooltip: React.PropTypes.object
};

InfoSidebar.defaultProps = {
};

export default InfoSidebar;
