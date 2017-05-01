import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from '../store/actions/actionCreators';
import tools from '../store/tools';
import { toolsSelector } from '../store/selectors/selectors';

const Eraser = (props) => {
  return (
    <button
      className={`eraser${props.eraserOn ? ' selected' : ''}`}
      onClick={props.onClick}
    />
  );
};

const mapStateToProps = state => ({
  eraserOn: toolsSelector(state).activeTool === tools.eraser
});

const mapDispatchToProps = dispatch => ({
  //actions : bindActionCreators(actionCreators, dispatch)
});

const EraserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Eraser);
export default EraserContainer;
