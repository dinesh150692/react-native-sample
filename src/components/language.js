import React, {Component} from "react";
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { View, FlatList, StyleSheet, StatusBar, Platform, AsyncStorage } from 'react-native'
import {
    Body,Icon,
    Item,Left,
    Text,Right,Footer,
    Title,Button,Header,
    Content,Spinner,CheckBox,
    ListItem,Container    
} from 'native-base';
import FontIcons from 'react-native-vector-icons/FontAwesome';
import I18n from './i18n/i18n';
import { changeLocale } from '../redux/reducers/reducer';
import styles from '../Style';

class Language extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            loading: true,
            languagesList: [
                {locale: Platform.OS == 'ios'? 'en' : 'en-IN', name: 'English'},
                {locale: 'hi', name: 'हिंदी'},
                {locale: 'ka', name: 'ಕನ್ನಡ'},
                {locale: 'ta', name: 'தமிழ்'},
                {locale: 'te', name: 'తెలుగు'}
            ],
            currentLocale: this.props.locale,
            languageChange: false
        }
    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({loading: false});
        },100);
    }
    _loader(){
        return (
            <Container>
                {this._renderHeader()}
                <Content style = {styles.contentBackground}>
                    <Spinner style={styles.spinner} color='#673ab7' />
                </Content>
          </Container>
        );
    }
    
    changeLanguage(locale){
        console.log(locale);
        I18n.locale = locale;
        this.props.changeLocale(locale);
        this.setState({languageChange: !this.state.languageChange});
    }

    _renderHeader(){
        return (
            <Header iosBarStyle="light-content" androidStatusBarColor="#62429b" style={[styles.background, {alignItems:'center'}]}>
                <Left>
                    <Button transparent icon onPress={() => {
                            this.props.changeLocale(currentLocale);
                            this.props.navigation.goBack();
                        }}
                    >
                        <Icon android='md-arrow-back' ios="ios-arrow-back" style={styles.header} />
                    </Button>
                </Left>
                <Body style={{flex:3}}>
                    <Text style={[styles.fontsize, {fontFamily: 'Roboto'}]}>{I18n.t('Change Language')}</Text>
                </Body>
                <Right/>
            </Header>
        );
    }
   
    _renderFooter(){
        return (
            <Footer style={styles.background}>
                <Button full transparent onPress={() => {
                    AsyncStorage.setItem('locale', I18n.locale);
                    // this.props.navigation.navigate('Splash');
                    // this.props.navigation.dispatch(
                    //     NavigationActions.reset({
                    //         type: 'Navigation/FORWARD',
                    //         index: 0,
                    //         actions: [NavigationActions.navigate({ routeName: 'Splash' })]
                    //     })
                    // );
                    this.props.navigation.goBack();
                }}>
                    <Text style={{color: 'white'}}>{I18n.t('Continue')}</Text>
                </Button>
            </Footer>
        );
    }
    _content(){
        return ( 
            <Container style={styles.contentBackground}>
                {this._renderHeader()}
                <Content>
                    <FlatList
                        data = {this.state.languagesList}
                        extraData = {this.state}
                        keyExtractor = {(item) => item.locale}
                        renderItem = {({item}) => 
                            <ListItem button noBorder style={{marginLeft: 0, paddingLeft: 17,backgroundColor: I18n.locale == item.locale ? 'white':'#F5F5F5'}} 
                                onPress={() => {
                                    this.changeLanguage(item.locale)
                                }}
                            >
                                <Body>
                                    <Text>{item.name}</Text>
                                </Body>
                                {I18n.locale == item.locale && <Right>
                                    <FontIcons rounded name={'check-circle'} size={responsiveHeight(3.5)} color="green"/> 
                                </Right>}
                            </ListItem>
                        }
                    />
               </Content>
               {this._renderFooter()}
            </Container>
        );
    }

    render() {
        if(this.state.loading){
            return this._loader();
        }else {
            return this._content();
        }
    }
}

const mapState = ({locale}) => ({locale});
const mapDispatch = {changeLocale};

export default connect(mapState, mapDispatch)(Language);
