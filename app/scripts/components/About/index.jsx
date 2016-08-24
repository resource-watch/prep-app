import React from 'react';
import Article from '../Content/Article';

class About extends React.Component {

  render() {
    return (
      <div className="c-about">
        <Article>
          <p>The PREP Platform is a project started by the Partnership for Resilience and Preparedness (PREP), a public-private collaboration that emerged out of the White House Climate Data Initiative. We aim to facilitate collaboration among technology innovators, researchers, data scientists, and practitioners from the private sector, civil society and government. This cooperation will help spur new types of data discovery; develop innovative, customizable tools in response to user needs; and facilitate sharing and collective learning.</p>

          <h3>The mission</h3>
          <p>Our mission is to empower a data-driven approach to building climate resilience by providing planners and interested public around the globe with accessible, actionable data and insights.</p>

          <h3>The challenge</h3>
          <p>Our changing climate is accelerating the intensity and frequency of stresses facing communities across the globe. There is now a growing recognition that even with aggressive reductions in greenhouse gas emissions, continued changes in Earth’s climate are inevitable. Society is increasingly focused on preparing for this climate variability and change. In 2015, more than 190 nations committed to take action to build climate resilience through the Sendai Framework for Disaster Risk Reduction, the Paris Agreement and the Sustainable Development Goals.</p>
          <p>But to act on these commitments, planners, businesses, investors, and resource managers must have access to robust and actionable information, as well as guidance on how to use it to manage the risks. Two fundamental problems constrain progress in this area:</p>

          <ol>
            <li>Data and information isn’t accessible or usable because it’s held in silos across government agencies, the private sector and civil society; and</li>
            <li>Because of these silos, it’s not easy to share information or learn from others who are building climate resilience.</li>
          </ol>

          <p>The Partnership for Resilience and Preparedness (PREP) aims to tackle these related challenges.</p>

          <h3>The platform</h3>

          <p>The initial product of the Partnership for Resilience and Preparedness is a platform to help planners, investors and resource managers assess and incorporate climate risks into their decisions by enhancing access to the best available data and insights on climate variability and change. It leverages innovations in information and communication technologies to help users easily produce interactive climate risk assessments and resilience plans.</p>

          <p>We will do this by:</p>

          <ul>
            <li>Focusing on the user. We will continuously pursue input from user communities on how the platform can facilitate the use of climate risk information in management decisions.</li>
            <li>Enabling the next generation of living climate reports and resilience plans that provide interactive access to the underlying scientific data.</li>
            <li>Developing an open platform that enables access to climate-related information from across government agencies and other relevant data sets.</li>
            <li>Enabling users to customize risk dashboards – to create, curate, and share content for their users and embedding the functionality into their websites.</li>
            <li>Accelerating the migration of USG and other climate-relevant datasets into the Cloud for 3rd party applications to use.</li>
          </ul>
        </Article>
      </div>
    );
  }

}

export default About;
