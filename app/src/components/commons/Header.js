import React from 'react';

function Header(props) {
  const classes = ['c-header'];
  let bgImage;

  if (props.type) classes.push(`-${props.type}`);
  if (props.image) {
    bgImage = {
      backgroundImage: `url(${props.image})`
    };
  } else if (props.pageType) {
    classes.push(`-type-${props.pageType}`);
  }

  return (
    <div className={classes.join(' ')} style={bgImage}>
      <div className="wrapper">
        <div className="content">
          {props.children}
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  /**
   * Define the type of Header
   * Accepted values:
   * 	- "small": short header
   * 	- "normal": common header size
   * 	- "large": large header
   * Default: "normal"
   */
  type: React.PropTypes.string,
  /**
   * Define the type of Header
   * Accepted values:
   * 	- 1: dashboard background
   * 	- 2: insight background
   * 	- 3: data background
   * 	- 4: home background
   * Default: none (blue background)
   */
  pageType: React.PropTypes.number,
  /**
   * Define a custom image background
   */
  image: React.PropTypes.string,
  /**
   * Define the content of the header
   * Required
   */
  children: React.PropTypes.any
};

export default Header;
