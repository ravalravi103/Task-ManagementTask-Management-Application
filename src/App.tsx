import React from 'react'
import { store } from './Redux/store';
import { Provider } from 'react-redux';

import Counter from './Components/Counter'

import './App.css'

function App() {


  return (
    <React.Fragment>
      <Provider store={store}>
        <Counter></Counter>
      </Provider>

    </React.Fragment>
  )
}

export default App
