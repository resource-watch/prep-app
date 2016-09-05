import React from 'react';
import Form from '../Form';

class Contact extends React.Component {

  render() {
    return (
      <div>
        <article className="c-article">
          <div className="row align-center">
            <div className="column small-12 medium-8">
              <h2>Submit your comments and suggestions</h2>
              <p>Have questions, feedback, or suggestions? Send us a note at <a href="mailto:info@prepdata.org">info@prepdata.org</a> or fill out the form below.</p>
              <Form type="Contact" />
            </div>
          </div>
        </article>
      </div>
    );
  }
}

export default Contact;
