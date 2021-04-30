import { connect } from 'react-redux';
import { modalActions } from 'widget-editor';

import DatasetWidgetEditorComponent from './dataset-widget-editor-component';

export default connect(
  state => ({
    dataset: state.datasetPage.data,
    responsive: {
      fakeWidth: 1024
    }
  }),
  dispatch => ({
    toggleModal: (...params) => dispatch(modalActions.toggleModal(...params))
  })
)(DatasetWidgetEditorComponent);
