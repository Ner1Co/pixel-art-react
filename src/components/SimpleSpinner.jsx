import React from 'react';
import { connect } from 'react-redux';

import { loadingStateSelector } from '../store/selectors/selectors';

const SimpleSpinner = props =>
  <div className={`simple-spinner${props.loading ? ' display' : ''}`}>
    <div className="circle" />
  </div>
;

const mapStateToProps = state => ({
  loading: loadingStateSelector(state).loading
});

const SimpleSpinnerContainer = connect(
  mapStateToProps
)(SimpleSpinner);
export default SimpleSpinnerContainer;
