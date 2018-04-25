import React,  {Component} from 'react';
import DigitalCatelogue from './components/DigitalCatelogue.jsx';
import WishList from './components/wishlist.jsx';
import { Provider } from "react-redux";
import { HashRouter, Route, Switch} from 'react-router-dom';
const store = createStore(allReducers);
import { createStore } from "redux";
import allReducers from "./../redux/reducers/combineReducers.js";

export default class AppRouter extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Provider store={store}>
      <HashRouter>
      <Switch>
        <Route path='/' component={DigitalCatelogue} exact/>
        <Route path='/wishlist' component={WishList} />
      </Switch>
      </HashRouter>
    </Provider>
    );
  }
};
