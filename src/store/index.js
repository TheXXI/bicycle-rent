import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import { userReducer } from './userReducer'
import { infoMessagesuserReducer } from './infoMessagesReducer';
import { casesReducer } from './casesReducer';

const rootReduser = combineReducers({
    user: userReducer,
    messages: infoMessagesuserReducer,
    cases: casesReducer
})

export const store = createStore(rootReduser, composeWithDevTools(applyMiddleware(thunk)));