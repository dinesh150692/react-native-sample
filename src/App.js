import React, { Component } from 'react';
import {  TouchableOpacity, Animated, Easing, BackHandler,View, StatusBar, AsyncStorage, Platform, Dimensions } from 'react-native';
import { DrawerNavigator, StackNavigator, TabNavigator, TabBarBottom, DrawerItems, TabBarTop} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import I18n from './components/i18n/i18n';

import Transactions from './components/transactions';
import Reports from './components/reports';
import Terminal from './components/terminal';
import Refund from './components/refund';
import MapMyStore from './components/mapmystore';
import Account from './components/account';
import SideBar from './components/sideBar';
import Login from './components/login';
import Splash from './components/splashScreen';
import Home from './components/home';
import Language from './components/language';
import { responsiveHeight } from "react-native-responsive-dimensions";


const navigationOptions = (navigation, title) => ({
  title: I18n.t(title),
  tabBarVisible: navigation.state.routeName == 'Home' || navigation.state.routeName == 'Account' ? true : false,
  headerStyle: {
    backgroundColor: '#673ab7',
    paddingRight: 10, 
    paddingLeft: 10,
  },
  headerBackTitle: null,
  headerTintColor: 'white',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: responsiveHeight(3),
    fontFamily: 'Roboto'
  },
  // headerLeft:(
  //   <TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")}>
  //     <Icon name="ios-menu" size={30} color='white'/>
  //   </TouchableOpacity>
  // ),
});

const TransactionStack = StackNavigator(
  {
      Login : {screen: Login, navigationOptions:({header: null, tabBarVisible: false})},
      Splash: {screen: Splash, navigationOptions:({header: null, tabBarVisible: false,})},
      Home: {screen: Home, navigationOptions:({navigation}) => (navigationOptions(navigation, 'PhonePe Merchant Console'))},
      Transactions: {screen: Transactions, navigationOptions:({navigation}) => (navigationOptions(navigation, 'Transactions'))},
      Reports: {screen: Reports, navigationOptions:({navigation}) => (navigationOptions(navigation, 'Reports'))},
      Refund: {screen: Refund, navigationOptions:({navigation}) => (navigationOptions(navigation, 'Refund'))},
      Terminal: {screen: Terminal, navigationOptions:({navigation}) => (navigationOptions(navigation, 'QR/POS'))},
      MapMyStore: {screen: MapMyStore,navigationOptions:({navigation}) => (navigationOptions(navigation, 'Map My Store'))},
  },
    {
      initialRouteName: 'Splash',
      headerMode: 'screen',
      mode: 'card',
      transitionConfig:  () => ({
        transitionSpec: {
          duration: 500,
          easing: Easing.out(Easing.linear),
          timing: Animated.timing,
          useNativeDriver: true,
        },
        screenInterpolator: sceneProps => {
          const { layout, position, scene } = sceneProps;
          let {index}  = scene;
            const opacity = position.interpolate({
              inputRange: [index - 1, index - 0.5, index],
              outputRange: [0, 0.5, 1],
            });
          return {opacity}
        }
      })
    }
);

const AccountStack = StackNavigator(
  {
    Account: {screen: Account, navigationOptions:({header: null})},
    Language: {screen: Language, navigationOptions:({header: null, tabBarVisible: false})},
  },
  {
    initialRouteName: 'Account',
    cardStyle: {
      //backgroundColor: 'white',
      backgroundColor: 'white',
      opacity: 1
    },
    transitionConfig:  () => ({
      containerStyle: {
        backgroundColor: 'white',
      },
      transitionSpec: {
        duration: 2000,
        easing: Easing.inOut(Easing.linear),
        timing: Animated.timing,
        useNativeDriver: true,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;
        const height = layout.initHeight
        const width = layout.initWidth
      
        const translateX = position.interpolate({
          inputRange: [index -1, index, index+1],
          outputRange: [width, 0, -width]
        })

        const translateReverseX = position.interpolate({
          inputRange: [index -1, index, index+1],
          outputRange: [-width, 0, width]
        })
      
        const translateY = position.interpolate({
          inputRange: [index-1, index, index+1],
          outputRange: [height, 0,  0]
        });
        const translateReverseY = position.interpolate({
          inputRange: [index-1, index, index+1],
          outputRange: [-height, 0,  0]
        });
        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.5, index],
          outputRange: [-1, 0.5, 1],
        });
      
        const scale = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [4, 1, 1]
        });

        const rotate = position.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg','180deg'],
        });
        
        const rotateReverse = position.interpolate({
          inputRange: [0, 1],
          outputRange: ['180deg','0deg'],
        });
        
        const scaleWithOpacity = { opacity, transform: [{ scaleX: scale }, { scaleY: scale }] }  
        const slideFromRight = { transform: [{ translateX }] }
        const slideFromLeft = { transform: [{ translateX: translateReverseX }] }
        const slideFromBottom = { transform: [{ translateY }] }
        const slideFromUp = { transform: [{ translateY: translateReverseY }] }
        const slideWithOpacity = {opacity}
        const slideWithOpacityFromRight = { opacity, transform: [{ translateX : translateX }]};
        const slideWithOpacityFromBottom = { opacity, transform: [{ translateY: translateY}]};
        const slideWithOpacityAndRotate = { opacity, transform : [ {translateX },{rotate: rotate}]} 
        const slideWithOpacityAndRotateX = { opacity, transform : [ {translateX },{rotateY: rotate}]} 
        const slideWithOpacityAndRotateReverseX = { opacity, transform : [ {rotateY: rotateReverse}]} 
        const slideWithOpacityAndRotateY = { transform : [ {rotateX: rotate}]} 
        const slideWithOpacityAndRotateReverseY = { transform : [ {rotateX: rotateReverse}]}  
        if(index == 0 ){
          return slideWithOpacityAndRotateX;
        }else {
          return slideWithOpacityAndRotateReverseX;
        }
      }
    }),
  },
);

const tabNavigationOption = (navigation, title) => ({
    title: I18n.t(navigation.state.routeName),
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Home') {
        iconName = `ios-home${focused ? '' : '-outline'}`;
      }else if (routeName === 'Account') {
        iconName = `ios-contact${focused ? '' : '-outline'}`;
      }
      return <Icon name={iconName} style={{ fontSize: responsiveHeight(5), color:tintColor}}/>;
    },
});

const App = TabNavigator(
  {
    Home: { screen: TransactionStack, navigationOptions:({navigation}) => (tabNavigationOption(navigation, 'Home')) },
    Account: { screen: AccountStack, navigationOptions:({navigation}) => (tabNavigationOption(navigation, 'Account'))},
  }, 
  {
    tabBarOptions: {
      activeTintColor: '#673ab7',
      inactiveTintColor: '#673ab7',
      showIcon: true,
      showLabel:true,
      labelStyle:{
        fontSize: responsiveHeight(1.5),
        fontFamily: 'Roboto'
      },
      style: {
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#673ab7',
        // shadowOpacity: 0.1,
        // shadowColor: 'rgb(103,58,183)',
        // shadowRadius: 0.1
      }
    },
    initialRouteName: 'Home',
    backBehavior: 'initialRoute',
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    lazy: true,
    removeClippedSubviews: true,
    animationEnabled: true,
    configureTransition: (currentTransitionProps,nextTransitionProps) => ({
      timing:  Animated.timing(Animated.Value(0), {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      })
    }),
    swipeEnabled: false,
  }
);

export default App;

{/*

  const App = StackNavigator({
    Login : {screen: Login, navigationOptions:({header: null})},
    //Drawer: {screen: Drawer},
    TabBar: { screen: Tab, navigationOptions:({header: null})},
    Splash: {screen: Splash, navigationOptions:({header: null})},
    },
    {
    initialRouteName: 'Splash',
    headerMode: 'screen',
    mode: 'card',
    transitionConfig:  () => ({
        transitionSpec: {
          duration: 1000,
          easing: Easing.out(Easing.linear),
          timing: Animated.timing,
          useNativeDriver: true,
        },
        screenInterpolator: sceneProps => {
          const { layout, position, scene } = sceneProps;
          const { index } = scene;
                
          const opacity = position.interpolate({
            inputRange: [index - 1, index - 0.5, index],
            outputRange: [-1, 0.5, 1],
          })
         return {opacity}
        }
      })
  });

  const customComponent = (props) => (
    <SideBar
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <DrawerItems {...props} />
    </SideBar>
  );

  const Drawer = DrawerNavigator(
    {
      Transactions: { screen: TransactionStack },
      Account: { screen: AccountStack},
    },
    {
      drawerOpenRoute: 'DrawerOpen',
      drawerCloseRoute: 'DrawerClose',
      drawerToggleRoute: 'DrawerToggle',
      contentComponent: customComponent,
      drawerBackgroundColor: 'white',
      contentOptions: {
        activeBackgroundColor : '#673ab7',
        inactiveBackgroundColor: 'white',
        activeTintColor: 'white',
        inactiveTintColor: '#673ab7',
        labelStyle:{
          fontSize: responsiveHeight(2.5)
        }
      },
      navigationOptions: ({ navigation }) => ({
        drawerIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'Transactions') {
            iconName = `ios-stats${focused ? '' : '-outline'}`;
          }else if (routeName === 'Account') {
          iconName = `ios-contact${focused ? '' : '-outline'}`;
          }
          return <Icon name={iconName} size={responsiveHeight(4)} color={tintColor}/>;
        },
      }),
    },
  );

  const defaultGetStateForAction = Drawer.router.getStateForAction;
  Drawer.router.getStateForAction = (action, state) => {
    if(state && action.type === 'Navigation/NAVIGATE' && action.routeName === 'DrawerClose') {
      StatusBar.setHidden(false);
    }
    if(state && action.type === 'Navigation/NAVIGATE' && action.routeName === 'DrawerOpen') {
      StatusBar.setHidden(true);
    }
    if(Platform.OS == 'android'){
      StatusBar.setBackgroundColor('#62429b',true);
    }
    return defaultGetStateForAction(action, state);
  };
*/}

