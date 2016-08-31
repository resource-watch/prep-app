import React from 'react';
import Form from '../Form';

class Contact extends React.Component {

  render() {
    return (
      <div>
        <article className="c-article">
          <div className="row align-center">
            <div className="column small-12 medium-8">
              <h2>Submit your coments and questions</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc finibus tortor a elit dignissim, vitae facilisis risus dignissim. Maecenas imperdiet laoreet ipsum id tincidunt. Ut ornare luctus scelerisque.</p>

              <Form type="Contact" />
            </div>
          </div>
        </article>

      </div>
    );
  }
}

export default Contact;
