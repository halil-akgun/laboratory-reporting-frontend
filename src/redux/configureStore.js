import { createStore, applyMiddleware, compose } from 'redux';
import authReducer from './authReducer';
import SecureLS from 'secure-ls';
import thunk from 'redux-thunk';

const secureLs = new SecureLS();

const getStateFromStorage = () => {
    const localAuth = secureLs.get('auth');

    let stateInLocalStorage = {
        isLoggedIn: false,
        hospitalIdNumber: undefined,
        name: undefined,
        surname: undefined,
        username: undefined,
        password: undefined
    };

    if (localAuth) {
        return localAuth;
    }
    return stateInLocalStorage;
}

const updateStateStorage = newState => {
    secureLs.set('auth', newState);
}

const configureStore = () => {

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    // const store = createStore(authReducer, getStateFromStorage(), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    const store = createStore(authReducer, getStateFromStorage(), composeEnhancers(applyMiddleware(thunk)));

    store.subscribe(() => {
        updateStateStorage(store.getState());
    })

    return store;
}

export default configureStore;