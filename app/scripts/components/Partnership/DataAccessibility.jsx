import React from 'react';
import Article from '../Content/Article';
import JoinPartnership from './Articles/JoinPartnership';

class DataAccessibility extends React.Component {

  render() {
    return (
      <div className="c-partnership">

        <Article>
          <p>The Data Workgroup strives to ensure interoperability in access and use of climate-relevant data and information. The group aims to identify and reduce the barriers to discovering, accessing, contributing, and using data for climate resilience. It promotes standards and best practices for data interoperability across the private and public sectors.
          </p>
          <p>The Data Workgroup is led by the U.S. National Aeronautics and Space Administration (NASA).
          </p>
          <p>PREP Data Workgroup activities will include:
          </p>
          <ol>
            <li>Providing a forum to discuss and document lessons learned discovering and accessing climate data.</li>
            <li>Prototyping solutions for improved climate data interoperability.</li>
            <li>Providing feedback to improve datasets, closing the loop between data providers and users.</li>
          </ol>
          <p>To get involved please submit your letter of interest below.
          </p>
        </Article>

        <Article>
          <JoinPartnership />
        </Article>

      </div>
    );
  }

}

export default DataAccessibility;
