import React from 'react';
import PropTypes from 'prop-types';
import ToolbarActions from '../ToolbarActions';

function SectionIntro(props) {
  return (
    <div className="c-section-intro">
      <div className="top-bar">
        {props.data.partner &&
          <div className="row">
            <div className="column small-6">
              <div className="logo">
                <img
                  src={config.assetsUrl + props.data.partner.white_logo}
                  alt={props.data.partner.name}
                />
              </div>
            </div>
            <div className="column small-6">
              <div className="author">
                {props.data.partner.contact_name}
                <span>{props.data.partner.contact_email}</span>
              </div>
            </div>
          </div>
        }
      </div>
      <div className="sliced" />
      <article className="c-article">
        <div className="row align-center">
          <div className="columns small-12 medium-8">
            <ToolbarActions
              downloadUrl={props.downloadUrl}
              insightUrl={props.insightUrl}
              currentSection={props.currentSection}
              analytics={props.analytics}
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
  data: PropTypes.object.isRequired,
  /**
   * Define the insight url to the embed
   */
  insightUrl: PropTypes.string,
  /**
   * Define the download url to the dataset
   */
  downloadUrl: PropTypes.string,
  /**
   * Define the current section
   */
  currentSection: PropTypes.string,
  /**
   * Define the component childrens
   */
  children: PropTypes.any,
  /**
   * Define the category and action for the analytics
   * event of the share modal
   */
  analytics: PropTypes.shape({
    category: PropTypes.string,
    action: PropTypes.string
  })
};

export default SectionIntro;
