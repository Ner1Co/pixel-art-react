import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from '../store/actions/actionCreators';
import { framesSelector } from '../store/selectors/selectors';

const Reset = (props) => {
  function handleClick() {
    props.resetGrid(props.activeFrameIndex);
  }

  return (
    <button
      className="reset"
      onClick={() => { handleClick(); }}
    >
      RESET
    </button>
  );
};

const mapStateToProps = state => ({
  activeFrameIndex: framesSelector(state).activeFrameIndex
});

const mapDispatchToProps = dispatch => ({
  resetGrid: activeFrameIndex => dispatch(actionCreators.resetGrid(activeFrameIndex))
});

const ResetContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Reset);
export default ResetContainer;
