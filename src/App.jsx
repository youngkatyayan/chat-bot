import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import ChatWindow from './components/ChatWindow.jsx';

const App = () => {
  return (
    <Provider store={store}>
      <ChatWindow />
    </Provider>
  );
};

export default App;
