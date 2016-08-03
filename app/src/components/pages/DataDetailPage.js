import React from 'react';
import Title from '../commons/Title';
import Header from '../commons/Header';
import SectionIntro from '../commons/SectionIntro';
import MetadataList from '../commons/MetadataList';
import LoadingSpinner from '../commons/LoadingSpinner';
import VegaChart from '../commons/VegaChart';

class DataPageDetail extends React.Component {

  componentDidMount() {
    if (!this.props.data) {
      this.props.getDatasetData(this.props.datasetSlug);
    }
  }

  getTitle() {
    const data = this.props.data && this.props.data.attributes.info.attributes;

    if (data && data.title && !data.error) {
      return data.title;
    } else if (this.props.widget && this.props.widget.name) {
      return this.props.widget.name;
    } else if (data && data.error) {
      return data.title;
    }
    return '';
  }

  getContent() {
    if (!this.props.data) {
      return <LoadingSpinner />;
    }

    const data = this.props.data.attributes.info;

    return (<div>
      <div className="wrapper">
        <SectionIntro data={{}} currentSection={'data'} >
          <MetadataList data={data} />
        </SectionIntro>
      </div>

      <div className="wrapper">
        {this.props.widget && this.props.widget.widget_config &&
          <div className="chart-container">
            <VegaChart data={this.props.widget.widget_config} />
          </div>
        }
      </div>
    </div>);
  }

  render() {
    let content = this.getContent();
    let title;
    title = (
      <Title inverse center border type="page">
        {this.getTitle()}
      </Title>
    );
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
  getDatasetData: React.PropTypes.func.isRequired,
  /**
   * Define the dataset data
   */
  data: React.PropTypes.any,
  /**
   * Define the dataset widget
   */
  widget: React.PropTypes.any
};

export default DataPageDetail;
