import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authSlice from './Auth';
import settingsSlice from './Settings';
import staffSlice from './Staff';
import studentsSlice from './Students';
import ticketsSlice from './Tickets';
import activateAccountSlice from './ActivateAccount';
import dashboardSlice from './Dashboard';

const createRootReducer = (history) => {
    const appReducer = combineReducers({
        state: (state = {}) => state,
        router: connectRouter(history),
        authSlice,
        settingsSlice,
        staffSlice,
        studentsSlice,
        ticketsSlice,
        activateAccountSlice,
        dashboardSlice
    });

    const rootReducer = (state, action) => {
        if (action.type === 'DESTROY_SESSION') {
            state = undefined;
        }

        return appReducer(state, action);
    };

    return rootReducer;
};

export default createRootReducer;
