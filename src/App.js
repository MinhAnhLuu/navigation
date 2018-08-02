import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

//Redux module
import { Provider } from 'react-redux'
import rootReducer from './state/reducers/reducers';
import configureStore from './state/reducers/configureStore';
//Import Components
import NavBarInstance from './components/navbars'

//Import Page
import Home from './pages/homepage'
import About from './pages/about'
import Analysis from './pages/analysis'
import CSExample1 from './pages/csexample1'
import NotFound from './pages/notfound'
import CircuitSimulatorPage from './pages/circuitSimulator'

const store = configureStore(rootReducer);
// global.__DEV__ = process.env.NODE_ENV === 'development';

class App extends Component {
  render() {
    var args = require("./pages/csexample1/arg.json");
    args.map(function (ele) {
      store.dispatch({
        type: 'ADD_NEW_ARGUMENT',
        id: ele.name,
        value: ele.value
      })
    })
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <NavBarInstance />

            <Switch>
              <Route exact path='/' component={Home}/>
              <Route path='/about' component={About}/>
              <Route path='/analysis' component={Analysis}/>
              <Route path='/example-1' component={CSExample1}/>
              <Route path='/csim' component={CircuitSimulatorPage}/>
              <Route path='*' component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
