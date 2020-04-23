import { combineReducers } from 'redux';

import staffList from './staffList';
import staffView from './staffView';

export default combineReducers({
    staffList,
    staffView
});
