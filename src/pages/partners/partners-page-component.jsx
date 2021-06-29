import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Article from 'components/Content/Article';
import Thumbnail from 'components/Thumbnails/Thumbnail';
import LoadingSpinner from 'components/Loading/LoadingSpinner';

// constants
import { PARTNER_TYPES } from './partners-page-constants';

const partnerItem = partner => (
  <div className="columns small-12 medium-4" key={partner.id}>
    <div className="c-article-module">
      <Thumbnail
        src={process.env.REACT_APP_ASSETS_URL + partner.thumbnail}
        alt={partner.name}
        border="neutral"
      />
      <h3 className="partner-name">{partner.name}</h3>
      <Link to={`/partners/${partner.id}`} className="partner-link">Read more</Link>
    </div>
  </div>
);

class Partners extends PureComponent {
  render() {
    const { partners, partnersLoading } = this.props;
    return (
      <div className="c-partners">
        {partnersLoading && <LoadingSpinner />}
        {PARTNER_TYPES.map(partnerType => (
          !!(partners[partnerType.value] || []).length &&
            <Article grid="small-12" key={partnerType.value}>
              <div className="row align-center">
                <div className="column small-12"><h2>{partnerType.label}</h2></div>
              </div>
              <div className="row align-stretch">
                {(partners[partnerType.value] || []).map(partnerItem)}
              </div>
            </Article>
        ))}
      </div>
    );
  }
}

Partners.defaultProps = { partners: {} };

Partners.propTypes = {
  partners: PropTypes.object,
  partnersLoading: PropTypes.bool
};

export default Partners;
