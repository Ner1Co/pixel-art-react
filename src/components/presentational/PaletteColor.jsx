import React from 'react';

const PaletteColor = (props) => {
  const { positionInPalette, width, color, selected, onClick } = props;
  const styles = {
    width: `${width}%`,
    paddingBottom: `${width}%`,
    backgroundColor: color
  };

  return (
    <button
      className={
        `palette-color
        ${selected ? 'selected' : ''}`
      }
      style={styles}
      onClick={() => props.onClick(color, positionInPalette)}
    />
  );
};

export default PaletteColor;
