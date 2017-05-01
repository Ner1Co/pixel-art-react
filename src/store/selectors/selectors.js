export const framesSelector = state => ({
  frames: state.present.frames,
  activeFrameIndex: state.present.activeFrameIndex,
  activeFrame: state.present.frames[state.present.activeFrameIndex]
});

export const paletteGridSelector = state => ({
  colors: state.present.paletteGridColors,
  selectedCell: state.present.ppaletteSelectedCell,
  currentColor: state.present.currentColor
});

export const settingsSelector = state => ({
  animationDuration: state.present.animationDuration,
  cellSize: state.present.cellSize,
  backgroundColor: state.present.backgroundColor,
});

export const toolsSelector = state => ({
  activeTool: state.present.activeTool
});

export const loadingStateSelector = state => ({
  loading: state.present.loading
});
