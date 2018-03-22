import React, { Component } from 'react';
import { AppRegistry, View, StatusBar } from 'react-native';
import Root from './src/App';
import { Provider } from 'react-redux';
import store from './src/redux/store';

class App extends React.Component {
    render() {
      return ( 
        <Provider store={store}>
            <Root/>
        </Provider>
      );
    }
  }
  
AppRegistry.registerComponent('sample', () => App);
