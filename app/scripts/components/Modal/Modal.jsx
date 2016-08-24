import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Modal extends React.Component {

  componentDidMount() {
    this.onKeyPress = e => {
      if (e.keyCode === 27) {
        this.props.close();
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', this.onKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyPress);
  }

  onClickOverlay(e) {
    if (e.target === e.currentTarget) this.props.close();
  }

  render() {
    let modal;
    const className = this.props.className || '';

    if (this.props.opened) {
      modal = (
        <div className="overlay" onClick={(e) => this.onClickOverlay(e)}>
          <div className={`c-modal ${className}`}>
            {this.props.navbar && this.props.navbar()}
            <svg className="close-button" title="Close this modal" onClick={() => this.props.close()}>
              <path d="M11.872.559L7.347 5.084 2.788.525.525 2.788l4.56 4.559-4.526 4.525 2.196 2.197L7.28 9.543l4.56 4.559 2.262-2.263L9.543 7.28l4.526-4.525z" />
            </svg>
            <div className="l-main">
              <div className="row">
                <div className="columns small-12">
                  {this.props.children}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <ReactCSSTransitionGroup
        transitionName="modal"
        transitionAppear
        transitionAppearTimeout={300}
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
      >
        {modal}
      </ReactCSSTransitionGroup>
    );
  }

}

Modal.propTypes = {
  /**
   * The callback method when closing the modal
   */
  close: React.PropTypes.func.isRequired,
  /**
   * Define whether the modal is opened or not
   */
  opened: React.PropTypes.bool.isRequired,
  /**
   * Define the modal custom className
   * Required
   */
  className: React.PropTypes.string,
  /**
   * Define the content of the modal
   * Required
   */
  children: React.PropTypes.any,
  /**
   * Define modal navbar
   */
  navbar: React.PropTypes.func
};


export default Modal;
