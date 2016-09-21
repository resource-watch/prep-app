import React from 'react';
import Iframe from '../../../../IFrame';

function SonomaSlide6() {
  const mapUrl = 'http://resource-watch.github.io/insights/sonoma-maps/winter-air-temperature.html';
  return (
    <section className="sonoma-slide" data-title="Warmer Winter Nights">
      <div className="container content-section">
        <div className="row align-middle">
          <div className="column medium-6">
            <header className="header">
              <h2 className="title">Warmer Winter Nights</h2>
            </header>
            <p className="content">
              This sequence of maps shows where winter night-time temperatures, on average, are expected to exceed 39°F (yellow) and 43°F (red).
            </p>
          </div>
          <div className="column medium-6 wrapper">
            <Iframe src={mapUrl} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SonomaSlide6;
