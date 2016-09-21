import React from 'react';
import WidgetChart from '../../../../../containers/Chart/WidgetChart';

function SonomaSlide2() {
  return (<section>
    <section className="sonoma-slide" data-title="How are Climate Projections Developed?">
      <div className="container content-section">
        <div className="row align-middle">
          <div className="column medium-6">
            <header className="header">
              <h2 className="title">How are Climate Projections Developed?</h2>
            </header>
            <p className="content">
              By integrating global climate data with local watershed models, scientists from the US Geological Survey have projected <a href="http://ca.water.usgs.gov/projects/reg_hydro/projects/dataset.html" target="_blank">potential climate vulnerabilities</a> for the Sonoma County region.
            </p>
            <p className="content">
              Chart: <a href="http://climate.calcommons.org/crnb/home" target="_blank">Climate projections in this dashboard</a> are produced by the <a href="http://ca.water.usgs.gov/projects/reg_hydro/projects/dataset.html" target="_blank">USGS</a> and <a href="http://www.pepperwoodpreserve.org/tbc3/" target="_blank">TBC3.org</a> in collaboration with <a href="http://climate.calcommons.org/crnb/home" target="_blank">Climate Ready North Bay</a>, a public-private partnership funded by the California Coastal Conservancy’s Climate Ready program.
            </p>
          </div>
          <div className="column medium-6">
            <div className="chart-card -bg-grey">
              <WidgetChart slug="precipitation-change-sonoma" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="sonoma-slide" data-title="Interpreting Climate Projections">
      <div className="container content-section">
        <div className="row align-middle">
          <div className="column medium-6">
            <div className="chart-card -bg-grey">
              <WidgetChart slug="precipitation-change-sonoma" />
            </div>
          </div>
          <div className="column medium-6">
            <header className="header">
              <h2 className="title">Interpreting Climate Projections</h2>
            </header>
            <p className="content">
              Climate projections are summarized using 30-year averages to describe the direction and size of potential climate trends. Downscaled climate projections can be displayed at annual intervals shown on the right. These are not predictions of when these conditions will occur, but simulations of the potential variability underlying <a href="http://climate.calcommons.org/article/why-so-many-climate-models" target="_blank">climate data ensembles</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  </section>
  );
}

export default SonomaSlide2;
