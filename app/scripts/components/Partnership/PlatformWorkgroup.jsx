import React from 'react';
import Article from '../Content/Article';
import JoinPartnership from './Articles/JoinPartnership';

class PlatformWorkgroup extends React.Component {

  render() {
    return (
      <div className="c-partnership">

        <Article>
          <p>Entities that collaborate on building platforms to enhance access and usability of data.</p>
          <p>The PREP platform, currently in beta, is designed to help users access <strong>climate relevant data</strong>, explore <strong>insights from those data</strong>, and compile relevant data and tools in their own <strong>dashboards</strong>.</p>
          <p>The Platform Workgroup is co-led by World Resources Institute and the U.S. Department of the Interior (DOI).</p>
        </Article>

        <Article>
          <JoinPartnership />
        </Article>

      </div>
    );
  }

}

export default PlatformWorkgroup;
