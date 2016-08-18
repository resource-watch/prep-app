import React from 'react';

class DashboardDetailPage extends React.Component {

  componentDidMount() {
    if (!this.props.data) {
      this.props.getDashboardBySlug(this.props.dashboardSlug);
    }
  }

  render() {
    return (
      <div>
        {this.props.data &&
          <p> Dataset detail name: {this.props.data.title} </p>
        }
      </div>
    );
  }
}

DashboardDetailPage.propTypes = {
  data: React.PropTypes.object,
  dashboardSlug: React.PropTypes.string.isRequired,
  getDashboardBySlug: React.PropTypes.func.isRequired
};

export default DashboardDetailPage;
