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
    case actions.CLEAR_CELL:
      return state.map((frame, index) => {
        return (index === action.frameIndex)
          ? clearFrameCell(frame, action.cellIndex)
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
    case actions.APPLY_BUCKET_ON_CELL:
      return state.map((frame, index) => {
        return index === activeFrameIndex
          ? applyBucket(frame, action.cellIndex, action.color)
          : frame;
      });
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
 * Reducer for the current active tool state.
 */
function activeTool(state, action) {
  switch (action.type) {
    case actions.SET_ACTIVE_TOOL:
      return (state === tools.bucket && action.tool === tools.bucket) ? tools.brush : action.tool;
    case actions.SET_CURRENT_COLOR:
      return state === tools.eraser || state === tools.eyedropper ? tools.brush : state;
    case actions.SET_CUSTOM_COLOR:
      if (state !== tools.brush && state !== tools.bucket) {
        return tools.brush;
      }
      return state;
    default:
      return state;
  }
}

/**
 * Reducer for the current selected color.
 */
function currentColor(state, action) {
  switch (action.type) {
    case actions.SET_CURRENT_COLOR:
      return action.color;
    case actions.SET_CUSTOM_COLOR:
      return action.customColor;
    case actions.SET_ACTIVE_TOOL:
      if (action.tool === tools.eraser) {
        return null;
      }
      return state;
    default:
      return state;
  }
}

/**
 * Reducer palette selected cell.
 */
function paletteSelectedCell(state, action) {
  switch (action.type) {
    case actions.SET_CURRENT_COLOR:
      return action.paletteColorPosition;
    default:
      return state;
  }
}

/**
 * Reducer for the palette colors.
 */
function paletteGridColors(state, action) {
  switch (action.type) {
    case actions.SET_CUSTOM_COLOR:
      return state.map((cell, index) => {
        if (action.paletteColorPosition === index) {
          return { color: action.customColor, id: action.paletteColorPosition };
        }
        return cell;
      });
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
        activeTool: activeTool(state.activeTool, action),
        currentColor: currentColor(state.currentColor, action),
        paletteSelectedCell: paletteSelectedCell(state.paletteSelectedCell, action),
        paletteGridColors: paletteGridColors(state.paletteGridColors, action)
      };
  }
}

