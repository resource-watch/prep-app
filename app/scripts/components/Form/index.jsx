import React from 'react';

class Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      success: false
    };
  }

  handleSubmit() {
    this.checkFormFill().length === 0 &&
      this.setState({ success: true });
  }

  checkFormFill() {
    const fields = ['mce-FNAME', 'mce-EMAIL', 'mce-MMERGE4'];
    !this.props.simple && fields.push('mce-LNAME');

    return fields.filter((field)=>{
      const element = document.getElementById(field);
      return element && element.value === '';
    });
  }

  renderForm() {
    return (
      <div id="mc_embed_signup" className="c-form-container">
        <form
          action="//resourcewatch.us12.list-manage.com/subscribe/post?u=c99e39850f4acfe33f49fea68&id=ccad0f31c4"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          className="validate"
          target="_blank"
        >
          <div id="mc_embed_signup_scroll">
            <div className="mc-field-group -hidden">
              <label htmlFor="mce-MMERGE3">Who would you like to contact? *<span className="asterisk"></span></label>
              <select name="MMERGE3" className="required" id="mce-MMERGE3" required defaultValue={this.props.type}>
                <option value="Contact">Contact</option>
                <option value="Request data">Request data</option>
                <option value="Join partnership">Join partnership</option>
                <option value="Request access">Request access</option>
              </select>
            </div>
            <div className="mc-field-group name">
              <label htmlFor="mce-FNAME">First Name *<span className="asterisk"></span></label>
              <input type="text" name="FNAME" className="required" id="mce-FNAME" required/>
            </div>
            <div className="mc-field-group last-name">
              <label htmlFor="mce-LNAME">Last Name *<span className="asterisk"></span></label>
              <input type="text" name="LNAME" className="required" id="mce-LNAME" required/>
            </div>
            <div className="mc-field-group email">
              <label htmlFor="mce-EMAIL">Email Address *<span className="asterisk"></span></label>
              <input type="email" name="EMAIL" className="required email" id="mce-EMAIL" required/>
            </div>
            <div className="mc-field-group organization">
              <label htmlFor="mce-MMERGE5">Organization<span className="asterisk"></span></label>
              <input type="text" name="MMERGE5" id="mce-MMERGE5"/>
            </div>
            <div className="mc-field-group textarea">
              <label htmlFor="mce-MMERGE4">Message *<span className="asterisk"></span></label>
              <textarea name="MMERGE4" className="required" id="mce-MMERGE4" required/>
            </div>
            <div id="mce-responses" className="clear">
              <div className="response" id="mce-error-response" style={{display: 'none'}}></div>
              <div className="response" id="mce-success-response" style={{display: 'none'}}></div>
            </div>
            <div style={{position: 'absolute', left: '-5000px', ariaHidden: 'true'}}>
              <input type="text" name="b_c99e39850f4acfe33f49fea68_ccad0f31c4" tabIndex="-1" value="" />
            </div>
            <div className="form-actions">
              <input
                type="submit"
                value="Submit"
                name="subscribe"
                id="mc-embedded-subscribe"
                className="c-button -filled -secondary-color button"
                onClick={()=>this.handleSubmit()}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }

  renderError() {
    return (
      <p className="error-message">Please, fill out the hightlighted fields bellow</p>
    );
  }

  renderSuccess() {
    return (
      <div className="success-message">
        <div className="check">
          <svg width="13" height="9" viewBox="0 0 13 9">
            <title>check</title>
            <path d="M5.744 6.997l6.514-5.465L10.972 0 4.46 5.464 1.176 3.078 0 4.696l4.854 3.527.89-1.226z" />
          </svg>
        </div>
        <p>Your message was sent successfully</p>
      </div>
    );
  }

  render() {
    return (
      <div className="c-form">
        {!this.state.success && <p className="-small">* Required field</p>}
        {!this.state.success ? this.renderForm() : this.renderSuccess()}
      </div>
    );
  }

}

Form.propTypes = {
  type: React.PropTypes.string
};

export default Form;
