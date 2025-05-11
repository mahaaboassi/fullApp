import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./i18n"
// Redux 
import { Provider } from 'react-redux';
import store from './redux/store';
import Notification from './components/notification';
import ChatComonent from './components/chat';
import { HelmetProvider } from 'react-helmet-async';
import PopupComponent from './components/popup';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <App />
        <Notification/>
        <ChatComonent/>
        <PopupComponent/>
      </Provider>
    </HelmetProvider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
