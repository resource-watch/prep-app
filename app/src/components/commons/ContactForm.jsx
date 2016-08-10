import React, { Component } from 'react';

class PartnersLogos extends Component {

  render() {
    return (
      <form className="contact-box">
        <input type="email" placeholder="your@email.org" className="email" />
        <textarea placeholder="Your message here" className="message"></textarea>
        <Button
          fill
          border
          click={this.onSubmitForm.bind(this)}
        >
          Send message
        </Button>
      </form>
    );
  }

  onSubmitForm(e) {
    if (e.preventDefault && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
  }

}

export default Contact;
