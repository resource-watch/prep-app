import React from 'react';
import WelcomeModal from '../Modal/WelcomeModal';

class Root extends React.Component {

  constructor() {
    super();
    this.state = {
      modalWelcomeOpen: false
    };
  }

  componentDidMount() {
    if (localStorage.getItem('modalWelcomeOpened') === false || localStorage.getItem('modalWelcomeOpened') === null) {
      this.setState({modalWelcomeOpen: true});
    }
  }

  render() {

    return (
      <div style={{height: '100%'}}>
        {this.props.children}

        {this.state.modalWelcomeOpen &&
        <WelcomeModal
          title={"Welcome to Partnership for Resilience & Preparedness Beta version"}
          opened={this.state.modalWelcomeOpen}
          close={() => {
            this.setState({modalWelcomeOpen: false});
            localStorage.setItem('modalWelcomeOpened', JSON.stringify(true));
          }
          }
          hideCloseButton
        />
        }
      </div>
    );
  }
}

export default Root;
