import { createFrame } from './frame';
import tools from '../store/tools';

// Default background color.
const GRID_BACKGROUND_COLOR = '#313131';

/**
 * Returns an array of color objects.
 */
function paletteColors() {
  return [
    { color: '#000000' },
    { color: '#ff0000' },
    { color: '#e91e63' },
    { color: '#9c27b0' },
    { color: '#673ab7' },
    { color: '#3f51b5' },
    { color: '#2196f3' },
    { color: '#03a9f4' },
    { color: '#00bcd4' },
    { color: '#009688' },
    { color: '#4caf50' },
    { color: '#8bc34a' },
    { color: '#cddc39' },
    { color: '#9ee07a' },
    { color: '#ffeb3b' },
    { color: '#ffc107' },
    { color: '#ff9800' },
    { color: '#ffcdd2' },
    { color: '#ff5722' },
    { color: '#795548' },
    { color: '#9e9e9e' },
    { color: '#607d8b' },
    { color: '#303f46' },
    { color: '#ffffff' },
    { color: '#383535' },
    { color: '#383534' },
    { color: '#383533' },
    { color: '#383532' },
    { color: '#383531' },
    { color: '#383530' }
  ];
}

/**
 * Returns a new state with a single frame and default values.
 */
export default function newProject(state) {
  const columns = 20;
  const rows = 20;
  const frame = createFrame(columns, rows, GRID_BACKGROUND_COLOR, 100, 0);

  return {
    ...state,
    frames: [frame],
    activeFrameIndex: 0,
    paletteGridColors: paletteColors(),
    paletteSelectedCell: 0,
    currentColor: '#000000',
    activeTool: tools.brush,
    animationDuration: 1,
    cellSize: 10
  };
}
