import React from 'react';
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
  }

  setShareModal(url, section, widgetSlug) {
    this.setState({
      modalShare: true,
      shareUrl: url,
      shareTitle: `Share this ${section}`,
      widgetSlug: widgetSlug
    });
  }

  render() {
    let content = [];
    if (this.props.data && this.props.data.widgets.length) {
      this.props.data.widgets.forEach((indicator, index) => {
        if ( indicator.widget_type && indicator.widget_type.name === 'Embed' ) {
          content.push(
            <div className="large-12" key={`indicator-${index}`}>
             <EmbedCard
              tooltip
              title={indicator.title}
              subtitle={indicator.subtitle}
              data={indicator}
              setShareModal={(url, section, widgetSlug) => this.setShareModal(url, section, widgetSlug)}
            />
            </div>
          );
        } else {
          content.push(
            <div className="columns small-12 medium-6" key={`indicator-${index}`}>
              <ChartCard
                tooltip
                title={indicator.title}
                subtitle={indicator.subtitle}
                data={indicator}
                setShareModal={(url, section, widgetSlug) => this.setShareModal(url, section, widgetSlug)}
              />
            </div>
          );
        }
      });
    }

    return (
      <div className="row">
        { content }

        <ShareModal
          title={this.state.shareTitle}
          url={this.state.shareUrl}
          opened={this.state.modalShare}
          close={() => this.setState({ modalShare: false })}
          slug={this.state.widgetSlug}
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
