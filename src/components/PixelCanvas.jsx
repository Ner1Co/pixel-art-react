import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { cellClicked } from '../store/actions/actionCreators';
import { framesSelector, toolsSelector, paletteGridSelector } from '../store/selectors/selectors';
import tools from '../store/tools';
import GridWrapper from './presentational/GridWrapper';

class PixelCanvas extends React.Component {
  render() {
    let gridExtraClass = 'cell';
    if (this.props.activeTool === tools.eraser) {
      gridExtraClass = 'context-menu';
    } else if (this.props.activeTool === tools.eyedropper) {
      gridExtraClass = 'copy';
    }

    return (
      <GridWrapper
        cells={this.props.cells}
        onCellEvent={(id) =>
          this.props.cellClicked(id, this.props.activeFrameIndex, this.props.activeTool,
           this.props.cells[id].color, this.props.currentColor)
        }
        extraClass={gridExtraClass}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const cells = framesSelector(state).activeFrame.grid.map((currentCell, i) => {
    const color = currentCell.color;
    return {
      id: i,
      width: 100 / framesSelector(state).activeFrame.columns,
      color,
    };
  });

  return {
    activeFrame: framesSelector(state).activeFrame,
    activeFrameIndex: framesSelector(state).activeFrameIndex,
    currentColor: paletteGridSelector(state).currentColor,
    activeTool: toolsSelector(state).activeTool,
    cells: cells
  };
};

const mapDispatchToProps = dispatch => ({
  cellClicked: bindActionCreators(cellClicked, dispatch)
});

const PixelCanvasContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PixelCanvas);
export default PixelCanvasContainer;
