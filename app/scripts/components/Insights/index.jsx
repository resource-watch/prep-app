import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { logEvent } from 'helpers/analytics';
import LoadingSpinner from '../Loading/LoadingSpinner';
import Card from '../Cards/Card';

class InsightsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { createInsightModalOpen: false };
  }

  componentDidMount() {
    if (!this.props.data.length) {
      this.props.getInsightsList();
    }
  }

  getContent() {
    if (!this.props.data || this.props.data.length === 0) {
      return (
        <div>
          <LoadingSpinner />
        </div>
      );
    }

    const items = [];
    this.props.data.forEach((item, index) => {
      items.push(
        <div
          className={`columns small-10 medium-5 align-stretch ${index % 2 === 0 ? 'small-offset-1' : ''}`}
          key={`insight-item-${item.slug}`}
          style={{ display: 'flex' }}
        >
          <Card border="neutral">
            <h3>
              <Link to={`/stories/${item.slug}`}>
                {item.title}
              </Link>
            </h3>
            <p>
              {item.summary}
            </p>
            {item.partner &&
            <a
              href={item.partner.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => logEvent('Stories', 'Clicks on a partner logo', item.partner.name)}
            >
              <img
                src={config.assetsUrl + item.partner.logo}
                className="logo"
                alt={item.partner.name}
              />
            </a>
            }
            {item.attribution &&
            <span className="attribution">{item.attribution}</span>
            }
          </Card>
        </div>
      );
    });

    return (
      <div className="row align-stretch">
        {items}
      </div>
    );
  }

  render() {
    const content = this.getContent();

    return (
      <div className="">
        <div className="sliced" />
        <article className="c-article -no-border">
          <div className="row align-center">
            <div className="column small-12 medium-8">
              <h2>Data-driven stories that spotlight specific climate-related risks and solutions
              </h2>
              <p>This is a selection of initial stories developed by members of the PREP community. Partners are in the process of engaging with communities to develop additional stories and we welcome hearing from groups interested in developing their own.</p>
            </div>
          </div>
        </article>
        {content}

      </div>
    );
  }
}

InsightsPage.propTypes = {
  /**
   * Define the route path (from the router)
   */
  currentPage: PropTypes.string,
  /**
   * Define function to get the insights list
   */
  getInsightsList: PropTypes.func.isRequired,
  /**
   * Define insights list data
   */
  data: PropTypes.array
};

export default InsightsPage;
