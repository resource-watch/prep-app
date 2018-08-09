import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Utils
import { getDatasetDefaultEditableWidget } from '../dataset-helpers';
import { breakpoints } from 'helpers/responsive';

// Components
import MediaQuery from 'react-responsive';

// Widget editor
import WidgetEditor, { VegaChart, getVegaTheme, Modal, SaveWidgetModal } from 'widget-editor';

// Modal
// import Modal from 'components/Modal/Modal';
// import SaveWidgetModal from 'components/Modal/SaveWidgetModal';

// Constants
class DatasetWidgetEditor extends PureComponent {
  static propTypes = {
    dataset: PropTypes.object,
    responsive: PropTypes.object
  }

  state = {
    showSaveModal: false
  }

  handleToggleSaveWidget = (bool) => {
    this.setState({ showSaveModal: bool });
  }

  render() {
    const { dataset, responsive } = this.props;
    const defaultEditableWidget = getDatasetDefaultEditableWidget(dataset);

    return (
      <div className="c-dataset-widget-editor">
        <MediaQuery
          minDeviceWidth={breakpoints.large}
          values={{ deviceWidth: responsive.fakeWidth }}
        >
          <WidgetEditor
            datasetId={dataset.id}
            widgetId={defaultEditableWidget && defaultEditableWidget.id}
            saveButtonMode="auto"
            embedButtonMode="auto"
            titleMode="auto"
            provideWidgetConfig={(func) => { this.onGetWidgetConfig = func; }}
            onSave={() => this.handleToggleSaveWidget(true)}
          />

          <Modal
            isOpen={this.state.showSaveModal}
            className="-medium"
            onRequestClose={() => this.handleToggleSaveWidget(false)}
          >
            <SaveWidgetModal
              dataset={dataset.id}
              getWidgetConfig={this.onGetWidgetConfig}
              onRequestClose={() => this.handleToggleSaveWidget(false)}
            />
          </Modal>
        </MediaQuery>

        {defaultEditableWidget &&
          <MediaQuery
            maxDeviceWidth={breakpoints.large - 1}
            values={{ deviceWidth: responsive.fakeWidth }}
          >
            <div className="l-container">
              <div className="row">
                <div className="column small-12">
                  <VegaChart
                    data={defaultEditableWidget.widgetConfig}
                    theme={getVegaTheme()}
                    reloadOnResize
                  />
                </div>
              </div>
            </div>
          </MediaQuery>
        }

      </div>
    );
  }
}

export default DatasetWidgetEditor;
