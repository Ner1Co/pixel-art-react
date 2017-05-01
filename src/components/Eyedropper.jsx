import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from '../store/actions/actionCreators';
import tools from '../store/tools';
import { toolsSelector } from '../store/selectors/selectors';

const Eyedropper = (props) => {
  return (
    <button
      className={`eyedropper${props.eyedropperOn ? ' selected' : ''}`}
      onClick={props.onClick}
    />
  );
};

const mapStateToProps = state => ({
  eyedropperOn: toolsSelector(state).activeTool === tools.eyedropper
});

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(actionCreators.setActiveTool(tools.eyedropper))
});

const EyedropperContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Eyedropper);
export default EyedropperContainer;
