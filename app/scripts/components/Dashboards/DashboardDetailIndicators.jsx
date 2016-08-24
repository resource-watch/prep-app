import React from 'react';
import ChartCard from '../Cards/ChartCard';

function DashboardDetailIndicators(props) {
  let content = [];
  if (props.data && props.data.widgets.length) {
    props.data.widgets.forEach((indicator, index) => {
      // if (indicator.widget_type.name === 'chart') {
      content.push(
        <div
          className="columns small-12 medium-6"
          key={`indicator-${index}`}
          style={{display: 'flex'}}
        >
          <ChartCard
            tooltip
            title={indicator.title}
            subtitle={indicator.subtitle}
            data={indicator}
          />
        </div>
      );
      // } else if (indicator.widget_type.name === 'map') {
      //   content.push(
      //     <div className="-large" key={`indicator-${index}`}>
      //       <MapCard
      //         title="Skagit River Near Mount Vernon"
      //         data={indicator.data}
      //       />
      //     </div>
      //   );
      // }
    });
  }
  return (
    <div className="row align-stretch">
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
