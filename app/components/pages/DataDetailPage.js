import React from 'react';
import Title from '../commons/Title';
import Header from '../commons/Header';
import SectionIntro from '../commons/SectionIntro';
import LoadingSpinner from '../commons/LoadingSpinner';
import VegaChart from '../commons/VegaChart';

class DataPageDetail extends React.Component {

  componentDidMount() {
    if (!this.props.data) {
      this.props.getDatasetBySlug(this.props.datasetSlug);
    }
  }

  getContent() {
    if (!this.props.data) {
      return <LoadingSpinner />;
    }
    return (<div>
      <div className="wrapper">
        <SectionIntro
          data={this.props.data}
          currentPage={this.props.currentPage}
        />
      </div>

      <div className="wrapper">
        <p>{this.props.data.summary}</p>
        <div className="chart-container">
          <VegaChart data={JSON.parse(JSON.stringify(this.props.data.json_spec.data))} />
        </div>
      </div>
    </div>);
  }

  render() {
    let content = this.getContent();
    let title;
    if (this.props.data && this.props.data.title) {
      title = (
        <Title inverse center border type="page">
          {this.props.data.title}
        </Title>
      );
    }
    return (
      <div className="l-dashboards">
        <Header type="small">
          {title}
        </Header>

        {content}

      </div>
    );
  }
}

DataPageDetail.propTypes = {
  /**
   * Define the route path (from the router)
   */
  currentPage: React.PropTypes.string,
  /**
   * Define the slug of the dataset
   */
  datasetSlug: React.PropTypes.string.isRequired,
  /**
   * Define the function to get the datataset detail data
   */
  getDatasetBySlug: React.PropTypes.func.isRequired,
  /**
   * Define the dataset data
   */
  data: React.PropTypes.any
};

export default DataPageDetail;
