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

// Default background color.
const GRID_BACKGROUND_COLOR = '#313131';

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
 * Reducer for handling all the frames state.
 */
function frames(state, action, activeFrameIndex) {
  switch (action.type) {
    case actions.DRAW_CELL:
      return state.map((frame, index) => {
        return (index === action.frameIndex)
          ? setFrameCellColor(frame, action.cellIndex, action.color)
          : frame;
      });
    case actions.RESET_GRID:
      return state.map((frame, index) => {
        return (index === activeFrameIndex)
          ? createFrame(frame.rows, frame.columns, GRID_BACKGROUND_COLOR, frame.interval, frame.key)
          : frame;
      });
    case actions.CREATE_NEW_FRAME:
      return resetIntervals([
        ...state,
        createFrame(state[activeFrameIndex].rows, state[activeFrameIndex].columns,
          GRID_BACKGROUND_COLOR, 100, action.key)
      ]);
    case actions.DUPLICATE_FRAME:
      return resetIntervals(
        state.slice(0, action.frameId + 1)
        .concat(cloneFrame(state[action.frameId], action.key))
        .concat(state.slice(action.frameId + 1))
      );
    case actions.DELETE_FRAME:
      return state.length > 1
        ? resetIntervals(state.slice(0, action.frameId).concat(state.slice(action.frameId + 1)))
        : [createFrame(state[activeFrameIndex].rows, state[activeFrameIndex].columns,
            GRID_BACKGROUND_COLOR, 100)];
    case actions.CHANGE_FRAME_INTERVAL:
      return state.map((frame, index) => {
        return index === action.frameIndex
          ? { ...frame, interval: action.interval }
          : frame;
      });
    case actions.CHANGE_DIMENSIONS:
      return state.map(frame => resizeFrame(frame, action.rows, action.columns));
    default:
      return state;
  }
}

/**
 * Reducer for the current frame index.
 */
function activeFrameIndex(state, action) {
  switch (action.type) {
    case actions.DUPLICATE_FRAME:
      return action.frameId + 1;
    case actions.CREATE_NEW_FRAME:
      return state + 1;
    case actions.CHANGE_ACTIVE_FRAME:
      return action.frameIndex;
    case actions.DELETE_FRAME:
      if (action.frameId > 0) {
        return action.frameId - 1;
      }
      return state;
    default:
      return state;
  }
}

/**
 * Root reducer.
 */
export default function (state = newProject(), action) {
  switch (action.type) {
    case actions.NEW_PROJECT:
      return newProject(state);
    default:
      return {
        ...state,
        loading: loading(state.loading, action),
        cellSize: cellSize(state.cellSize, action),
        animationDuration: animationDuration(state.animationDuration, action),
        frames: frames(state.frames, action, state.activeFrameIndex),
        activeFrameIndex: activeFrameIndex(state.activeFrameIndex, action),
      };
  }
}

