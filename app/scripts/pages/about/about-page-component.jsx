import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import { findDOMNode } from 'react-dom';
import Article from 'components/Content/Article';

// constants
import { PARTNERS_APPLICATION_FORM_URL } from './about-page-constants';

class AboutPage extends PureComponent {
  static scrollTo(anchor) {
    const element = findDOMNode(anchor);
    element.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    return (
      <div className="l-about-page">
        <div className="sliced" />
        <Article grid="small-12">
          <div className="row align-center">
            <div className="column small-12 medium-8">
              <p>The Partnership for Resilience and Preparedness (PREP) was formed in 2016 around a simple principle—we believe that climate
                and socioeconomic data should be accessible and usable for everyone. We are a partnership of leading research institutions,
                government agencies, adaptation practitioners, and technology companies, working to empower communities and businesses around the
                world to build resilience to climate change by improving access to data, creating best-in-class tools, and helping people navigate
                the complicated resilience planning landscape.</p>
            </div>
            <div className="column small-12">
              <div className="cards">
                <aside className="row">
                  <div className="column small-12 medium-4">
                    <div className="c-card -border -border-neutral">
                      <h3>The Challenge</h3>
                      <p>Demand for climate information is on the rise, but data are often hard to find, access, and use.</p>
                      <a style={{ cursor: 'pointer' }} onClick={() => AboutPage.scrollTo(this.challenge)}>Learn more</a>
                    </div>
                  </div>
                  <div className="column small-12 medium-4">
                    <div className="c-card -border -border-neutral">
                      <h3>Our Approach</h3>
                      <p>We promote communication between data users and producers and make high priority data available through a map-based platform</p>
                      <a style={{ cursor: 'pointer' }} onClick={() => AboutPage.scrollTo(this.approach)}>Learn more</a>
                    </div>
                  </div>
                  <div className="column small-12 medium-4">
                    <div className="c-card -border -border-neutral">
                      <h3>Join Us</h3>
                      <p>PREP is a partnership of public, private, and civil society organizations. Contact us if you would like to join the effort.</p>
                      <a style={{ cursor: 'pointer' }} onClick={() => AboutPage.scrollTo(this.join)}>Learn more</a>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </Article>

        <Article ref={(ref) => { this.challenge = ref; }}>
          <h2>The Climate Preparedness Challenge</h2>
          <p>A crucial challenge in building resilience to climate change is the lack of access to useful, timely and credible data and information.
            Adaptation and resilience practitioners face a confusing and fragmented landscape of platforms and tools, and lack guidance on how to
            understand and manage climate risk using the data available. This problem is exacerbated by a lack of feedback mechanisms to help
            data providers understand user needs. PREP addresses these challenges by opening the lines of communication between data providers
            and users–and by providing easy access to a curated set of data and tools, which is driven by user input.</p>
        </Article>

        <Article ref={(ref) => { this.approach = ref; }}>
          <h2>Our Approach</h2>
          <p>Our Approach PREP is tackling the climate preparedness challenge by applying the knowledge and networks of a unique
            cross-sectoral partnership, and by building an online platform designed to meet the evolving needs of the climate adaptation
            planning community.</p>
          <h3>The Partnership</h3>
          <p>The PREP Partnership brings together stakeholders from the public, private and nonprofit sectors, including government agencies,
                leading technology companies and networks of climate preparedness practitioners. The Partnership supports the adaptation planning community by:</p>
          <ul>
            <li>Promoting dialog between climate data providers and users;</li>
            <li>Soliciting input on user needs and data priorities to streamline and curate data for resilience planning;</li>
            <li>Working to improve interoperability across different data products and platforms; and</li>
            <li>Developing products, creating guidance and supporting PREPdata applications to build capacity for adaptation planning.</li>
          </ul>

          <p>The Partnership is currently being coordinated by the World Resources Institute and Future Earth.</p>
          <p><Link to="partners">See the full list of current PREP Partners HERE</Link></p>

          <h3>PREPdata</h3>
          <p>PREPdata is a map-based, open data online platform that allows users to access and visualize spatial data reflecting past and future climate,
            as well as the physical and socioeconomic landscape for climate adaptation and resilience planning. The platform is continuing to evolve
            through the input of PREP partners and PREPdata users. It is a flexible tool for climate adaptation planning, designed to address many
            of the gaps and challenges adaptation practitioners face.</p>
          <p>Distinguishing elements of PREPdata:</p>

          <ul>
            <li>A visual, map-based platform that is user-friendly and customized to different contexts and skill levels;</li>
            <li>Active curation of datasets focused on climate resilience, streamlining the process of accessing and navigating to relevant data;</li>
            <li>A commitment to global coverage, with an emphasis on increasing access to datasets for the Global South, and support for applications across different scales and geographies;</li>
            <li>A user-needs based strategy for platform development, utilizing the knowledge and network of the partners and platform users to enable continuous improvement. </li>
          </ul>

          <p><Link to="explore">Explore PREP&apos;s data</Link></p>

          <h3>PREP Applications</h3>
          <p>PREP has begun working with partners at city, state, and national scales across the globe to put the platform to use in support of efforts
            to prepare for climate change. Sonoma County has applied PREPdata to support climate resilience planning, with a focus on changes that
            could affect the wine-growing and tourism-dependent region. In India, PREPdata is being used to support climate adaptation plans in
            two Indian states -- Uttarakhand and Madhya Pradesh – through the development of state-level dashboards to track key indicators of
            climate hazard, vulnerability and adaptation.  In Africa, PREP partners are exploring the use of PREPdata as a platform for regional-scale
            analysis of vulnerability to climate change.</p>

          <p>Stay tuned for outputs from ongoing PREP-supported applications as they unfold.</p>
        </Article>

        <Article ref={(ref) => { this.join = ref; }}>
          <h2>Join the Partnership</h2>
          <p>To become a partner, please express your interest by filling out this <a href={PARTNERS_APPLICATION_FORM_URL} target="_blank" rel="noopener noreferrer">form</a>,
            describing how your organization or company could contribute to the PREP mission, and how you meet the partner criteria. During the application
            process, partners self-select into one of three categories: Core Partner (high level of engagement), Contributing Partner (moderate level of engagement),
            or Resource Partner (low level of engagement). These categories and the roles corresponding to each will be explained in greater detail during an informational session.</p>

          <p>Partner criteria are:</p>

          <ul>
            <li>A commitment to support the PREP mission through in-kind or direct contributions, for example: sharing resources, tools, or expertise; contributing
              to PREPdata or facilitation of the partnership; or raising awareness of the partnership through your networks.</li>
            <li>A designated point of contact who will be actively involved in PREP as needed.</li>
            <li>CORE and Contributing partners join at least one of two working groups (WG) – Engagement WG (members collaborate with user communities to
              understand the information needs of those seeking to build preparedness and resilience, and help them advance solutions) and
              Technical WG (members work to reduce the barriers to accessing, contributing and using data for climate resilience, both through PREPdata
              and through promoting interoperability).</li>
          </ul>

          <p><a href={PARTNERS_APPLICATION_FORM_URL} target="_blank" rel="noopener noreferrer">PREP&apos;s partner application form</a></p>
        </Article>
      </div>
    );
  }
}

export default AboutPage;
