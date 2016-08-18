import React from 'react';
import Modal from './Modal';
import Button from './Button';
import ChartCard from '../cards/ChartCard';

class Tooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltipOpen: false
    };
  }

  handleClickClose() {
    this.setState({
      tooltipOpen: false
    });
  }

  render() {
    let content = (
      <div className="content">
        {this.props.data &&
          <ChartCard
            noBorder
            title={this.props.data.title}
            subtitle={this.props.data.subtitle}
            data={this.props.data}
          />
        }
        <div className="description">
          <div className="btn-container">
            <Button border> Download </Button>
          </div>
          <p>
            <span>Description: </span>
            {this.props.data.content}
          </p>
          <p>
            <span>Data: </span>
            {this.props.data.data_url}
          </p>
          <div className="img-container">
            {this.props.data.partner &&
              <img
                src={config.apiUrl + this.props.data.partner.logo}
                className="logo"
                alt={this.props.data.partner.name}
              />
            }
          </div>
        </div>
      </div>
    );

    return (
      <div className="c-tooltip">
        <span className="icon" onClick={() => this.setState({ tooltipOpen: true })}>i</span>
        <Modal
          opened={this.state.tooltipOpen}
          close={() => this.handleClickClose()}
        >

          {content}

        </Modal>
      </div>
    );
  }
}

Tooltip.propTypes = {
  /**
   * Define the data content of the tooltip
   * Required
   */
  data: React.PropTypes.any.isRequired
};

export default Tooltip;
