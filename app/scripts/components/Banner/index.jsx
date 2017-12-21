import React from 'react';

const homepageBg = '/images/bg/bg-home.jpg';
const partnershipBg = '/images/bg/bg-partnership.jpg';
const dashboardsBg = '/images/bg/bg-dashboards.jpg';
const dashboardBg = '/images/bg/bg-dashboard.png';
const insightsBg = '/images/bg/bg-insights.jpg';
const partnershipEngagementBg = '/images/bg/bg-partnership-engagement.jpg';
const partnershipPlatformsBg = '/images/bg/bg-partnership-platforms.jpg';
const partnerDetailBg = '/images/bg/bg-partner-detail.png';
const contactBg = '/images/bg/bg-contact.jpg';
const resourcesBg = '/images/bg/bg-resources.jpg';
const createBg = '/images/bg/bg-create.jpg';
const partnersBg = '/images/bg/bg-partners.jpg';
const faqBg = '/images/bg/bg-faq.jpg';

const bg = {
  defaults: homepageBg,
  home: homepageBg,
  partnership: partnershipBg,
  dashboards: dashboardsBg,
  dashboard: dashboardBg,
  partnershipEngagement: partnershipEngagementBg,
  partnershipData: homepageBg,
  partnershipPlatforms: partnershipPlatformsBg,
  insights: insightsBg,
  insight: insightsBg,
  datasets: homepageBg,
  contact: contactBg,
  resources: resourcesBg,
  create: createBg,
  partners: partnersBg,
  faq: faqBg,
  partnerDetail: partnerDetailBg
};

class Banner extends React.Component {

  getClassName() {
    let sizeClassName = `c-banner -inverse -${this.props.size || 'medium'}`;
    if (this.props.landing) {
      sizeClassName = `${sizeClassName} -landing`;
    }
    return sizeClassName;
  }

  render() {
    const styles = {
      backgroundImage: `url(${this.props.imageUrl || bg[this.props.bg || 'defaults']})`
    };

    return (
      <div
        className={this.getClassName()}
        style={styles}
      >
        <div className="row align-middle">
          <div className="column small-12">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }

}

export default Banner;
