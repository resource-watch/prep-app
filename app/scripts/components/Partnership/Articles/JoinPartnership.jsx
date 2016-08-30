import React from 'react';
import Form from '../../Form';

class JoinPartnership extends React.Component {
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
        <a name="join"></a>
        <h2>Join the PREP partnership</h2>
        <p>To become a partner, prepare a short “letter of intent” expressing your entity’s interest in PREP, your intended workgroup, and how you meet the partner criteria. Members of the Steering Committee will review the letter to ensure the partnership criteria are met. Partners, and a description of their role in and contribution to PREP, will be publicly listed in the “Partners” portion of the PREP website. Partner criteria are:</p>
        <ul>
          <li>A commitment to the PREP mission.</li>
          <li>A commitment to contribute to the Partnership{"'"}s mission through in-kind or direct contribution (e.g. engagement, data, platform).</li>
          <li>Delegation of at least one person to be the point of contact who is actively involved as needed.</li>
        </ul><br/>
        {!this.state.success && <p>* Required field</p>}
        <div className="c-form-container">
          <p className="error-message">Please, fill out the hightlighted fields bellow</p>
          {!this.state.success ?
            <Form type='Join partnership' submit={()=>this.handleSubmit()}/> :
            <div className="success-message">
              <div className="check">
                <svg width="13" height="9" viewBox="0 0 13 9" xmlns="http://www.w3.org/2000/svg">
                  <title>check</title>
                  <path d="M5.744 6.997l6.514-5.465L10.972 0 4.46 5.464 1.176 3.078 0 4.696l4.854 3.527.89-1.226z" />
                </svg>
              </div>
              <p>Your message was sent successfully</p>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default JoinPartnership;
