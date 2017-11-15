import React from 'react';
import PropTypes from 'prop-types';
import { Autobind } from 'es-decorators';
import Step1Img from '../images/howto-step1.png';
import Step2Img from '../images/howto-step2.png';

// Redux
import { connect } from 'react-redux';

import { toggleModal } from '../redactions/modal';

class HowToWidgetEditorModal extends React.Component {
  @Autobind
  handleOkGotIt() {
    this.props.toggleModal(false);
  }

  render() {
    return (
      <div className="c-how-to-widget-editor-modal">
        <h2>How to customize the visualization</h2>
        <div className="container">
          <div className="container1">
            <h3>1</h3>
            <div>
              Start selecting a visualization type
            </div>
            <div className="image-container">
              <img alt="" src={Step1Img} />
            </div>
          </div>
          <div className="container2">
            <h3>2</h3>
            <div>
              Then drag and drop elements from the list to the boxes to draw up your chart
            </div>
            <div className="image-container">
              <img alt="" src={Step2Img} />
            </div>
          </div>
        </div>
        <div className="actions">
          <button
            className="c-button -primary"
            onClick={this.handleOkGotIt}
          >
          Ok, got it
          </button>
        </div>
      </div>
    );
  }
}

HowToWidgetEditorModal.propTypes = {
  // Store
  toggleModal: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  toggleModal: (open) => { dispatch(toggleModal(open)); }
});


export default connect(null, mapDispatchToProps)(HowToWidgetEditorModal);
