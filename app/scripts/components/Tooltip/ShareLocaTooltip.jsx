import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { SaveWidgetModal, modalActions } from 'widget-editor';
import * as shareModalActions from 'components/share-modal/share-modal-actions';


// Redux
import { toggleTooltip } from 'actions/tooltip';

class ShareLocaTooltip extends React.Component {
  constructor(props) {
    super(props);
    this.onClickOutside = this.onClickOutside.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.onClickShare = this.onClickShare.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', this.onClickOutside);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClickOutside);
  }

  onClickOutside(e) {
    const el = document.querySelector('.c-tooltip-tether');
    const clickOutside = el && el.contains && !el.contains(e.target);
    if (clickOutside) {
      this.props.toggleTooltip(false);
    }
  }

  onClickSave() {
    this.props.toggleTooltip(false);
    this.props.toggleModal(true, {
      children: SaveWidgetModal,
      childrenProps: {
        datasetId: this.props.datasetId,
        getWidgetConfig: this.props.getWidgetConfig,
        onClickCheckWidgets: this.props.onClickCheckWidgets
      }
    });
  }

  onClickShare() {
    const { open, datasetSlug, render } = this.props;
    const { origin, search } = window.location;
    this.props.setOpen(!open);
    this.props.setLinks({ embed: `${origin}/embed/nexgddp/${datasetSlug}${search}&render=${render}` });
    this.props.setTab('embed');
  }

  render() {
    return (
      <div className="c-share-nexgddp-chart-tooltip">
        <ul>
          <li><button type="button" onClick={this.onClickSave}>Save widget</button></li>
          <li><button type="button" onClick={this.onClickShare}>Embed</button></li>
        </ul>
      </div>
    );
  }
}

ShareLocaTooltip.propTypes = {
  open: PropTypes.bool,
  datasetId: PropTypes.string,
  datasetSlug: PropTypes.string,
  toggleTooltip: PropTypes.func,
  getWidgetConfig: PropTypes.func,
  /**
   * Either to embed the chart or the map
   */
  render: PropTypes.oneOf(['chart', 'map']).isRequired,
  onClickCheckWidgets: PropTypes.func,
  toggleModal: PropTypes.func,
  setOpen: PropTypes.func,
  setLinks: PropTypes.func,
  setTab: PropTypes.func
};

ShareLocaTooltip.defaultProps = {
  onClickCheckWidgets: () => {
    window.location = '/myprep/widgets/my_widgets';
  }
};

const mapStateToProps = state => ({
  datasetId: state.locatool.dataset ? state.locatool.dataset.id : null,
  datasetSlug: state.locatool.dataset ? state.locatool.dataset.slug : null
});

const mapDispatchToProps = {
  toggleTooltip,
  ...modalActions,
  ...shareModalActions
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareLocaTooltip);
