import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toolsSelector } from '../store/selectors/selectors';
import * as actionCreators from '../store/actions/actionCreators';
import tools from '../store/tools';

const Bucket = (props) => {
  return (
    <button
      className={`bucket${props.bucketOn ? ' selected' : ''}`}
      onClick={props.onClick}
    />
  );
};

const mapStateToProps = state => ({
  bucketOn: toolsSelector(state).activeTool === tools.bucket
});

const mapDispatchToProps = dispatch => ({
  // Your code here.
});

const BucketContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Bucket);
export default BucketContainer;
