import React from 'react';
import Form from '../Form';

class ContactForm extends React.Component {

  componentDidMount() {
    this.setFormData();
  }

  setFormData() {
    document.getElementById('mce-FNAME').placeholder = 'Name';
    document.getElementById('mce-EMAIL').placeholder = 'your@email.org';
    document.getElementById('mce-MMERGE4').placeholder = 'Your message here';
    document.getElementById('mc-embedded-subscribe').value = 'Send message';

    // As it's required by default can't be focused and triggers an error
    document.getElementById('mce-LNAME').required = false;
  }

  render() {
    return (
      <div className="c-contact-form">
        <article className="c-article -inverse">
          <div className="row align-center">
            <div className="column small-12 medium-6">
              <h2 className="-left">We want to hear from you</h2>
              <p>PREP aims to enhance access and use of data and information to help communities build climate resilience. We can only do this with input from users like you.</p>
            </div>
            <div className="column small-12 medium-6">
              <Form type="Contact" simple />
            </div>
          </div>
        </article>

      </div>
    );
  }
}

export default ContactForm;
