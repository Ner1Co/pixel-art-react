import * as actions from '../actions/actions';
import tools from '../tools';
import {
  createFrame,
  cloneFrame,
  resizeFrame,
  applyBucket,
  resetIntervals,
  setFrameCellColor,
  clearFrameCell
} from '../../utils/frame';
import exampleState from '../../utils/exampleState';
import newProject from '../../utils/newProject';

/**
 * Reducer for application loading state.
 */
function loading(state, action) {
  switch (action.type) {
    case actions.SHOW_SPINNER:
      return true;
    case actions.HIDE_SPINNER:
      return false;
    default:
      return state;
  }
}

/**
 * Reducer for pixel size.
 */
function cellSize(state, action) {
  switch (action.type) {
    case actions.SET_CELL_SIZE:
      return action.cellSize;
    default:
      return state;
  }
}

/**
 * Reducer for animation duration.
 */
function animationDuration(state, action) {
  switch (action.type) {
    case actions.SET_DURATION:
      return action.duration;
    default:
      return state;
  }
}

/**
 * Root reducer.
 */
export default function (state = exampleState, action) {
  return {
    ...state,
    loading: loading(state.loading, action),
    cellSize: cellSize(state.cellSize, action),
    animationDuration: animationDuration(state.animationDuration, action)
  };
}

