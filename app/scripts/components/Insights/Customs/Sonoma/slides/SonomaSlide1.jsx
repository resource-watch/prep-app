import React from 'react';
import WidgetChart from '../../../../../containers/Chart/WidgetChart';

function SonomaSlide1() {
  return (
    <section>
      <section className="sonoma-slide" data-title="Our Climate is getting Warmer and More Variable">
        <div className="container content-section">
          <div className="row align-middle">
            <div className="column medium-6">
              <header className="header">
                <h2 className="title">Our Climate is getting Warmer and More Variable</h2>
              </header>
              <p className="content">
                Chart: Yearly rain and yearly summer air temperature for Sonoma County, showing actual data before 2010 and projected data from multiple models after 2010. The model closest to the mid-range of all the models, used throughout this dashboard, is highlighted in black. Dotted lines show 10th and 90th percentiles.
              </p>
            </div>
            <div className="column medium-6">
              <div className="chart-card -bg-grey -column">
                <WidgetChart small slug="precipitation-change-sonoma" />
                <WidgetChart small slug="historical-and-projected-annual-changes-in-summer-air-temperature-c" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="sonoma-slide" data-title="Our Climate is getting Warmer and More Variable">
        <div className="container content-section">
          <div className="row align-middle">
            <div className="column medium-6">
              <div className="chart-card -bg-grey -column">
                <WidgetChart small slug="precipitation-change-sonoma" />
                <WidgetChart small slug="historical-and-projected-annual-changes-in-summer-air-temperature-c" />
              </div>
            </div>
            <div className="column medium-6">
              <header className="header">
                <h2 className="title">Our Climate is getting Warmer and More Variable</h2>
              </header>
              <p className="content">Scientists can estimate the range of future climate change outcomes using computer models.</p>
              <p className="content">18 future projections were evaluated and all suggest that Sonoma County climate is getting warmer and more variable.</p>
              <p className="content">This dashboard presents results from just one climate-hydrology projection for illustration.</p>
              <p className="content">Chart: Yearly rain and yearly summer air temperature for Sonoma County, showing actual data before 2010 and projected data from multiple models after 2010. The model closest to the mid-range of all the models, used throughout this dashboard, is highlighted in black. Dotted lines show 10th and 90th percentiles.</p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default SonomaSlide1;
