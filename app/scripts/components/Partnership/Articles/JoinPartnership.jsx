import React from 'react';
import Form from '../../Form';

class JoinPartnership extends React.Component {

  render() {
    return (
      <div>
        <a name="join"></a>
        <h2>Join the PREP partnership</h2>
        <p>To become a partner, prepare a short letter of intent expressing your entity’s interest in PREP, your intended workgroup, and how you meet the partner criteria. Partner criteria are:</p>
        <ul>
          <li>A commitment to the PREP mission</li>
          <li>A commitment to support the PREP mission through in-kind or direct contribution</li>
          <li>A designated point of contact who will be actively involved as needed</li>
        </ul>

        <Form type="Join partnership" />

      </div>
    );
  }
}

export default JoinPartnership;
