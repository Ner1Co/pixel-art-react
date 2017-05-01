import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Picker from './presentational/Picker';
import * as actionCreators from '../store/actions/actionCreators';
import { framesSelector } from '../store/selectors/selectors';

const Dimensions = (props) => {
  const changeDimensions = (rows, columns) => {
    props.actions.changeDimensions(rows, columns);
  };

  const { columns, rows } = props;

  return (
    <div className="dimensions">
      <Picker
        type="columns"
        value={columns}
        action={value => changeDimensions(props.rows, props.columns + value)}
      />
      <Picker
        type="rows"
        value={rows}
        action={value => changeDimensions(props.rows + value, props.columns)}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    columns: framesSelector(state).activeFrame.columns,
    rows: framesSelector(state).activeFrame.rows
  };
};

const mapDispatchToProps = dispatch => ({
  // Your code here.
});

const DimensionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dimensions);
export default DimensionsContainer;
