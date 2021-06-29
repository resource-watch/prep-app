import {
  SET_TOOLTIP,
  TOOLTIP_TOGGLE,
  TOOLTIP_SET_CHILDREN,
  TOOLTIP_LOADING,
  TOOLTIP_SET_CHILDREN_PROPS,
  TOOLTIP_SET_POSITION,
  TOOLTIP_FOLLOW_TOGGLE,
  TOOLTIP_DIRECTION
} from '../constants';

export function setTooltip(tooltip) {
  return {
    type: SET_TOOLTIP,
    payload: tooltip
  };
}

export function setTooltipChildren(children) {
  return dispatch => dispatch({ type: TOOLTIP_SET_CHILDREN, payload: children });
}

export function toggleTooltip(opened, opts = {}) {
  return (dispatch) => {
    if (opened) {
      if (opts.children) {
        dispatch({ type: TOOLTIP_SET_CHILDREN, payload: opts.children });

        if (opts.childrenProps) {
          dispatch({ type: TOOLTIP_SET_CHILDREN_PROPS, payload: opts.childrenProps });
        }
      }

      if (opts.direction) {
        dispatch({ type: TOOLTIP_DIRECTION, payload: opts.direction });
      }

      if (opts.follow) {
        dispatch({ type: TOOLTIP_FOLLOW_TOGGLE, payload: true });
        // NOTE: if this doesn't break anything, let's remove it
        // The current issue with it is that it is the third listener
        // for the tooltip on the charts:
        //  1. Listener from Vega
        //  2. Listener for the follow option (in Tooltip.js)
        //  3. This one

        // // User has to move the mouse to receive the position
        // document.addEventListener('mousemove', function onMouseMove({ clientX, clientY }) {
        //   dispatch({
        //     type: TOOLTIP_SET_POSITION,
        //     payload: { x: window.scrollX + clientX, y: window.scrollY + clientY }
        //   });
        //   document.removeEventListener('mousemove', onMouseMove);
        // });
      } else if (opts.position) {
        dispatch({
          type: TOOLTIP_SET_POSITION,
          payload: { x: opts.position.x, y: opts.position.y }
        });
      }
    } else {
      dispatch({ type: TOOLTIP_FOLLOW_TOGGLE, payload: false });

      // We reset the position of the tip each time the tooltip is
      // hidden, this way we avoid leaks
      dispatch({ type: TOOLTIP_DIRECTION, payload: 'bottom' });
    }

    dispatch({ type: TOOLTIP_TOGGLE, payload: opened });
  };
}

export function tooltipLoading(loading) {
  return dispatch => dispatch({ type: TOOLTIP_LOADING, payload: loading });
}

export function setTooltipPosition({ x, y }) {
  return dispatch => dispatch({ type: TOOLTIP_SET_POSITION, payload: { x, y } });
}
