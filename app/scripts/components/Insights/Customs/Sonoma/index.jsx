import React from 'react';
import RevealPresentation from './../../../RevealPresentation';
import SonomaSlide0 from './slides/SonomaSlide0';
import SonomaSlide1 from './slides/SonomaSlide1';
import SonomaSlide2 from './slides/SonomaSlide2';
import SonomaSlide3 from './slides/SonomaSlide3';
import SonomaSlide4 from './slides/SonomaSlide4';
import SonomaSlide5 from './slides/SonomaSlide5';
import SonomaSlide6 from './slides/SonomaSlide6';
import SonomaSlide7 from './slides/SonomaSlide7';


class SonomaInsight extends React.Component {

  render() {
    let slideTitles = [
      [
        'Projected Overall increased weather variability',
        'What is Special about Sonoma County?',
        'How the Region is Preparing for Climate Change',
        'Sonoma County’s Regional Climate Protection Authority (RCPA) Fosters Collaboration',
        'Sonoma County Water Agency:  Mitigation Leader',
        'A Vibrant Collective of NGOs Catalyzes Community Action'
      ],
      ['Overall temperatures projected to rise in both summer and winter seasons', 'What does this mean for you?'],
      ['Increase in warmer winter nights projected', 'Night temperature changes consequences'],
      ['Summertime heat waves', 'Heat stress effects'],
      ['Rainfall is projected to become more variable', 'Rainfall fluctuation consequences'],
      ['Increase in intense storm events', 'Storm Events Consequences'],
      ['Drought occurrence is projected to increase because of rising temperatures', 'Climate water deficit']
    ];
    return (
      <RevealPresentation slideTitles={slideTitles}>
        <div className="slides">
          <SonomaSlide0 />
          <SonomaSlide1 />
          <SonomaSlide2 />
          <SonomaSlide3 />
          <SonomaSlide4 />
          <SonomaSlide5 />
          <SonomaSlide6 />
          <SonomaSlide7 />
        </div>
      </RevealPresentation>
    );
  }
}


export default SonomaInsight;
