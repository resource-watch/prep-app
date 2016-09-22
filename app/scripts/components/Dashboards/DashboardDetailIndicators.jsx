import React from 'react';
import MapCard from '../Cards/MapCard';
import ChartCard from '../Cards/ChartCard';
import EmbedCard from '../Cards/EmbedCard';
import ShareModal from '../Modal/ShareModal';

class DashboardDetailIndicators extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShare: false,
      shareUrl: '',
      shareTitle: '',
      widgetSlug: ''
    };
    this.setShareModal = this.setShareModal.bind(this);
  }

  setShareModal(url, section, widgetSlug) {
    this.setState({
      modalShare: true,
      shareUrl: url,
      shareTitle: `Share this ${section}`,
      widgetSlug
    });
  }

  render() {
    let content = [];
    if (this.props.data && this.props.data.widgets.length) {
      this.props.data.widgets.forEach((indicator, index) => {
        if (indicator.widget_config) {
          const widgetConfig = typeof indicator.widget_config === 'string'
            ? JSON.parse(indicator.widget_config)
            : indicator.widget_config;
          if (widgetConfig.type === 'map') {
            content.push(
              <div className="column small-12" key={`indicator-${index}`} style={{ display: 'flex' }}>
                <MapCard
                  data={indicator}
                  layerId={widgetConfig.layerId}
                  setShareModal={this.setShareModal}
                  dashboardSlug={this.props.dashboardSlug}
                  link={`/dataset/${indicator.dataset}`}
                />
              </div>
            );
          } else if (widgetConfig.type === 'embed') {
            content.push(
              <div className="column small-12" key={`indicator-${index}`} style={{ display: 'flex' }}>
                <EmbedCard
                  autoHeight
                  data={indicator}
                  url={widgetConfig.url}
                  setShareModal={this.setShareModal}
                  dashboardSlug={this.props.dashboardSlug}
                  link={`/dataset/${indicator.dataset}`}
                />
              </div>
            );
          } else {
            content.push(
              <div className="column small-12 medium-6" key={`indicator-${index}`} style={{ display: 'flex' }}>
                <ChartCard
                  dashboardSlug={this.props.dashboardSlug}
                  link={`/dataset/${indicator.dataset}`}
                  title={indicator.title}
                  subtitle={indicator.subtitle}
                  data={indicator}
                  setShareModal={this.setShareModal}
                />
              </div>
            );
          }
        }
      });
    }

    return (
      <div className="row align-stretch">
        {content}

        <ShareModal
          title={this.state.shareTitle}
          url={this.state.shareUrl}
          opened={this.state.modalShare}
          close={() => this.setState({ modalShare: false })}
          widgetSlug={this.state.widgetSlug}
        />
      </div>
    );
  }
}

DashboardDetailIndicators.propTypes = {
  /**
   * Define dashboard indicators data
   */
  data: React.PropTypes.any.isRequired,
  /**
   * Set share modal state
   */
  setShareModal: React.PropTypes.func
};

export default DashboardDetailIndicators;
