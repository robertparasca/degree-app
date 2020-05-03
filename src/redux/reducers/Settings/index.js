import { combineReducers } from 'redux';

import instituteSlice from './instituteSlice';
import importStudentsDataSlice from './importStudentsDataSlice';

export default combineReducers({
    instituteSlice,
    importStudentsDataSlice
});
