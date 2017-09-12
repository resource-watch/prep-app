import React from 'react';

const formDocUrl = 'http://goo.gl/forms/sQeIudXzBYhxStWi1';

function JoinPartnership() {
  return (
    <div>
      <h2>Join the PREP partnership</h2>
      <p>To become a partner, please fill out this <a href={formDocUrl}>form</a> expressing
        your entity’s interest in PREP, your intended workgroup,
        and how you meet the partner criteria. Partner criteria are:</p>
      <ul>
        <li>A commitment to the PREP mission</li>
        <li>A commitment to support the PREP mission through in-kind or direct contribution</li>
        <li>A designated point of contact who will be actively involved as needed</li>
      </ul>
      <a href={formDocUrl}>Go to form</a>
    </div>
  );
}

export default JoinPartnership;
