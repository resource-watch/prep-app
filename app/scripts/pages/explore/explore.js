import Component from './explore-component';
import { connect } from 'react-redux';
import { setTab } from './explore-action';

// import { getDatasets, resetDatasetList } from '../../actions/datasets';
// import { setModalMetadata } from '../../actions/modal';

const mapStateToProps = (state) => ({
  currentTab: state.explorepage.tab
  // data: state.datasets,
  // location,
  // params,
  // metadataModal: state.modal.metadata
});

const mapDispatchToProps = dispatch => ({
  onChangeTab: (nextTab) => dispatch(setTab(nextTab))
  // getDatasets: defaultActiveLayers => dispatch(getDatasets(defaultActiveLayers)),
  // setModalMetadata: status => dispatch(setModalMetadata(status)),
  // resetExplore: () => {
  //   dispatch(resetDatasetList());
  //   dispatch(setModalMetadata(false));
  // }
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
