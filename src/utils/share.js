import 'whatwg-fetch';
import { generatePixelDrawCss, generateAnimationIntervals } from './cssParse';

const shareDrawing = (imageData, text, action, sendNotification) => {
  const duration = imageData.duration * 1000; // Milliseconds
  const framesCount = imageData.frames.size;
  let drawingData;

  switch (imageData.type) {
    case 'single': {
      // Just need single frame data
      drawingData = generatePixelDrawCss(
        imageData.activeFrame,
        imageData.columns,
        imageData.rows,
        imageData.cellSize,
        'array'
      );
      break;
    }
    default: {
      // Multiple frame type
      drawingData = imageData.frames.reduce((acc, currentFrame) => {
        acc.push(generatePixelDrawCss(
          currentFrame,
          imageData.columns,
          imageData.rows,
          imageData.cellSize,
          'array'
        ));
        return acc;
      }, []);
      break;
    }
  }

  const css = {
    cols: imageData.columns,
    rows: imageData.rows,
    pixelSize: imageData.cellSize,
    drawingData: JSON.stringify(drawingData),
    text,
    type: imageData.type,
    animationInfo: {
      duration,
      framesCount,
      intervals: generateAnimationIntervals(imageData.frames)
    }
  };
};

export default shareDrawing;
