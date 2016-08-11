import React from 'react';
import Article from '../Content/Article';
import JoinPartnership from './Articles/JoinPartnership';

class DataAccessibility extends React.Component {

  render() {
    return (
      <div className="c-partnership">

        <Article>
          <p>Entities that work to establish ensure interoperability in access and use of climate-relevant data and information produce.</p>
          <p>This Data Accessibility Workgroup works to identify and reduce the barriers to access, contribute, and use data for climate resilience.  The group promote standards to ensure interoperability in access and use of climate-relevant data and information.</p>
          <p>The Data Accessibility WorkGroup is lead by the Federation of Earth Science Information Partners (ESIP).</p>
        </Article>

        <Article>
          <JoinPartnership />
        </Article>

      </div>
    );
  }

}

export default DataAccessibility;
