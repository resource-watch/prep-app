import React from 'react';

class SonomaSlideOne extends React.Component {

  render() {
    return (
      <section>
        <section className="sonoma-slide slide-map-4-2">
          <div className="container content-section">
            <div className="row">
              <div className="columns medium-6 wrapper">
                <header className="header">
                  <h2 className="title">More heat stress days projected in the summer</h2>
                </header>
              </div>
              <div className="columns medium-6 wrapper map-card">
                <div id="map4-2" className="map slide-map-4-2"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="sonoma-slide">
          <div className="container content-section">
            <div className="row">
              <div className="overlapping-cards">
                <div className="card">
                  <h1>Heat Stress Effects</h1>
                  <p>Heat Stress Effects are Manifold to people, animals (pets, wildlife and livestock) and plants (landscape and agriculture).</p>
                  <p>
                    Cautions with heat stress:<br/>
                    <b>People.</b> Illness, dehydration, careful work conditions
                    <b>Animals.</b> Additional water for hydration and shelter
                    <b>Plants.</b> Landscape and agriculture will require more irrigation and at times growing specific types of plants/crops who can handle high heat.
                  </p>
                </div>
                <div className="card slide-4-3"></div>
              </div>
            </div>
          </div>
        </section>

      </section>
    );
  }
}

export default SonomaSlideOne;
