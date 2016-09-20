import React from 'react';
import RevealPresentation from './../../../RevealPresentation';
import SonomaSlideZero from './slides/SonomaSlideZero';
import SonomaSlideOne from './slides/SonomaSlideOne';
import SonomaSlideTwo from './slides/SonomaSlideTwo';
import SonomaSlideThree from './slides/SonomaSlideThree';
import SonomaSlideFour from './slides/SonomaSlideFour';
import SonomaSlideFive from './slides/SonomaSlideFive';
import SonomaSlideSix from './slides/SonomaSlideSix';
import SonomaSlideSeven from './slides/SonomaSlideSeven';


class SonomaInsight extends React.Component {

  render() {
    return (
      <RevealPresentation>
        <div className="slides">
          <SonomaSlideZero />
          <SonomaSlideOne />
          <SonomaSlideTwo />
          <SonomaSlideThree />
          <SonomaSlideFour />
          <SonomaSlideFive />
          <SonomaSlideSix />
          <SonomaSlideSeven />
        </div>
      </RevealPresentation>
    );
  }
}


export default SonomaInsight;
