import React from 'react';
import { Link } from 'react-router';
import Card from '../Cards/Card';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import LoadingSpinner from '../Loading/LoadingSpinner';

class DashboardsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      createDashboardModalOpen: false
    };
  }

  componentDidMount() {
    if (!this.props.data.length) {
      this.props.getDashboardList();
    }
  }

  getContent() {
    if (!this.props.data || this.props.data.length === 0) {
      return (
        <div>
          <LoadingSpinner />
        </div>
      );
    }

    let items = [];
    this.props.data.forEach((item, index) => {
      items.push(
        <Card border="neutral" key={`dashboard-item-${index}`}>
          <Link to={`/dashboards/${item.slug}`}>
            <h3> {item.title} </h3>
          </Link>
          <p className="content">
            {item.summary}
          </p>
          {item.partner &&
            <a href="#">
              <img
                src={config.apiUrl + item.partner.logo}
                className="logo"
                alt={item.partner.name}
              />
            </a>
          }
        </Card>
      );
    });

    return (
      <div className="wrapper">
        <div className="cards">
          {items}
          <div className="button-container">
            <Button border="neutral">Show more results</Button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    let content = this.getContent();

    return (
      <div className="l-dashboards">

        {content}

        <div className="other-links">
          <div className="wrapper">
            <div className="cards-container">
              <div className="card -map">
                <h2> Data on the map </h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                <Link to="/data">
                  <Button themeColor>Explore the map</Button>
                </Link>
              </div>
              <div className="card -image">
                <h2> Insights </h2>
                <p>
                  Integer id placerat ligula, eget consequat sapien. Duis nec
                  neque scelerisque
                </p>
                <Link to="/insights">
                  <Button themeColor>Explore the insights</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="pre-header">
          <div className="wrapper">
            <div className="content -centered">
              <div>
                <h2> Do you have relevant data about climate? </h2>
                <div className="button-container">
                  <Button
                    inverse
                    border
                    click={() => this.setState({
                      createDashboardModalOpen: true
                    })}
                  >
                    Create your dashboard
                  </Button>
                </div>
              </div>
              <div>
                <h2> Would you like to improve a dashboard? </h2>
                <Link to="/contact" className="button-container">
                  <Button inverse border>
                    Get in touch
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Modal
          opened={this.state.createDashboardModalOpen}
          close={() => this.setState({ createDashboardModalOpen: false })}
        >
          <div className="content">
            The website is under development. The feature will be available
            later.
          </div>
        </Modal>

      </div>
    );
  }
}

DashboardsPage.propTypes = {
  /**
   * Define the route path (from the router)
   */
  currentPage: React.PropTypes.string,
  /**
   * Define function to get the dashboard list
   */
  getDashboardList: React.PropTypes.func.isRequired,
  /**
   * Define dashboards list data
   */
  data: React.PropTypes.array
};

export default DashboardsPage;
