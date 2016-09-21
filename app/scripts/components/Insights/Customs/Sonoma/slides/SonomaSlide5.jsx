import React from 'react';

class SonomaSlide5 extends React.Component {

  render() {
    return (
      <section>
        <section className="sonoma-slide">
          <div className="container content-section">
            <div className="row">
              <div className="columns medium-6 wrapper">
                <header className="header">
                  <h2 className="title">Rainfall is projected to become more variable</h2>
                </header>
                <p className="content">These graphs project an increased frequency of both high and low rainfall years in the coming century.</p>
              </div>
              <div className="columns medium-6 wrapper">
                <div className="chart-card">
                  <h2>Projected annual precipitations between 2010 and 2099</h2>
                  <div className="info-button">i</div>
                  <div className="chart" id="chart5-1"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="sonoma-slide">
          <div className="container content-section">
            <div className="row">
              <div className="overlapping-cards">
                <div className="card -sm">
                  <h1>Rainfall fluctuation consequences</h1>
                  <p>With these fluctuations between high and low rainfall years, periods of drought and floods are projected.</p>
                  <p>Streams could fluctuate dramatically affecting water supply, fish habitat and transportation infrastructure such as roads and bridges.</p>
                </div>
                <div className="card slide-5-2"></div>
              </div>
            </div>
          </div>
        </section>
      </section>
    );
  }
}

export default SonomaSlide5;
