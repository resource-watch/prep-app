import React from 'react';
import ToolbarActions from '../ToolbarActions';

function SectionIntro(props) {
  return (
    <div className={"c-section-intro"}>
      <div className="top-bar">
        {props.data.partner &&
          <div className="row">
            <div className="logo">
              <img
                src={config.apiUrl + props.data.partner.white_logo_medium}
                alt={props.data.partner.name}
              />
            </div>
            <div className="author">
              {props.data.partner.contact_name}
              <span>{props.data.partner.contact_email}</span>
            </div>
          </div>
        }
      </div>
      <div className="sliced"></div>
      <article className="c-article">
        <div className="row align-center">
          <div className="columns small-12 medium-8">
            <ToolbarActions
              insightUrl={props.insightUrl}
              currentSection={props.currentSection}
            />
            {props.children}
          </div>
        </div>
      </article>
    </div>
  );
}

SectionIntro.propTypes = {
  /**
   * Data of intro detail with the below structure:
   * - description: string
   * - slug: string
   * - author: {name: string, email: string}
   * - companyLogoUrl: string
   * Required
   */
  data: React.PropTypes.object.isRequired,
  /**
   * Define the insight url to the embed
   */
  insightUrl: React.PropTypes.string,
  /**
   * Define the current section
   */
  currentSection: React.PropTypes.string,
  /**
   * Define the component childrens
   */
  children: React.PropTypes.any
};

export default SectionIntro;
