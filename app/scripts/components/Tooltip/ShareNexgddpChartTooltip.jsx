import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SaveWidgetModal, modalActions } from 'widget-editor';

// Redux
import { toggleTooltip } from 'actions/tooltip';

class ShareNexgddpChartTooltip extends React.Component {
  constructor(props) {
    super(props);
    this.onClickOutside = this.onClickOutside.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
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
    this.props.toggleEditorModal(true, {
      children: SaveWidgetModal,
      childrenProps: {
        datasetId: this.props.datasetId,
        getWidgetConfig: this.props.getWidgetConfig,
        onClickCheckWidgets: this.props.onClickCheckWidgets
      }
    });
  }

  render() {
    return (
      <div className="c-share-nexgddp-chart-tooltip">
        <ul>
          <li><button type="button" onClick={this.onClickSave}>Save widget</button></li>
          {/* <li><button type="button">Share/Embed</button></li> */}
        </ul>
      </div>
    );
  }
}

ShareNexgddpChartTooltip.propTypes = {
  datasetId: PropTypes.string,
  toggleTooltip: PropTypes.func,
  getWidgetConfig: PropTypes.func,
  onClickCheckWidgets: PropTypes.func,
  toggleEditorModal: PropTypes.func
};

ShareNexgddpChartTooltip.defaultProps = {
  onClickCheckWidgets: () => {
    window.location = '/myprep/widgets/my_widgets';
  }
};

const mapStateToProps = state => ({
  datasetId: state.nexgddptool.dataset ? state.nexgddptool.dataset.id : null
});

const mapDispatchToProps = dispatch => ({
  toggleTooltip: (...params) => dispatch(toggleTooltip(...params)),
  toggleEditorModal: (...params) => dispatch(modalActions.toggleModal(...params))
});

export default connect(mapStateToProps, mapDispatchToProps)(ShareNexgddpChartTooltip);
