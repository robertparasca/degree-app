import { combineReducers } from 'redux';

import ticketsList from './ticketsList';
import ticketForm from './ticketForm';
import ticketActions from './ticketActions';

export default combineReducers({
    ticketsList,
    ticketForm,
    ticketActions
});
