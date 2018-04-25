import cartReducer from './cartReducer.js';
import {combineReducers} from 'redux';
const allReducers = combineReducers({
  cartReducer:cartReducer
});

export default allReducers;
