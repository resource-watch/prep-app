import React from 'react';
import Article from '../../components/Content/Article';
import { Link } from 'react-router';

class FAQ extends React.PureComponent {
  render() {
    return (
      <div className="c-faq">
        <Article>
          <h2>Partnership for Resilience and Preparedness</h2>
          <h3>What is PREP?</h3>
          <p>The Partnership for Resilience and Preparedness (PREP) is a public-private collaboration launched in September 2016 that seeks to improve access to useful data and empower communities and businesses to better plan for and build climate resilience. There are two key elements to PREP: the partnership itself and the online platform it supports (PREPdata). To learn more about PREP and PREPdata please visit our <Link to="/about">About</Link> page.
          </p>

          <h3>What is Climate Resilience?</h3>
          <p>Climate resilience is the ability of an ecosystem or human community to survive
            disruption and to anticipate, adapt, and flourish in the face of a changing climate.
          </p>

          <h3>Where do I go if I have general questions about climate change?</h3>
          <p>You may find general information about the impacts of climate
            change around the world at the <a
              href="http://www.ipcc.ch"
              target="_blank"
            >Intergovernmental
              Panel on Climate Change (IPCC)</a> and in the United States in the <a
                href="http://nca2014.globalchange.gov/" target="_blank"
              >U.S. National Climate
              Assessment</a>. For additional information please visit the <Link to="/resources">Resources</Link> page.
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
          <p>If you would like to <Link to="/about">join</Link> PREP, please express your interest by filling out this <a href="https://docs.google.com/forms/d/e/1FAIpQLSeXe9mfEvFr-dIpj87-lCi6NlnWRKHP-5qBj3E46ISrdiwOHg/viewform?c=0&w=1&usp=send_form" target="_blank">form</a>, describing how your organization or company could contribute to the PREP mission, and how you meet the partner criteria. During the application process, partners self-select into one of three categories: Core Partner (high level of engagement), Contributing Partner (moderate level of engagement), or Resource Partner (low level of engagement). These categories and the roles corresponding to each will be explained in greater detail during an informational session.
          </p>

          <h3>Who do I contact about media inquiries?</h3>
          <p>Please contact us at <a href="mailto:info@prepdata.org">info@prepdata.org</a> with “Media
            Inquiry” in the subject line.
          </p>

        </Article>
        <Article>
          <h2>PREPdata</h2>
          <h3>How do I find data in PREPdata?</h3>
          <p>All data on PREPdata can be found in the <Link to="/explore">Explore</Link> section. You can also find a list of climate-related data portals on the <Link
            to="/resources"
          >Resources</Link> page.
          </p>

          <h3>What if I have difficulty downloading data?</h3>
          <p>Please let us know! <Link to="/contact">Contact us</Link> at <a href="mailto:info@prepdata.org">info@prepdata.org</a> with the
            name of the dataset and a description of your issue.
          </p>

          <h3>What is the recommended citation for this resource?</h3>
          <p>Data and content on PREPdata comes from our users, partner organizations, and experts within the climate resilience community. Please
            credit the original source and add “Accessed through PREPdata on &lt;date&gt;.
            http://prepdata.org”.
          </p>

          <h3>How do I get my dataset added to PREPdata?</h3>
          <p>We welcome submissions for new datasets on PREPdata. Currently we are prioritizing global and
            national datasets that are relevant to evaluating climate-related risks or impacts. If
            you would like to submit your data for consideration, please fill out this <a href="https://docs.google.com/forms/d/1wZzQno3De7Ul6vlOkkdHhWK_9csErSrOlo6pOAZHIds/viewform?edit_requested=true" target="_blank">form</a>.
          </p>

          <h3>How do I create a dashboard or story in PREPdata?</h3>
          <p>Users can create customized dashboards through their <Link to="/myprep">MyPREP</Link> account. We also welcome hearing from groups interested in developing dashboards and stories to be published on PREPdata. <Link to="/contact">Contact us</Link> at <a href="mailto:info@prepdata.org">info@prepdata.org</a> if you're interested.
          </p>
          <p>If you are interested in data storytelling, you may wish to try Esri <a
            href="https://storymaps.arcgis.com/en/"
            target="_blank"
          >Story Maps</a>.</p>

          <h3>Which web browser should I use to explore this site?</h3>
          <p>For the best experience, we recommend using a modern web browser such as <a
            href="https://www.google.com/chrome/"
          >Chrome</a> or <a
            href="https://www.mozilla.org/en-US/firefox/"
            target="_blank"
          >Firefox</a>.</p>

          <h3>May I have permission to use the content in your site?</h3>
          <p>Most of the datasets on PREPdata carry their own licenses, which you can find
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
