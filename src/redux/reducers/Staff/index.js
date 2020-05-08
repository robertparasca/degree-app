import { combineReducers } from 'redux';

import staffList from './staffList';
import staffView from './staffView';
import staffForm from './staffForm';

export default combineReducers({
    staffList,
    staffView,
    staffForm
});
