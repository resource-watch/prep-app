import React from 'react';
import Button from '../Button/Button';
import { Link } from 'react-router';


function ContentCard(props) {
  const classNames = ['c-content-card'];
  if (props.inner) classNames.push('-inner');
  if (props.floatAttribution) classNames.push('-float-attribution');
  if (props.noBorder) classNames.push('-no-border');
  if (props.noMargin) classNames.push('-no-margin');
  if (props.autoHeight) classNames.push('-auto-height');
  if (props.background) classNames.push('-bg');
  if (props.size) {
    if (props.size === 'large') classNames.push('-large');
    if (props.size === 'short') classNames.push('-short');
  }

  let legend;
  if (props.header.legend) {
    legend = <span className="legend">{props.header.legend}</span>;
  }

  let subtitle;
  if (props.header.subtitle) {
    subtitle = <span className="legend">{props.header.subtitle}</span>;
  }

  let downloadUrl;
  if (props.downloadUrl) {
    if (props.downloadUrl.indexOf(config.apiUrlRW) > -1) {
      downloadUrl = props.downloadUrl.replace('query', 'download');
    } else if (props.downloadUrl.indexOf('query') > -1 || props.downloadUrl.indexOf('download') > -1) {
      downloadUrl = `${config.apiUrlRW}/${props.downloadUrl.replace('query', 'download')}`;
    } else {
      downloadUrl = props.downloadUrl;
    }
  }

  return (
    <div className={classNames.join(' ')}>
      <div className="header">
        <div className="title">
          {legend}
          <h3>
            {props.link
              ? <Link state={{ prevPath: `dashboard/${props.dashboardSlug}` }} to={props.link}>{props.header.title}</Link>
              : props.header.title
            }
          </h3>
          <span>{subtitle}</span>
        </div>
        <div className="card-options">
          {props.downloadUrl &&
          <a
            href={downloadUrl} target="_blank"
            className="c-button -action -icon"
          >
            <svg className="icon" width="10" height="12" viewBox="0 0 10 12"><title>Download</title>
              <g fill="none" fillRule="evenodd">
                <path d="M4 0h2v7H4zM0 10h10v2H0z" />
                <path
                  d="M4.243 8.192l.707.707L9.9 3.95 8.484 2.537 4.95 6.07 1.414 2.536 0 3.95l4.243 4.242z"
                />
              </g>
            </svg>
          </a>
          }
          {props.share &&
          <Button action icon click={() => props.setShareModal()}>
            <svg className="icon" width="10" height="12" viewBox="0 0 10 12">
              <title>icon-share</title>
              <g fill="none" fillRule="evenodd">
                <path d="M6.45 1l1.414 1.414-4.95 4.95L1.5 5.95zM0 10h10v2H0z" />
                <path d="M9 1V0H2v2h5v5h2V1z" />
              </g>
            </svg>
          </Button>
          }
        </div>
      </div>
      <div className="content">
        {props.children}
      </div>
      {props.attribution &&
      <div className="attribution">
        <span>{props.attribution}</span>
      </div>
      }
    </div>
  );
}

ContentCard.propTypes = {
  /**
   * Define the text below the title
   * Accepted values:
   *  {
   *    title: [String],
   *    legend: [String, optional],
   *    subtitle: [String, optional]
   *  }
   */
  header: React.PropTypes.object.isRequired,
  /**
   * Define the text below the card
   */
  attribution: React.PropTypes.string,
  /**
   * Define it the card size
   * accepted: short or large
   */
  size: React.PropTypes.string,
  /**
   * Define it the card has background
   */
  background: React.PropTypes.bool,
  /**
   * Define it the card has border
   */
  noBorder: React.PropTypes.bool,
  /**
   * Define it the card has no padding
   */
  inner: React.PropTypes.bool,
  /**
   * Define it the attribution is outside the card
   */
  floatAttribution: React.PropTypes.bool,
  /**
   * Define tooltip content data
   */
  dataTooltip: React.PropTypes.any,
  /**
   * Define the content of the card
   * Required
   */
  children: React.PropTypes.object,
  /**
   * Set share modal state
   */
  setShareModal: React.PropTypes.func
};

export default ContentCard;
