import React from 'react';
import Article from '../Content/Article';
import JoinPartnership from './Articles/JoinPartnership';

class PlatformWorkgroup extends React.Component {

  render() {
    return (
      <div className="c-partnership">

        <Article>
          <p>Entities collaborate on the building of platforms to enhance access and usability of data.</p>
          <p>The Partnership for Resilience and Preparedness works to promote the development of interoperable platforms that enhance access and usability of information for climate resilience and preparedness.</p>
          <p>The PREP platform is currently in beta.  This helps communities access climate relevant data, explore insights from those data, and compile relevant data and tools in their own dashboards.</p>
          <p>The Platform WorkGroup is led by WRI.</p>
        </Article>

        <Article>
          <JoinPartnership />
        </Article>

      </div>
    );
  }

}

export default PlatformWorkgroup;
