import { combineReducers } from 'redux';
import spaceReducer from './spaceReducer';

const rootReducer = combineReducers({
    spaceReducer,
});

export default rootReducer;