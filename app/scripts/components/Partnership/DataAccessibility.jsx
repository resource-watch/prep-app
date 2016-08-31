import React from 'react';
import Article from '../Content/Article';
import JoinPartnership from './Articles/JoinPartnership';

class DataAccessibility extends React.Component {

  render() {
    return (
      <div className="c-partnership">

        <Article>
          <p>Entities that work to ensure interoperability in access and use of climate-relevant data and information.</p>
          <p>The Data Workgroup endeavors to identify and reduce the barriers to accessing, contributing, and using data for climate resilience. It promotes standards to ensure interoperability in access and use of climate-relevant data and information.</p>
          <p>The Data Workgroup is co-led by the Federation of Earth Science Information Partners (ESIP) and NASA.</p>
        </Article>

        <Article>
          <JoinPartnership />
        </Article>

      </div>
    );
  }

}

export default DataAccessibility;
