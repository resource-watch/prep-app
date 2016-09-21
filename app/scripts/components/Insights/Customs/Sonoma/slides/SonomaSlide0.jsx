import React from 'react';
import sccrdlogo from '../../../../../../images/insights/sonoma/sonoma-1/logos/sccrd--logo.png';
import scwlogo from '../../../../../../images/insights/sonoma/sonoma-1/logos/scw-logo.png';
import rcpalogo from '../../../../../../images/insights/sonoma/sonoma-1/logos/Logos/rcpa-logo.png'
import pepperwoodlogo from '../../../../../../images/insights/sonoma/sonoma-1/logos/pepperwood-logo.png';
import usgslogo from '../../../../../../images/insights/sonoma/sonoma-1/logos/usgs-logo.png';
import eklogo from '../../../../../../images/insights/sonoma/sonoma-1/logos/Logos/ek-logo.png';
import NBCAIwhitelogo from '../../../../../../images/insights/sonoma/sonoma-1/logos/NBCAI-logo_whitelinea.png';
import logos from '../../../../../../images/insights/sonoma/sonoma-1/logos.png';
import sonomapyramid from '../../../../../../images/insights/sonoma/sonoma-1/sonoma-pyramid.png';
import road from '../../../../../../images/insights/sonoma/sonoma-1/road.jpg';


function SonomaSlide0() {
  return (
    <section>
      <section className="sonoma-slide slide-1-intro">
        <div className="viel-banner"></div>
        <div
          className="container content-section">
          <div className="row" style={{ marginBottom: '10%' }} >
            <div className="columns medium-12 wrapper -column -align-center">
              <img src={sccrdlogo} className="c-image -medium" />
              <header className="banner -center header">
                <h1 className="title -line-center -white">
                  Sonoma County Climate Resilience Dashboard
                </h1>
                <h3>
                  Developed by The Sonoma County Climate Resilience Team
                </h3>
              </header>
            </div>
          </div>
          <div className="row">
            <div className="columns medium-12">
              <footer className="c-logos">
                <div><img src={scwlogo} className="logo" /></div>
                <div><img src={rcpalogo} className="logo" /></div>
                <div><img src={pepperwoodlogo} className="logo" />
                </div>
                <div><img src={usgslogo} className="logo" /></div>
                <div><img src={eklogo} className="logo" /></div>
                <div><img src={NBCAIwhitelogo}
                          className="logo" /></div>
              </footer>
            </div>
          </div>
          <p style={{ color: 'white' }}>Photo Credit: ©Pepperwood 2016</p>
        </div>
      </section>

      <section className="sonoma-slide">
        <div className="container content-section">
          <div className="row -align-center">
            <div className="overlapping-cards">
              <div className="card">
                <header className="header">
                  <h2 className="title -ln-white">What is Special about Sonoma County?</h2>
                </header>
                <p className="content">
                  Sonoma County features diverse agriculture, globally-significant biodiversity,
                  nine growing communities, and a thriving economy. The Russian River watershed
                  provides drinking water to 600,000 people, habitat for rare salmon species, and
                  world-className wines.
                </p>
              </div>
              <div className="card img1-1 img">
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sonoma-slide">
        <div className="container content-section">
          <div className="row">
            <div className="overlapping-cards">
              <div className="card img img1-2"></div>
              <div className="card">
                <header className="header">
                  <h2 className="title">How the Region is Preparing for Climate Change</h2>
                </header>
                <p className="content">
                  Sonoma County—
                  <ul>
                    <li>Leader in combating climate change</li>
                    <li>Recognized by the White House as a US Climate Champion</li>
                    <li>Continually raising community awareness about the impacts of climate
                      variability
                    </li>
                  </ul>
                </p>
                <p>
                  Photo Credit: ©Pepperwood 2016
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sonoma-slide">
        <div className="container content-section">
          <div className="row">
            <div className="overlapping-cards">
              <div className="card">
                <header className="header">
                  <h2 className="title -ln-white">Sonoma County’s Regional Climate Protection
                    Authority (RCPA) Fosters Collaboration</h2>
                </header>
                <p className="content">
                  The RCPA is a unique agency created to improve coordination on climate change
                  issues, and is governed by a Board of elected officials from all nine cities and
                  the County. The RCPA provides a platform to pool resources and share tools and
                  best practices. The Regional Climate Action Plan developed by the RCPA on behalf
                  of local jurisdictions guides policies for mitigation and adaptation.
                </p>
              </div>
              <div className="card img1-3 img"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="sonoma-slide">
        <div className="container content-section">
          <div className="row">
            <div className="overlapping-cards">
              <div className="card img img1-4"></div>
              <div className="card wrapper">
                <header className="header">
                  <h2 className="title">Sonoma County Water Agency: Mitigation Leader</h2>
                </header>
                <p className="content">
                  The Sonoma County Water Agency is an innovator in utilizing renewable energy
                  sources to supply water to its users, and procures 100% of its electricity needs
                  through renewable and carbon free resources, achieving a carbon neutral
                  electricity supply to power its water system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sonoma-slide">
        <div className="container content-section">
          <div className="row -align-center">
            <div className="columns medium-6 wrapper">
              <header className="header">
                <h2 className="title">A Vibrant Collective of NGOs Catalyzes Community Action</h2>
              </header>
              <p className="content">
                Under the umbrella of the <a href="http://www.northbayclimate.org"
                                             target="_blanck">North Bay Climate Adaptation
                Initiative</a> (NBCAI), local NGOs leverage their strengths to forge innovative
                partnerships between scientists, businesses, and experts in multiple sectors.
                NBCAI’s community engagement supports public agencies by seeding the ground for a
                science-based approach to cross-sector action.
              </p>
              <p className="content">Photo Credit: ©Pepperwood 2016</p>
              <img src={logos}/>
            </div>
            <div className="columns medium-5 medium-offset-1 wrapper">
              <img src={sonomapyramid} className="c-image"/>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}


export default SonomaSlide0;






