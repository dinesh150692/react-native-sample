import React, {Component} from "react";
import { AsyncStorage, StatusBar, View, Image, Platform } from 'react-native';
import { Spinner } from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import { NavigationActions } from 'react-navigation';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import I18n from './i18n/i18n';
import styles from '../Style';
const drawerImage = require('../assets/launch_screen.png');

class Splash extends Component {
    constructor(props) {
        super(props);
        this.state ={
            loggedIn : false
        }
    }

    componentDidMount(){
        this._loadInitialState();
    }

    _loadInitialState = async () => {
        AsyncStorage.getItem('locale').then((value) => {
            if(value && value != ''){
                I18n.locale = value;
            }else {
                I18n.locale = Platform.OS == 'ios'? 'en' : 'en-US';
            }
        });
        AsyncStorage.getItem('login').then((value) => {
            if(value == 'loggedIn'){
                this.setState({loggedIn: true});
                this.props.navigation.dispatch(
                    NavigationActions.reset({
                        type: 'Navigation/FORWARD',
                        index: 0,
                        actions: [
                            NavigationActions.navigate({ routeName: 'Home' }),
                        ]

                    })
                );
                SplashScreen.hide();
                // AsyncStorage.getItem('initialRoute').then((value) => {
                //     if(value != ''){
                //         this.props.navigation.dispatch(
                //             NavigationActions.reset({
                //                 index: 0,
                //                 actions: [NavigationActions.navigate({ routeName: 'TabBar' })]
                //             })
                //         );
                //         //this.props.navigation.navigate('Refund');
                //         SplashScreen.hide();
                //     }else {
                //         this.props.navigation.navigate('TabBar');
                //         SplashScreen.hide();
                //     }   
                // });
            }else {
                //this.props.navigation.navigate('Login');
                this.props.navigation.dispatch(
                    NavigationActions.reset({
                        type: 'Navigation/FORWARD',
                        index: 0,
                        actions: [
                            NavigationActions.navigate({ routeName: 'Login' })
                        ]
                    })
                );
                SplashScreen.hide();
            }
        });
    };

    render(){
        return (
            <View style={{flex:1, flexDirection: 'column',justifyContent: 'space-around',alignItems: 'center', backgroundColor: 'white'}}>
                <View style={{backgroundColor: 'white'}}>
                    <StatusBar backgroundColor={'#62429b'} barStyle={Platform.OS == 'ios' ? 'dark-content': 'light-content'}/> 
                    {/* { Platform.OS == 'ios'  && <Image
                        square
                        style={{width: responsiveWidth(100),height: responsiveHeight(50)}}
                        source={drawerImage}
                    />} */}
                    {/* { Platform.OS == 'android'  && <Spinner  color='#673ab7' />} */}
                    <Spinner color='#673ab7' />
                </View>
            </View>
        );
    }
}


export default Splash;
