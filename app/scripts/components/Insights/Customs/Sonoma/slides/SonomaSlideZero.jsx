import React from 'react';
import background from './../../../../../../images/insights/sonoma/dashboard-sonoma-header.png';

class SonomaSlideZero extends React.Component {

  render() {
    return (
      <section data-background={background} className="sonoma-slide">
        <div className="container content-section -center">
          <div className="row">
            <div className="col-md-12 wrapper">
              <h2 className="banner">
                How is sonoma county’s climate changing
              </h2>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default SonomaSlideZero;






