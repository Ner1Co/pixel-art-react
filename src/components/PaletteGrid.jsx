import React from 'react';
import { connect } from 'react-redux';

import PaletteColor from './presentational/PaletteColor';
import { setCurrentColor } from '../store/actions/actionCreators';
import { paletteGridSelector } from '../store/selectors/selectors';

const PaletteGrid = (props) => {
  const getColors = () => {
    const { paletteGridData, currentColor } = props;
    const width = 100 / 6;

    return paletteGridData.map((color, i) =>
      <PaletteColor
        key={color.color + i}
        positionInPalette={i}
        width={width}
        color={color.color}
        selected={currentColor === color.color}
        onClick={props.onColorCellClick}
      />
    );
  };

  return (
    <div className="palette-grid">
      {getColors()}
    </div>
  );
};

const mapStateToProps = state => ({
  paletteGridData: paletteGridSelector(state).colors,
  currentColor: paletteGridSelector(state).currentColor
});

const mapDispatchToProps = dispatch => ({
  onColorCellClick: (color, positionInPalette) => {
    dispatch(setCurrentColor(color, positionInPalette));
  }
});

const PaletteGridContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaletteGrid);
export default PaletteGridContainer;
