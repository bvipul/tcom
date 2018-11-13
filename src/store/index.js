import { createStore } from 'redux';
import rootReducer from './reducers';
import { loadState, saveState } from '../Helpers/persistStore';

const persistedState = loadState();

const store = createStore(
    rootReducer,
    persistedState
);

store.subscribe(() => {
    saveState({
        auth: store.getState().auth
    });
});

export default store;