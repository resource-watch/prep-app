import React from 'react';
import RevealPresentation from './../../../RevealPresentation';
import SonomaSlideZero from './slides/SonomaSlideZero';
import SonomaSlideOne from './slides/SonomaSlideOne';


class SonomaInsight extends React.Component {

  render() {
    return (
      <RevealPresentation>
        <div className="slides">
          <SonomaSlideZero />
          <SonomaSlideOne />
        </div>
      </RevealPresentation>
    );
  }
}


export default SonomaInsight;
