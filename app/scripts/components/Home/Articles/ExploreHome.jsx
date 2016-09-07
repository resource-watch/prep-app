import React from 'react';
import { Link } from 'react-router';
import temperaturesLayer from '../../../../images/home/temperatures-layer.jpg';
import Modal from '../../Modal/Modal';
import Form from '../../Form';


class ExploreHome extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  handleClick() {
    this.setState({ modal: true });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="column small-12 medium-8">
            <h2 className="-left">Exploring the data</h2>
            <Link to="/explore">Go to explore</Link>
          </div>
        </div>
        <div className="row">
          <div className="column small-12 medium-8">
            <p>Interact with national, regional, and local data on this web map. Filter by topic, projection models, and area of impact to create a custom map in seconds. When you’re ready, share your findings to raise awareness in your community.</p>
          </div>
          <div className="column small-12 medium-4">
            <button className="c-button -border" onClick={()=>this.handleClick()}>Request data</button>
          </div>
        </div>
        <p><img src={temperaturesLayer} /></p>
        <Modal
          opened={this.state.modal}
          close={() => this.setState({ modal: false })}
        >
          <h2>Request data</h2>
          <p>Our goal is to make climate related information more accessible. Let us know what data you want and how you would use it.</p>
          <Form type="Request data" />
        </Modal>

      </div>
    );
  }
}

export default ExploreHome;
