import React from 'react';
import Article from '../Content/Article';
import { Link } from 'react-router';

class FAQ extends React.Component {
  render() {
    return (
      <div className="c-faq">
        <Article>
          <h2>Partnership for Resilience and Preparedness</h2>
          <h3>What is PREP?</h3>
          <p>The PREP Platform is a project started by the Partnership for Resilience and
            Preparedness (PREP), a public-private collaboration that emerged out of the White House
            Climate Data Initiative. We aim to facilitate collaboration among technology innovators,
            researchers, data scientists, and practitioners from the private sector, civil society
            and government.
          </p>

          <h3>What is Climate Resilience?</h3>
          <p>Climate resilience is the ability of an ecosystem or human community to survive
            disruption and to anticipate, adapt, and flourish in the face of a changing climate.
          </p>

          <h3>Where do I go if I have general questions about climate change?</h3>
          <p>You may find general information about the impacts of climate
            change around the world at the <a
              href="http://www.ipcc.ch/organization/organization.shtml"
              target="_blank"
            >Intergovernmental
              Panel on Climate Change (IPCC)</a> and in the United States in the <a
                href="http://nca2014.globalchange.gov/" target="_blank"
              >U.S. National Climate
              Assessment</a>. For additional information please visit the <Link to="/resources">Resources</Link> page.
          </p>

          <h3>Where can I learn more about the Climate Data Initiative?</h3>
          <p>The <a href="http://climate.data.gov" target="_blank">Climate Data Initiative (CDI)</a> is a broad
            effort to leverage the U.S. Federal Government's extensive, freely-available
            climate-relevant data resources to stimulate innovation and private-sector
            entrepreneurship in support of climate change preparedness. The CDI builds on two
            commitments: (1) to strengthen America’s resilience to climate change, and (2) to make
            government-held data more accessible to the public. Read the White House <a href="https://www.whitehouse.gov/the-press-office/2014/03/19/fact-sheet-president-s-climate-data-initiative-empowering-america-s-comm" target="_blank">
            factsheet </a>.
          </p>

          <h3>How do I deal with uncertainty in planning for the future?</h3>
          <p>Although there is substantial and increasing skill at projecting future climate
            conditions, no climate model will ever simulate the climate system perfectly. The goal
            of climate projections is to help people understand significant changes and trends in
            climate conditions over time rather than forecast the climate the way a weather forecast
            makes predictions. Understanding the range of possible futures is essential to building
            climate resilience.
          </p>

          <h3>How can I get involved?</h3>
          <p>We appreciate any feedback and suggestions. Please contact us at <a
            href="mailto:info@prepdata.org"
          >info@prepdata.org</a> or fill out this <Link
            to="/contact"
          >form</Link>.
          </p>
          <p>If you would like to <Link to="/about">join</Link> PREP, prepare a short letter of intent expressing your
            entity’s interest in PREP, your intended workgroup, and how you meet the partner
            criteria.
          </p>

          <h3>Who do I contact about media inquiries?</h3>
          <p>Please contact us at <a href="mailto:info@prepdata.org">info@prepdata.org</a> “Media
            Inquiry” in the subject line.
          </p>

          <h3>What is coming next for PREP?</h3>
          <p>The next phase of the PREP platform will enable users to create personalized dashboards of climate risks that combine top-down data with local information. To learn more about this feature or to apply to be a pilot user, see the <Link to="/create">Create</Link> page.
          </p>
        </Article>
        <Article>
          <h2>The PREP Platfrom</h2>
          <h3>How do I find data in PREP?</h3>
          <p>All data on the PREP platform can be found in the <Link to="/explore">Explore</Link> section. You can also find a list of climate-related data portals or the <Link
            to="/resources"
          >Resources</Link> page.
          </p>

          <h3>What if I have difficulty downloading data?</h3>
          <p>Please let us know! <Link to="/contact">Contact us</Link> at info@prepdata.org with the
            name of the dataset and a description of your issue.
          </p>

          <h3>What is the recommended citation for this resource?</h3>
          <p>Data and content on PREP is contributed by our users and partner organizations. Please
            credit the original source and add “Accessed through PREP on &lt;date&gt;.
            http://prepdata.org”.
          </p>

          <h3>How do I get my dataset added to PREP</h3>
          <p>We welcome submissions for new data on PREP. Currently we are prioritizing global and
            national datasets that are relevant to evaluating climate-related risks or impacts. If
            you would like to submit your data for consideration, please <Link to="/contact">contact
              us</Link> at info@prepdata.org with a description of your data, a link to where it is
            currently available, and why you think it would be valuable to share.
          </p>

          <h3>How do I create a dashboard or story in PREP?</h3>
          <p>The ability to create and customize dashboards and stories is currently under
            development. To learn more about this feature or to apply to be a pilot user, see the <Link to="/create">Create</Link> page.
          </p>
          <p>If you are interested in data storytelling, you may wish to try Esri <a
            href="https://storymaps.arcgis.com/en/"
            target="_blank"
          >Story Maps</a>.</p>

          <h3>Which web browser should I use to explore this site?</h3>
          <p>For the best experience, we recommend using a modern web browser such as <a
            href="https://www.google.com/chrome/"
          >Chrome</a> or <a
            href="https://www.mozilla.org/en-US/firefox/new/"
            target="_blank"
          >Firefox</a>.</p>

          <h3>May I have permission to use the content in your site?</h3>
          <p>Most of the datasets on the PREP Platform carry their own licenses, which you can find
            by going to the dataset description page. For permission to reproduce stories, please
            contact the author of the story.
          </p>

          <h3>I see an error or have a suggestion for the site. Where do I report it?</h3>
          <p>We are eager for feedback and suggestions. Please <Link to="/contact">contact us</Link> at info@prepdata.org.
          </p>
        </Article>
      </div>
    );
  }
}

export default FAQ;
