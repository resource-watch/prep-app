import React from 'react';

class SonomaSlide6 extends React.Component {

  render() {
    return (
      <section>
        <section className="sonoma-slide">
          <div className="container content-section">
            <div className="row">
              <div className="columns medium-6 wrapper">
                <header className="header">
                  <h2 className="title">Increase in intense storm events</h2>
                </header>
                <p className="content">The frequency of 3-day “very high water flow events” are up to 3 times more likely to occur than they do currently.</p>
              </div>
              <div className="columns medium-6 wrapper">
                <div className="chart-card -light">
                  <h2>Number of 3-day flow events in the Russian river watershed</h2>
                  <div className="info-button">i</div>
                  <div className="chart" id="chart6-1"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="sonoma-slide">
          <div className="container content-section">
            <div className="row">
              <div className="overlapping-cards">
                <div className="card">
                  <p>The most worrisome storm events are ones that become labeled “the worst storm events for a given year or decade”. Which usually last 3 days and have extremely high rainfall, water runoff and flooding (called water flow).</p>
                  <p>Extreme weather events require planning for emergencies such as road and store closures where you need to have supplies of water and food to live on your own for a few days if needed.</p>
                  <p>Agriculture and landscape preparation includes prevention of soil erosion and crop/plant damage.</p>
                </div>
                <div className="card slide-6-2"></div>
              </div>
            </div>
          </div>
        </section>

      </section>
    );
  }
}

export default SonomaSlide6;
