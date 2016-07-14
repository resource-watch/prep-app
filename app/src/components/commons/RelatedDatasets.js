import React from 'react';
import Modal from './Modal';
import Title from './Title';

class RelatedDatasets extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
  }

  render() {
    return (
      <div className="c-related-datasets">
        <div className="wrapper">
          <Title border>
            Related datasets
          </Title>
          <div className="datasets">
            <div className="dataset">
              <div className="title">
                Intact forest landscapes
              </div>
              <div className="links">
                <a onClick={() => this.setState({ modalOpen: true })}>CSV</a>
                <a href="http://www.wri.org" rel="noreferrer" target="_blank">
                  WRI
                </a>
              </div>
            </div>
            <div className="dataset">
              <div className="title">
                Environmental democracy index
              </div>
              <div className="links">
                <a onClick={() => this.setState({ modalOpen: true })}>CSV</a>
                <a href="http://www.nasa.gov" rel="noreferrer" target="_blank">
                  NASA
                </a>
              </div>
            </div>
            <div className="dataset">
              <div className="title">
                Epidemic
              </div>
              <div className="links">
                <a onClick={() => this.setState({ modalOpen: true })}>CSV</a>
                <a
                  href="http://openweathermap.org"
                  rel="noreferrer"
                  target="_blank"
                >
                  Open Weather Map
                </a>
              </div>
            </div>
            <div className="dataset">
              <div className="title">
                Aqueduct: Water stress projections
              </div>
              <div className="links">
                <a onClick={() => this.setState({ modalOpen: true })}>CSV</a>
                <a href="https://www.usgs.gov" rel="noreferrer" target="_blank">
                  USGS
                </a>
              </div>
            </div>
            <div className="dataset">
              <div className="title">
                Intact forest landscapes
              </div>
              <div className="links">
                <a onClick={() => this.setState({ modalOpen: true })}>CSV</a>
                <a href="http://www.wri.org" rel="noreferrer" target="_blank">
                  WRI
                </a>
              </div>
            </div>
            <div className="dataset">
              <div className="title">
                Environmental democracy index
              </div>
              <div className="links">
                <a onClick={() => this.setState({ modalOpen: true })}>CSV</a>
                <a href="http://www.iucn.org" rel="noreferrer" target="_blank">
                  IUCN
                </a>
              </div>
            </div>
          </div>

          <Modal
            opened={this.state.modalOpen}
            close={() => this.setState({ modalOpen: false })}
          >
            <div className="content">
              The website is under development. Download details will be added
              here.
            </div>
          </Modal>
        </div>
      </div>
    );
  }

}

export default RelatedDatasets;
