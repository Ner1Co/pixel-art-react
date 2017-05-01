import { ActionCreators } from 'redux-undo';
import shortid from 'shortid';

import tools from '../tools';
import * as actions from './actions';

export function setCellSize(cellSize) {
  return {
    type: actions.SET_CELL_SIZE,
    cellSize
  };
}

export function setDuration(duration) {
  return {
    type: actions.SET_DURATION,
    duration
  };
}

export function newProject() {
  return {
    type: actions.NEW_PROJECT
  };
}

export function showSpinner() {
  return {
    type: actions.SHOW_SPINNER
  };
}

export function hideSpinner() {
  return {
    type: actions.HIDE_SPINNER
  };
}

export function undo() {
  return (ActionCreators.undo());
}

export function redo() {
  return (ActionCreators.redo());
}


export function drawCell(cellIndex, frameIndex, color) {
  return {
    type: actions.DRAW_CELL,
    cellIndex,
    frameIndex,
    color
  };
}

export function cellClicked(index, frameIndex, activeTool, cellColor, currentColor) {
  return drawCell(index, frameIndex, currentColor);
}

export function setActiveTool(toolName) {
  // Your code here.
}
