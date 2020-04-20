import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authSlice from './Auth';

const createRootReducer = (history) => {
    const appReducer = combineReducers({
        state: (state = {}) => state,
        router: connectRouter(history),
        authSlice
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
