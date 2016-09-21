import React from 'react';

class SonomaSlide3 extends React.Component {

  render() {
    return (
      <section>
        <section className="sonoma-slide slide-map-3-1">
          <div className="container content-section">
            <div className="row">
              <div className="columns medium-6 wrapper">
                <header className="header">
                  <h2 className="title">Increase in Warmer Winter Nights projected</h2>
                </header>
                <p className="content">
                  This map visualization shows the Sonoma County region is projected to see an
                  increase in night-time temperature for winter months (Dec, Jan, Feb).
                </p>
                <p className="content">
                  Warmer Winter Nights will bring more relaxing evenings outdoors, yet also bring
                  potential problems for agriculture and health.
                </p>
              </div>
              <div className="columns medium-6 wrapper map-card">
                <div id="map3-1" className="map slide-map-3-1"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="sonoma-slide">
          <div className="container content-section">
            <div className="row">
              <div className="overlapping-cards">
                <div className="card -sm">
                  <p>While warmer winter nights may seem great to be outside and use less energy to
                    heat your home or office, it can affect agriculture, Sonoma County’s largest
                    industry, in complex ways. Growers have been adapting to environmental changes
                    creatively for decades and will need to in the future.</p>
                  <p>Grapevines require a certain number of nights near freezing to produce fruit.
                    Fewer freezing nights will therefore require shifts to agricultural practices to
                    maintain their production levels.</p>
                </div>
                <div className="card slide-3-2">
                  <p>Also when night times temperatures get so low that grapes are threatened by
                    frost, vineyard managers will spray grapevines with water immediately prior to
                    the freeze to protect the vines from extreme damage.</p>
                  <p>Fewer nights of freezing will result therefore in less water used by
                    agriculture for frost protection.</p>
                  <p>Warmer winter nights unfortunately also increase the potential for disease
                    vectors from mosquitoes and rodents. Freezing nights kill mosquitoes and reduce
                    rodent population.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    );
  }
}

export default SonomaSlide3;
