import React from 'react';
import RevealPresentation from './../../../RevealPresentation';
import SonomaSlideZero from './slides/SonomaSlideZero';
import SonomaSlideOne from './slides/SonomaSlideOne';
import SonomaSlideTwo from './slides/SonomaSlideTwo';

class SonomaInsight extends React.Component {

  render() {
    return (
      <RevealPresentation>
        <div className="slides">
          <SonomaSlideZero />
          <SonomaSlideOne />
          <SonomaSlideTwo />
        </div>
      </RevealPresentation>
    );
  }
}


export default SonomaInsight;
