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
                  <h2 className="title">Drought occurrence is projected to increase because of rising temperatures</h2>
                </header>
              </div>
              <div className="col-md-6 wrapper">
                <p className="content">The extreme drought which California has been in for 5+ years cannot be remedied quickly, and it is important to know that not all high rainfall events can efficiently decrease the drought conditions in the soils in the landscape.</p>
                <p className="content">When we get a lot of rain, it’s often during warm weather, the plants soak up the rainwater and less goes into the soil.  The soil and ground need hydration in order to build back up our ground-water supply.  What accumulates is called Climate Water Deficit.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="sonoma-slide slide-map-7-2 -no-center">
          <div className="container">
            <h1 className="float-title">Climate Water Deficit <span className="info-button">i</span></h1>
          </div>
          <div id="map7-2" className="map -big slide-map-7-2"></div>
        </section>

      </section>
    );
  }
}

export default SonomaSlideOne;
