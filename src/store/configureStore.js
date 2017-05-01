import { createStore } from 'redux';
import undoable, { includeAction } from 'redux-undo';

import reducer from '../store/reducers/reducer';
import * as actionCreators from './actions/actionCreators';
import * as actions from './actions/actions';

const configureStore = (devMode) => {
  const store = createStore(undoable(reducer, {
    filter: includeAction([
      actions.CHANGE_ACTIVE_FRAME,
      actions.CHANGE_DIMENSIONS,
      actions.DRAW_CELL,
      actions.CLEAR_CELL,
      actions.SET_ACTIVE_TOOL,
      actions.SET_CELL_SIZE,
      actions.SET_CURRENT_COLOR,
      actions.RESET_GRID,
      actions.NEW_PROJECT
    ]),
    debug: devMode
  }), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

  return store;
};

export default configureStore;
