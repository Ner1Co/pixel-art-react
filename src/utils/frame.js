/**
 * Returns a new frame.
 * @param {Number} rows - number of the frame rows.
 * @param {*} columns - number of the frame columns.
 * @param {*} backgroundColor - frame background color.
 * @param {*} intervalPercentage - frame interval.
 * @param {*} key - frame unique key.
 */
export function createFrame(rows, columns, backgroundColor, intervalPercentage, key) {
  const newGrid = [];
  for (let i = 0; i < rows * columns; ++i) {
    newGrid.push({ color: backgroundColor, used: false });
  }
  return {
    grid: newGrid,
    interval: intervalPercentage,
    rows,
    columns,
    backgroundColor,
    key
  };
}

/**
 * Retrun a new cloned frame.
 * @param {*} frame - the frame to clone.
 * @param {*} key - the key of the new cloned frame.
 */
export function cloneFrame(frame, key) {
  return {
    ...frame,
    grid: frame.grid.map(cell => ({ color: cell.color, used: cell.used })),
    key
  };
}

/**
 * Retrun a new cloned frame with one cell color change.
 * @param {*} frame - the frame to clone.
 * @param {*} index - cell index.
 * @param {*} color - new cell color.
 */
export function setFrameCellColor(frame, index, color) {
  return {
    ...frame,
    grid: frame.grid.map((cell, cellIndex) => {
      if (cellIndex === index) {
        return { color: color, used: true };
      }
      return cell;
    })
  };
}

/**
 * Retrun a new cloned frame with one cleared cell.
 * @param {*} frame - the frame to clone.
 * @param {*} index - cell index.
 */
export function clearFrameCell(frame, index) {
  return {
    ...frame,
    grid: frame.grid.map((cell, cellIndex) => {
      if (cellIndex === index) {
        return { color: frame.backgroundColor, used: false };
      }
      return cell;
    })
  };
}

/**
 * Retrun a new cloned frame with resized grid.
 * @param {*} frame - the frame to clone.
 * @param {*} rows - new rows number.
 * @param {*} columns - new columns number.
 */
export function resizeFrame(frame, rows, columns) {
  const totalCells = frame.rows * frame.columns;
  const newGrid = [...frame.grid];

  if (frame.columns < columns) {
    for (let i = totalCells; i > 0; i -= frame.columns) {
      for (let j = 0; j < columns - frame.columns; ++j) {
        newGrid.splice(i, 0, { color: frame.backgroundColor, used: false });
      }
    }
  } else if (frame.columns > columns) {
    for (let i = totalCells; i > 0; i -= frame.columns) {
      newGrid.splice(i - 1, 1);
    }
  }

  if (frame.rows < rows) {
    for (let i = 0; i < columns; ++i) {
      newGrid.push({ color: frame.backgroundColor, used: false });
    }
  } else if (frame.rows > rows) {
    for (let i = 0; i < frame.columns; ++i) {
      newGrid.splice(-1, 1);
    }
  }

  return {
    ...frame,
    grid: newGrid,
    rows,
    columns
  };
}

/**
 * Return new frames array with recalculated intervals.
 * @param {*} frames
 */
export function resetIntervals(frames) {
  const equalPercentage = 100 / frames.length;

  return frames.map((frame, index) => {
    const percentage = index === frames.length - 1
      ? 100
      : Math.round(((index + 1) * equalPercentage) * 10) / 10;
    return {
      ...frame,
      interval: percentage
    };
  });
}

function getSameColorAdjacentCells(frame, id, color) {
  const adjacentCollection = [];
  let auxId;

  if ((id + 1) % frame.columns !== 0) {
    // Not at the very right
    auxId = id + 1;
    if (frame.grid[auxId].color === color) {
      adjacentCollection.push(auxId);
    }
  }

  if (id % frame.columns !== 0) {
    // Not at the very left
    auxId = id - 1;
    if (frame.grid[auxId].color === color) {
      adjacentCollection.push(auxId);
    }
  }

  if (id >= frame.columns) {
    // Not at the very top
    auxId = id - frame.columns;
    if (frame.grid[auxId].color === color) {
      adjacentCollection.push(auxId);
    }
  }

  if (id < (frame.columns * frame.rows) - frame.columns) {
    // Not at the very bottom
    auxId = id + frame.columns;
    if (frame.grid[auxId].color === color) {
      adjacentCollection.push(auxId);
    }
  }

  return adjacentCollection;
}

/**
 * Returns a new frame with a color filled cell and all its adjacents.
 * @param {*} frame -  the frame to clone.
 * @param {*} id - cell index.
 * @param {*} bucketColor - new color.
 */
export function applyBucket(frame, id, bucketColor) {
  const queue = [id];
  const newGrid = frame.grid.map((cell) => {
    return { color: cell.color, used: cell.cell };
  });
  let adjacents;
  let auxAdjacentId;
  let auxAdjacentColor;
  let currentId;

  while (queue.length > 0) {
    currentId = queue.shift();
    newGrid[currentId] = { color: bucketColor, used: true };
    adjacents = getSameColorAdjacentCells(frame, currentId, frame.grid[currentId].color);

    for (let i = 0; i < adjacents.length; ++i) {
      auxAdjacentId = adjacents[i];
      auxAdjacentColor = newGrid[auxAdjacentId].color;
      // Avoid introduce repeated or painted already cell into the queue
      if (
        (queue.indexOf(auxAdjacentId) === -1) &&
        (auxAdjacentColor !== bucketColor)
      ) {
        queue.push(auxAdjacentId);
      }
    }
  }

  return {
    ...frame,
    grid: newGrid
  };
}
