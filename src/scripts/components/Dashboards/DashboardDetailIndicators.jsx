import React from 'react';
import ChartCard from '../Cards/ChartCard';
import EmbedCard from '../Cards/EmbedCard';


function DashboardDetailIndicators(props) {
  let content = [];
  if (props.data && props.data.widgets.length) {
    props.data.widgets.forEach((indicator, index) => {
      if ( indicator.widget_type && indicator.widget_type.name === 'Embed' ) {
        content.push(
          <div className="large-12" key={`indicator-${index}`}>
           <EmbedCard
            tooltip
            title={indicator.title}
            subtitle={indicator.subtitle}
            data={indicator}
          />
          </div>
        );
      } else {
        content.push(
          <div className="columns small-12 medium-6" key={`indicator-${index}`}>
            <ChartCard
              tooltip
              title={indicator.title}
              subtitle={indicator.subtitle}
              data={indicator}
            />
          </div>
        );
      }
    });
  }
  return (
    <div className="row">
      { content }
    </div>
  );
}

DashboardDetailIndicators.propTypes = {
  /**
   * Define dashboard indicators data
   */
  data: React.PropTypes.any.isRequired
};

export default DashboardDetailIndicators;
