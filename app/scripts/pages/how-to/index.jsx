import React from 'react';
import Article from '../../components/Content/Article';
import { Link } from 'react-router';

class HowTo extends React.PureComponent {
  render() {
    return (
      <div className="c-privacy-policy">
        <Article>
          <p>
            PREPdata enables users to create personalized dashboards of climate risks that combine top-down data with local information. Upload your own data or pull in data from authoritative global sources through the platform, save your favorite datasets, build a dashboard of indicators, share your content, and learn from other PREPdata users.
          </p>


        </Article>
      </div>
    );
  }
}

export default HowTo;
