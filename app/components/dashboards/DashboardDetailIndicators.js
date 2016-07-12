import React from 'react';
import MapCard from '../cards/MapCard';
import ChartCard from '../cards/ChartCard';

function DashboardDetailIndicators(props) {
  let content = [];
  if (props.data && props.data.widgets.length) {
    props.data.widgets.forEach((indicator, index) => {
      if (indicator.widget_type.name === 'chart') {
        content.push(
          <div key={`indicator-${index}`}>
            <ChartCard
              tooltip
              title={indicator.title}
              subtitle={indicator.subtitle}
              data={indicator}
            />
          </div>
        );
      } else if (indicator.widget_type.name === 'map') {
        content.push(
          <div className="-large" key={`indicator-${index}`}>
            <MapCard
              title="Skagit River Near Mount Vernon"
              data={indicator.data}
            />
          </div>
        );
      }
    });
  }
  return (
    <div className="cards">
      {content}
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
