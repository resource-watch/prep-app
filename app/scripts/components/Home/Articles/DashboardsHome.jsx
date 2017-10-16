import React from 'react';
import { Link } from 'react-router';

import metadata from '../../../metadata.json';

import ChartCard from '../../Cards/ChartCard';

class DashboardsHome extends React.Component {

  componentWillMount() {
    if (metadata[0].widgets) {
      for (let i = 0, metaLength = metadata[0].widgets.length; i < metaLength; i++) {
        this.props.getWidgetBySlug(metadata[0].widgets[i].slug);
      }
    }
  }

  render() {
    this.widget1 = this.props.widgets[metadata[0].widgets[0].slug];
    this.widget2 = this.props.widgets[metadata[0].widgets[1].slug];
    this.widget3 = this.props.widgets[metadata[0].widgets[2].slug];
    return (
      <div>
        <div className="row">
          <div className="column small-12 medium-8">
            <h2 className="-left">Assembling the information</h2>
            <Link to="/dashboards">Go to dashboards</Link>
            <p>Dashboards are a collection of data, stories, and tools that users compile to
              support their climate resilience and preparedness planning. View dashboards that
              others have created, or create your own to track key issues in your area.</p>
          </div>
        </div>
        <div className="row">
          {this.widget1 && this.widget1.widget_config &&
          <div className="column small-12">
            <ChartCard
              size="large"
              title={this.widget1.title}
              data={this.widget1}
            />
          </div>
          }
        </div>
        <div className="row align-stretch">
          {this.widget2 && this.widget2.widget_config &&
          <div className="column small-12 medium-6" style={{ display: 'flex' }}>
            <ChartCard
              title={this.widget2.title}
              data={this.widget2}
            />
          </div>
          }
          {this.widget3 && this.widget3.widget_config &&
          <div className="column small-12 medium-6" style={{ display: 'flex' }}>
            <ChartCard
              background
              title={this.widget3.title}
              data={this.widget3}
            />
          </div>
          }
        </div>
      </div>
    );
  }
}

DashboardsHome.propTypes = {
  getWidgetBySlug: React.PropTypes.func.isRequired,
  widgets: React.PropTypes.object.isRequired
};

export default DashboardsHome;
