import React from 'react';

class SonomaSlideOne extends React.Component {

  render() {
    return (
      <section>
        <section className="sonoma-slide">
          <div className="container content-section">
            <div className="row">
              <div className="col-md-6 wrapper">
                <header className="header">
                  <h2 className="title">Projected Overall increased weather variability</h2>
                </header>
                <p className="content">
                  Unprecedented warm conditions are projected to occur in both summer and winter
                  seasons. Both extreme wet years and extreme dry years are likely to occur.
                  Overall,
                  despite all this variability, the North Bay region is becoming more arid due to
                  rising temperatures.
                </p>
                <p className="content">
                  Preparing for the impacts of this increased weather variability is critically
                  important
                </p>
              </div>
              <div className="col-md-6 wrapper">
                <div className="chart-card">
                  <h2>Projected annual precipitations between 2010 and 2099</h2>
                  <div className="info-button">i</div>
                  <div className="chart" id="chart1-1"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="sonoma-slide slide-map-1-3 -no-center">
          <div className="container">
            <h1 className="float-title">Temperatures increasing throughout the Year <span
              className="info-button">i</span></h1>
          </div>
          <div id="map1-3" className="map -big slide-map-1-3"></div>
          <div className="map-legend">
            <div className="range years">
              <span className="-selected">1951-1980</span>
              <span>1981-2010</span>
              <span>2011-2039</span>
              <span>2040-2069</span>
              <span>2070-2099</span>
            </div>
            <div id="timelineSlider1-3" className="slide"></div>
            <span className="title">Explanation</span>
            <span className="legend"> Areas showing where the 30-yr average maximum monthly
            temperature exceeds average maximum temperature between 1981 to 2010 (>72.2 °F) </span>
          </div>
        </section>
        <section className="sonoma-slide">
          <div className="container content-section">
            <div className="row">
              <div className="overlapping-cards">
                <div className="card">
                  <p>Increase weather variability requires more planning and investments to prepare
                    the Sonoma County Region to be resilient in the face of this climate change in
                    areas such as:
                  </p>
                  <ul>
                    <li>Infrastructure improvements (buildings, roads, energy grids)</li>
                    <li>Agriculture</li>
                    <li>Water Management</li>
                    <li>Health Services</li>
                    <li>Fire Management</li>
                  </ul>
                </div>
                <div className="card slide-1-3"></div>
              </div>
            </div>
          </div>
        </section>
        </section>


        );
        }
        }

        export default SonomaSlideOne;
