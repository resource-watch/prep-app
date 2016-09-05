import React from 'react';
import Article from '../Content/Article';
import JoinPartnership from './Articles/JoinPartnership';

class EngagementWorkgroup extends React.Component {

  render() {
    return (
      <div className="c-partnership">

        <Article>
          <p>Entities that help develop, engage, or mobilize user communities to understand the information needs of those seeking to build preparedness and resilience.</p>
          <p>Effective climate resilience and preparedness planning often requires information specific to a region or community—or even to a sector or project within that region or community. That is why PREP engages with communities around the world to understand information needs at the local, regional and sectoral levels.</p>
          <p>The Engagement Workgroup is co-led by Future Earth and World Resources Institute</p>
        </Article>

        <Article>
          <JoinPartnership />
        </Article>

      </div>
    );
  }

}

export default EngagementWorkgroup;
