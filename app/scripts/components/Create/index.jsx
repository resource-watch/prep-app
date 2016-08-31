import React from 'react';
import Form from '../Form';

class Create extends React.Component {

  render() {
    return (
      <article className="c-article">
        <div className="row align-center">
          <div className="column small-12 medium-8">
            <h2>Request access</h2>
            <Form type="Request access" />
          </div>
        </div>
      </article>
    );
  }
}

export default Create;
