import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from '../store/actions/actionCreators';

const NewProject = (props) => {
  return (
    <div className="new-project">
      <button
        onClick={props.onClick}
      >
        NEW
      </button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => dispatch(actionCreators.newProject())
    // Equivalent to:
    // onClick: bindActionCreators(actionCreators.newProject, dispatch)
  };
};

const NewProjectContainer = connect(
  null,
  mapDispatchToProps
)(NewProject);
export default NewProjectContainer;
