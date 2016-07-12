import React from 'react';
import { Link } from 'react-router';
import Header from '../commons/Header';
import Title from '../commons/Title';
import Card from '../cards/Card';
import Button from '../commons/Button';
import Modal from '../commons/Modal';
import LoadingSpinner from '../commons/LoadingSpinner';

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
    this.pageType = 1; // For page colors, 1 = yellow
  }

  getContent() {
    if (!this.props.data) {
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
            <Title type="content">
              {item.title}
            </Title>
          </Link>
          <p className="content">
            {item.summary}
          </p>
          <a href="#">
            <img
              src={item.partner.logo}
              className="logo"
              alt={item.partner.name}
            />
          </a>
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
        <Header type="small" pageType={this.pageType}>
          <Title inverse center border type="page">
            Dashboards
          </Title>
        </Header>

        {content}

        <div className="other-links">
          <div className="wrapper">
            <div className="cards-container">
              <div className="card -map">
                <Title inverse center>Data on the map</Title>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                <Link to="/data">
                  <Button themeColor>Explore the map</Button>
                </Link>
              </div>
              <div className="card -image">
                <Title inverse center>Insights</Title>
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
                <Title inverse center>
                  Do you have relevant data about climate?
                </Title>
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
                <Title inverse center>
                  Would you like to improve a dashboard?
                </Title>
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
  data: React.PropTypes.array,
};

export default DashboardsPage;
