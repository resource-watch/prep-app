import React from 'react';
import Icon from 'components/ui/Icon';

function SocialNav() {
  return (
    <nav className="c-nav -social">
      <ul>
        <li className="social-links">
          <a href={`https://facebook.com/${config.facebookUser}`} target="_blank">
            <Icon name="icon-facebook" className="-extra-large" />
          </a>
          <a href={`https://twitter.com/${config.twitterUser}`} target="_blank">
            <Icon name="icon-twitter" className="-extra-large" />
          </a>
        </li>
        <li className="powered-by">
          <span>Powered by </span>
          <a href="http://resourcewatch.org/" target="_blank">
            <svg width="150" height="25" viewBox="0 0 407 67"><title>Resource watch</title><g fill="#fff"><path d="M106.574 32.694c.968-1.297 1.452-2.873 1.452-4.726 0-1.533-.267-2.812-.8-3.838-.534-1.025-1.254-1.84-2.16-2.446a9.11 9.11 0 0 0-3.163-1.333 17.999 17.999 0 0 0-3.815-.423h-9.815v26.387h5.795v-10.72h2.495l5.508 10.72h6.96l-6.7-11.12c1.863-.345 3.276-1.203 4.244-2.5zm-5.042-2.095c-.31.395-.702.684-1.173.87-.473.185-1 .19-1.583.227-.584.037-1.135-.05-1.656-.05h-3.05v-5.772h3.425c.52 0 1.054.045 1.6.12.546.073 1.03.22 1.452.43.42.21.77.514 1.042.91.273.395.41.927.41 1.594 0 .717-.156 1.274-.465 1.67zm15.716 5.994h11.59v-5.772h-11.59V26.7h11.59v-5.773h-17.385v26.387h18.213v-5.772h-12.418v-4.948zm30.1-3.178a12.098 12.098 0 0 0-2.92-1.26 76.789 76.789 0 0 1-2.923-.89c-.906-.297-1.656-.654-2.252-1.075-.596-.42-.893-1.024-.893-1.816 0-.494.123-.914.372-1.26a2.76 2.76 0 0 1 .967-.834c.397-.21.818-.365 1.265-.464.447-.098.88-.147 1.303-.147.72 0 1.482.14 2.29.424.805.285 1.444.723 1.916 1.316l3.982-4.337a9.97 9.97 0 0 0-3.76-2.113c-1.39-.42-2.828-.63-4.317-.63-1.29 0-2.544.18-3.76.537-1.215.36-2.288.896-3.22 1.612a8.052 8.052 0 0 0-2.232 2.67c-.558 1.062-.837 2.298-.837 3.706 0 1.458.304 2.633.912 3.522a7.137 7.137 0 0 0 2.29 2.15c.916.544 1.91.977 2.977 1.298 1.065.32 2.058.643 2.976.964.918.32 1.68.71 2.29 1.167.607.46.91 1.08.91 1.872 0 .47-.117.877-.352 1.224a2.78 2.78 0 0 1-.93.85 4.68 4.68 0 0 1-1.304.502 6.45 6.45 0 0 1-1.433.167 6.426 6.426 0 0 1-2.81-.65 5.993 5.993 0 0 1-2.25-1.833l-4.132 4.522c1.265 1.162 2.63 2.002 4.093 2.52 1.465.52 3.052.78 4.765.78 1.363 0 2.66-.174 3.89-.52 1.227-.345 2.306-.876 3.237-1.593a7.742 7.742 0 0 0 2.214-2.708c.546-1.088.82-2.36.82-3.818 0-1.533-.298-2.756-.894-3.67a6.907 6.907 0 0 0-2.252-2.188zm29.46-9.36c-1.265-1.2-2.766-2.12-4.503-2.763-1.738-.642-3.636-.963-5.695-.963-2.06 0-3.958.32-5.695.963-1.738.644-3.238 1.564-4.503 2.763-1.266 1.2-2.252 2.65-2.96 4.356-.706 1.704-1.06 3.608-1.06 5.71 0 2.1.354 4.003 1.06 5.707.708 1.705 1.694 3.157 2.96 4.356 1.265 1.2 2.765 2.12 4.503 2.762 1.737.642 3.635.964 5.695.964 2.06 0 3.957-.322 5.695-.964 1.737-.643 3.238-1.563 4.503-2.762 1.266-1.2 2.252-2.65 2.96-4.357.706-1.705 1.06-3.608 1.06-5.71 0-2.1-.354-4.004-1.06-5.708-.708-1.706-1.694-3.157-2.96-4.356zm-2.587 13.457a7.773 7.773 0 0 1-1.655 2.67 7.572 7.572 0 0 1-2.587 1.76c-1.005.42-2.128.63-3.368.63-1.24 0-2.364-.21-3.37-.63a7.587 7.587 0 0 1-2.586-1.76 7.773 7.773 0 0 1-1.655-2.67c-.386-1.025-.578-2.156-.578-3.392 0-1.21.192-2.335.577-3.373a7.722 7.722 0 0 1 1.654-2.688 7.577 7.577 0 0 1 2.587-1.762c1.006-.42 2.13-.63 3.37-.63 1.24 0 2.363.21 3.368.63a7.572 7.572 0 0 1 2.587 1.76c.72.756 1.27 1.65 1.656 2.69.386 1.037.578 2.162.578 3.373 0 1.237-.192 2.368-.577 3.393zm25.814-.612c0 .817-.056 1.57-.317 2.263-.26.692-.59 1.29-1.06 1.797A4.953 4.953 0 0 1 197 42.147a5.17 5.17 0 0 1-2.113.426c-.77 0-1.478-.142-2.136-.426a4.986 4.986 0 0 1-1.69-1.187c-.47-.506-.988-1.105-1.247-1.797-.26-.692-.54-1.446-.54-2.262V20.928h-5.796v16.197c0 1.556.38 2.99.852 4.3.47 1.31 1.245 2.447 2.175 3.41.93.965 2.127 1.72 3.516 2.262 1.39.544 3.022.816 4.858.816 1.81 0 3.42-.272 4.81-.816 1.39-.543 2.555-1.297 3.486-2.26.93-.965 1.554-2.102 2.025-3.412.47-1.31.63-2.744.63-4.3V20.927h-5.796V36.9zm28.994-3.206c.967-1.297 1.45-2.873 1.45-4.726 0-1.533-.267-2.812-.8-3.838-.534-1.025-1.253-1.84-2.16-2.446-.904-.606-1.958-1.073-3.162-1.333s-2.475-.423-3.816-.423h-10.57v26.387h5.794v-10.72h3.25l5.51 10.72h6.96l-6.7-11.12c1.862-.345 3.276-1.203 4.244-2.5zm-5.044-3.095c-.31.395-.702.684-1.172.87-.473.185-1 .19-1.582.227-.584.037-1.136-.05-1.657-.05h-3.81v-5.772h4.183c.52 0 1.054.045 1.6.12.546.073 1.03.22 1.45.43.423.21.77.514 1.044.91.272.395.41.927.41 1.594 0 .717-.156 1.274-.466 1.67zm24.695 11.23c-.92.497-1.973.743-3.164.743a6.86 6.86 0 0 1-2.922-.63 7.158 7.158 0 0 1-2.363-1.76 8.402 8.402 0 0 1-1.58-2.67c-.386-1.025-.578-2.156-.578-3.392 0-1.21.192-2.335.577-3.373.383-1.038.916-1.933 1.6-2.688a7.244 7.244 0 0 1 2.418-1.762c.93-.42 1.942-.63 3.034-.63 1.092 0 2.053.185 2.885.556.83.37 1.53.903 2.102 1.594l4.466-3.633a8.927 8.927 0 0 0-1.936-1.816c-.72-.495-1.47-.892-2.252-1.188a12.734 12.734 0 0 0-2.38-.65 14.23 14.23 0 0 0-2.328-.202c-2.06 0-3.958.32-5.694.963-1.738.644-3.238 1.564-4.504 2.763-1.266 1.2-2.252 2.65-2.96 4.356-.706 1.704-1.06 3.608-1.06 5.71 0 2.1.354 4.003 1.06 5.707.708 1.705 1.694 3.157 2.96 4.356 1.266 1.2 2.766 2.12 4.504 2.762 1.736.642 3.635.964 5.694.964 1.81 0 3.573-.37 5.285-1.112 1.712-.742 3.127-1.89 4.244-3.448l-4.84-3.596a6.292 6.292 0 0 1-2.27 2.075zm15.1-5.236h11.59v-5.772h-11.59V26.7h12.418v-5.773h-18.213v26.387h19.04v-5.772H263.78v-4.948zm47.838-15.667l-6.55 23.09h-.075l-6.662-23.09h-3.126l-6.662 23.09h-.075l-6.55-23.09h-2.53l7.666 26.387h3.015l6.662-23.088h.075l6.662 23.088h3.015l7.667-26.387h-2.532zm13.4 0l-11.503 26.387h2.57l2.976-7.42h13.96l2.865 7.42h2.754l-11.093-26.387h-2.53zm-4.99 17.316l6.142-14.383 5.956 14.383H320.03zM338.29 23.4h9.106v23.914h2.483V23.4h9.107v-2.473h-20.697V23.4zm41.553 20.044c-.62.506-1.27.927-1.953 1.26a9.373 9.373 0 0 1-2.102.742c-.72.16-1.414.24-2.085.24-1.712 0-3.256-.295-4.634-.89-1.376-.592-2.55-1.407-3.516-2.445-.968-1.037-1.713-2.26-2.235-3.67-.52-1.408-.78-2.928-.78-4.56 0-1.63.26-3.15.78-4.56.522-1.41 1.267-2.63 2.235-3.67.967-1.038 2.14-1.853 3.516-2.447 1.378-.592 2.922-.89 4.634-.89 1.34 0 2.648.286 3.927.853 1.277.57 2.326 1.472 3.145 2.707l2.01-1.67c-1.167-1.48-2.525-2.538-4.076-3.17-1.55-.628-3.22-.943-5.006-.943-2.01 0-3.852.346-5.527 1.038-1.675.692-3.108 1.65-4.3 2.872-1.19 1.224-2.12 2.676-2.79 4.357-.67 1.68-1.005 3.522-1.005 5.524 0 2.002.335 3.85 1.005 5.543.67 1.693 1.6 3.15 2.79 4.375 1.192 1.223 2.625 2.175 4.3 2.854 1.675.68 3.518 1.02 5.527 1.02 1.936 0 3.735-.37 5.398-1.112 1.66-.742 3.126-1.965 4.39-3.67l-2.01-1.52a8.026 8.026 0 0 1-1.637 1.834zm24.676-22.517V32.47h-14.9V20.928h-2.485v26.387h2.485v-12.37h14.9v12.37H407V20.927h-2.484zM21.548 12.077L0 33.54l15.212 15.152 21.55-21.464-15.214-15.15M39.87 23.846l8.707-8.672L33.653.308 24.945 8.98 39.87 23.846M45.408 55.23l21.55-21.463-15.212-15.152-21.55 21.465L45.41 55.23M27.087 43.462l-8.706 8.672L33.307 67l8.707-8.672-14.926-14.866" /></g></svg>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default SocialNav;
