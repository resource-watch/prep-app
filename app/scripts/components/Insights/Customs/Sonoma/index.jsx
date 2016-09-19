import React from 'react';
import RevealPresentation from './../../../RevealPresentation';
import SonomaSlideZero from './slides/SonomaSlideZero';

class Sonoma extends React.Component {

  render() {
    return (
      <RevealPresentation>
        <div className="slides">
          <SonomaSlideZero/>
          <section>2</section>
        </div>
      </RevealPresentation>
    );
  }
}

export default Sonoma;
