import React, {Component} from "react";
import { NavigationActions } from 'react-navigation';
import { Row, Col} from 'react-native-easy-grid';
import { connect } from 'react-redux';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { View, FlatList, StyleSheet, Platform, StatusBar, AsyncStorage } from 'react-native'
import {
    Tab,Body,Icon,
    Item,Left,Tabs,Card,
    Text,Label,Right,Toast,
    Title,Button,Header,Picker,
    Content,Spinner,CardItem,CheckBox,
    ListItem,Subtitle,Container    
} from 'native-base';
import styles from '../Style';
import I18n from './i18n/i18n';
import FontIcons from 'react-native-vector-icons/FontAwesome';
class Account extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            loading: true,
            renderList: [
                { name: 'Change Language', font: 'font', route: 'Language'},
            ]
        }
    }
    
    componentDidMount(){
        setTimeout(() => {
            this.setState({loading: false});
        },200);
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            console.log('In Focus');
            StatusBar.setBarStyle('light-content', true);
            if(Platform.OS == 'android'){
                StatusBar.setBackgroundColor('#62429b',true);
            } 
        });
    }
        
    componentWillUnmount(){
        this._navListener.remove();
    }

    _loader(){
        return (
            <Container>
                {this._renderHeader()}
                <View style = {styles.contentBackground}>
                    <Spinner style={styles.spinner} color='#673ab7' />
                </View>
          </Container>
        );
    }

    _renderHeader(){
        return (
            <Header style={styles.background}>
                <StatusBar backgroundColor={'#62429b'} barStyle="light-content" />
                {/* <Left>
                    <Button transparent onPress={() => {this.props.navigation.navigate('DrawerOpen');}}>
                        <Icon name='menu' style={styles.header} />
                    </Button>
                </Left> */}
                <Left>
                    <Title style={[styles.fontsize,{paddingLeft: responsiveWidth(4)}]}>{I18n.t('Account',{locale: I18n.locale})}</Title>
                </Left>
                <Right>
                <Button transparent onPress={() => {
                    AsyncStorage.removeItem('login');
                    this.props.navigation.navigate('Login');
                    this.props.navigation.dispatch(
                        NavigationActions.reset({
                            type: 'Navigation/BACK',
                            index: 0,
                            actions: [NavigationActions.navigate({ routeName: 'Login' })]
                        })
                    );
                }}>
                        <Icon name='log-out' style={styles.header} />
                    </Button>
                </Right>
            </Header>
        );
    }

    _renderPage() {
        return (
            <FlatList
                automaticallyAdjustContentInsets={false}
                data = {this.state.renderList}
                extraData = {this.state}
                keyExtractor = {(item) => item.route}
                contentInset={{bottom:49}}
                renderItem = {({item}) => 
                    <ListItem button icon onPress={() => {this.props.navigation.navigate(item.route)}}>
                        <Left>
                            <FontIcons rounded name={item.font} size={responsiveHeight(3.5)} color="#673ab7"/> 
                        </Left> 
                        <Body>
                            <Text>{I18n.t(item.name)}</Text>
                        </Body>
                        <Right>
                            <Icon name="arrow-forward" />   
                        </Right>
                </ListItem>
            }
            />
        )
    }
    _content(){
        return ( 
            <Container style={styles.contentBackground}>
                {this._renderHeader()}
                {this._renderPage()}
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

  

const modalStyle = StyleSheet.create({
    modalContent:{
        backgroundColor: "white",
        padding: 22,
        justifyContent: "center",
        alignItems: "flex-start",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)"
    }
});
const mapState = ({locale}) => ({locale});

export default connect(mapState)(Account);