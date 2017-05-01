import React from 'react';
import { connect } from 'react-redux';

import { generatePixelDrawCss } from '../utils/cssParse';
import { settingsSelector, framesSelector } from '../store/selectors/selectors';

const CssDisplay = (props) => {
  const generateCss = () => {
    const { activeFrame, columns, rows, cellSize } = props;
    let cssString = generatePixelDrawCss(
      activeFrame, columns, rows, cellSize, 'string'
    );

    if (cssString) {
      cssString = `box-shadow: ${cssString}; `;
      cssString += `height: ${cellSize}px; width: ${cellSize}px;`;
    }

    return <div>{cssString}</div>;
  };

  return (
    <div className="css-display">
      {generateCss()}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    activeFrame: framesSelector(state).activeFrame,
    columns: framesSelector(state).activeFrame.columns,
    rows: framesSelector(state).activeFrame.rows,
    cellSize: settingsSelector(state).cellSize
  };
}

const CssDisplayContainer = connect(
  mapStateToProps
)(CssDisplay);
export default CssDisplayContainer;
