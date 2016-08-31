import React from 'react';

function Form(props) {
  return (
    <div id="mc_embed_signup">
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
            <select name="MMERGE3" className="required" id="mce-MMERGE3" required defaultValue={props.type}>
              <option value=""></option>
              <option value="Contact">Contact</option>
              <option value="Request data">Request data</option>
              <option value="Join partnership">Join partnership</option>
              <option value="Request access">Request access</option>
            </select>
          </div>
          <div className="mc-field-group">
            <label htmlFor="mce-FNAME">First Name *<span className="asterisk"></span></label>
            <input type="text" name="FNAME" className="required" id="mce-FNAME" required/>
          </div>
          <div className="mc-field-group">
            <label htmlFor="mce-LNAME">Last Name *<span className="asterisk"></span></label>
            <input type="text" name="LNAME" className="required" id="mce-LNAME" required/>
          </div>
          <div className="mc-field-group">
            <label htmlFor="mce-EMAIL">Email Address *<span className="asterisk"></span></label>
            <input type="email" name="EMAIL" className="required email" id="mce-EMAIL" required/>
          </div>
          <div className="mc-field-group textarea">
            <label htmlFor="mce-MMERGE4">What would you like to say? *<span className="asterisk"></span></label>
            <textarea name="MMERGE4" className="required" id="mce-MMERGE4" required/>
          </div>
          <div id="mce-responses" className="clear">
            <div className="response" id="mce-error-response" style={{display: 'none'}}></div>
            <div className="response" id="mce-success-response" style={{display: 'none'}}></div>
          </div>
          <div style={{position: 'absolute', left: '-5000px', ariaHidden: 'true'}}>
            <input type="text" name="b_c99e39850f4acfe33f49fea68_ccad0f31c4" tabIndex="-1" value="" />
          </div>
          <div className="clear">
            <input
              type="submit"
              value="Subscribe"
              name="subscribe"
              id="mc-embedded-subscribe"
              className="c-button -filled -secondary-color button"
              onClick={()=>props.submit()}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

Form.propTypes = {
  type: React.PropTypes.string
};

export default Form;
