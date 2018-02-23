import React, { Component } from 'react';
import { AppRegistry, View, StatusBar } from 'react-native';
import App from './src/App';

// //add the new color to the style property
// class App extends React.Component {
//     render() {
//       return ( 
//           <AppContent style = {{backgroundColor: 'white'}} transitionerStyle={{backgroundColor: 'white'}}/>
//       );
//     }
//   }
  
AppRegistry.registerComponent('sample', () => App);
