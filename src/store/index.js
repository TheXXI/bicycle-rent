import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import { userReducer } from './userReducer'
import { infoMessagesReducer } from './infoMessagesReducer';
import { casesReducer } from './casesReducer';
import { officerReducer } from './officersReducer';
import { singleOfficerReducer } from './singleOfficerReducer';
import { singleCaseReducer } from './singleCaseReducer';

const rootReduser = combineReducers({
    user: userReducer,
    messagesAndLoader: infoMessagesReducer,
    officers: officerReducer,
    singleOfficer: singleOfficerReducer,
    cases: casesReducer,
    singleCase: singleCaseReducer
})

export const store = createStore(rootReduser, composeWithDevTools(applyMiddleware(thunk)));