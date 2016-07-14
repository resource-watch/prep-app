import React from 'react';
import ToolbarActions from '../../containers/commons/ToolbarActions';

function SectionIntro(props) {
  return (
    <div className={"c-section-intro"}>
      <div className="container">
        <div className="top-bar">
          <div className="logo">
            <img src={props.data.partner.logo} alt={props.data.partner.name} />
          </div>
          <div className="author">
            {props.data.partner.contact_name}
            <span>{props.data.partner.contact_email}</span>
          </div>
        </div>
        <div className="content">
          <div className="wrapper-mini">
            <ToolbarActions
              currentSection={props.currentPage.split('/')[0]}
            />
            <p> {props.data.description} </p>
          </div>
        </div>
      </div>
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
   * Define the route path (from the router)
   */
  currentPage: React.PropTypes.string
};

export default SectionIntro;
