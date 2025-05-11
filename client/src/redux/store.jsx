// src/redux/store.js
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import { reducerLang } from './reducers/lang';
import { reducerNotification } from './reducers/notification';
import { reducerChat } from './reducers/chat';
import { reducerPopup } from './reducers/popup';

const rootReducer = combineReducers({
    lang : reducerLang,
    notification : reducerNotification,
    chat : reducerChat ,
    popup : reducerPopup,
    // Add other reducers here
});

const store = createStore(rootReducer);

export default store;