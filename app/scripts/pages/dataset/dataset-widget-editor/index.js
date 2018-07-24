import { connect } from 'react-redux';

import DatasetWidgetEditorComponent from './dataset-widget-editor-component';

export default connect(
  state => ({
    dataset: state.datasetPage.data,
    responsive: {
      fakeWidth: 1024
    }
  }),
  null
)(DatasetWidgetEditorComponent);
