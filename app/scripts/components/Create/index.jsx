import React from 'react';
import Form from '../Form';

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false
    };
  }

  handleSubmit() {
    this.setState({success: true});
  }

  render() {
    return (
      <article className="c-article">
        <div className="row align-center">
          <div className="column small-12 medium-8">
            <h2>Request access</h2>
            {!this.state.success && <p>* Required field</p>}
            <div className="c-form-container">
              <p className="error-message">Please, fill out the hightlighted fields bellow</p>
              {!this.state.success ?
                <Form type='Request access' submit={()=>this.handleSubmit()}/> :
                <div className="success-message"><p>Your message was sent successfully</p></div> }
            </div>
          </div>
        </div>
      </article>
    );
  }
}

export default Create;
