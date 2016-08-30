import React from 'react';
import Form from '../Form';

class Contact extends React.Component {
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
      <div>
        <article className="c-article">
          <div className="row align-center">
            <div className="column small-12 medium-8">
              <h2>Submit your coments and questions</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc finibus tortor a elit dignissim, vitae facilisis risus dignissim. Maecenas imperdiet laoreet ipsum id tincidunt. Ut ornare luctus scelerisque.</p>
              {!this.state.success && <p>* Required field</p>}
              <div className="c-form-container">
                <p className="error-message">Please, fill out the hightlighted fields bellow</p>
                {!this.state.success ?
                  <Form type='Contact' submit={()=>this.handleSubmit()}/> :
                  <div className="success-message"><p>Your message was sent successfully</p></div> }
              </div>
            </div>
          </div>
        </article>

      </div>
    );
  }
}

export default Contact;
