import React from 'react';

class DashboardDetailPage extends React.Component {

  componentDidMount() {
    if (!this.props.data) {
      this.props.getInsightBySlug(this.props.insightSlug);
    }
  }

  render() {
    return (
      <div>
        { this.props.data &&
          <p> Insight detail name: {this.props.data.title} </p>
        }
      </div>
    );
  }
}

DashboardDetailPage.propTypes = {};

export default DashboardDetailPage;
