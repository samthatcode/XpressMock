import { legacy_createStore as createStore, combineReducers } from 'redux'
import { sessionService, sessionReducer } from 'redux-react-session';

const reducers = {
    // ... your other reducers here ...
    session: sessionReducer
};
const reducer = combineReducers(reducers);

const store = createStore(reducer);
const options = { refreshOnCheckAuth: true, redirectPath: '/login', driver: 'LOCALSTORAGE' };

sessionService.initSessionService(store, options)
    .then(() => console.log('Redux React Session is ready and a session was refreshed from your storage'))
    .catch(() => console.log('Redux React Session is ready and there is no session in your storage'));




