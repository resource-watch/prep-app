import React from 'react';
import Article from '../Content/Article';
import JoinPartnership from './Articles/JoinPartnership';

function PlatformWorkgroup() {
  return (
    <div className="c-partnership">
      <Article>
        <p>The Platform Workgroup collaborates on building platforms to enhance access and usability of data.</p>
        <p>The PREP platform, currently in beta, is designed to help users access climate relevant data,
          explore insights from those data, and compile relevant data and tools in their own dashboards.</p>
        <p>The Platform Workgroup is co-led by World Resources Institute and the U.S. Department of the Interior (DOI).</p>
      </Article>

      <Article>
        <JoinPartnership />
      </Article>
    </div>
  );
}

export default PlatformWorkgroup;
