import { combineReducers } from 'redux';

import studentsList from './studentsList';
import studentView from './studentView';

export default combineReducers({
    studentsList,
    studentView
});
