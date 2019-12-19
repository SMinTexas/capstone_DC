import { combineReducers } from 'redux';
import jwt from './jwt-verification/reducer'

export default combineReducers({
    jwt,
})
