import React, { Component } from "react";
import { NavigationActions } from 'react-navigation';
import { View, TextInput,Platform, StyleSheet, KeyboardAvoidingView, AsyncStorage, StatusBar} from 'react-native';
import {
    H1,Body,Form,Icon,
    Item,Left,Text,Input,
    Label,Right,Title,Button,
    Header,Content,Spinner,ListItem,
    Container,Thumbnail
} from 'native-base';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import Modal from "react-native-modal";
import I18n from './i18n/i18n';

import styles from '../Style';

const drawerImage = require('../assets/phonepe_icon.png');


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: true,
            loginDisabled: true,
            secure: true,
            labelColor: 'gray',
            labelWeight:'normal',
            labelTop: responsiveHeight(1.5),
            mobile: '',
            forgotMobile: '',
            passwordError: false,
            isVisible: false,
            borderBottomColor: [
                '#d9d5dc',
                '#d9d5dc',
                '#d9d5dc',
                '#d9d5dc'
            ], 
            password: ['','','','']
        }
    }

    componentWillMount(){
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            console.log('in focus');
            StatusBar.setBarStyle(Platform.OS == 'ios' ? 'dark-content' : 'light-content');
            Platform.OS=='android' && StatusBar.setBackgroundColor('#62429b',true);
        });
    }

    componentDidCatch(error,info){
        console.log(error);
        console.log(info);
    }

    componentWillUnmount(){
        this._navListener.remove();
    }
    
    checkLoginData(){
        if(this.state.mobile.length == 10){
            if(this.state.password.join('').length == 4){
                this.setState({loginDisabled: false});
            }else{
                this.setState({loginDisabled: true});
            }   
        }else {
            this.setState({loginDisabled: true});   
        }
        
    }

    _focusNextField(nextField,value,curField) {
        if(value){
            let password = [ ...this.state.password ];
            password[curField] = value;
            this.setState({ password },()=>{
                this.refs[nextField]._root.focus();
                this.checkLoginData();
            }); 
        }else{  
            this.refs[curField]._root.focus();
        }   
    }
        
    _focusprevField(prevField,curField){
        let password = [ ...this.state.password ];
        if(password[curField] != ''){
            password[curField] ='';
            this.setState({ password },() => {this.checkLoginData()});
        }else{
            password[prevField] = '';
            this.setState({ password },() => {
                this.checkLoginData();
                this.refs[prevField]._root.focus();
            });
            
        }
    }

    setValue(value,field){
        let password = [ ...this.state.password ];
        password[field] = value;
        this.setState({ password },() =>{
            this.checkLoginData();
        });
    }

    login(){
         
        if(this.state.password.join('') != '1111'){
            this.setState({passwordError: true},() =>{
                this.refs[3]._root.focus();
            });
            return;
        }
        if(!this.state.loginDisabled){
            this.setState({login: false});
            setTimeout(() => {
                AsyncStorage.setItem('login','loggedIn');
                this.props.navigation.dispatch(
                    NavigationActions.reset({
                        type: 'Navigation/FORWARD',
                        key: null,
                        index: 0,
                        actions: [
                            NavigationActions.navigate({ routeName: 'Home' }),
                        ]
                    })
                );    
            }, 3000);
            
        }else{
            return ;
        }
    }

    _renderForgotPassword(){
        return (
            <Modal
                isVisible={this.state.isVisible}
                animationType={'slide'}
                backdropColor="black"
                onBackdropPress={() => {this.setState({isVisible: false})}}
                onBackButtonPress={() => {this.setState({isVisible: false})}}
                backdropOpacity={0.5}
                avoidKeyboard={true}
                animationInTiming={200}
                animationOutTiming={200}
                backdropTransitionInTiming={200}
                backdropTransitionOutTiming={200}
                animationIn={"slideInUp"}
                animationOut={"slideOutDown"}
                style={modalStyle.modal}
            >
            <View style={modalStyle.modalContent}>
                <Text style={{fontSize: responsiveHeight(3)}}>{I18n.t("Forgot Password")}</Text>
                <Text style={{fontSize: responsiveHeight(2.4), marginTop: responsiveHeight(2), color: 'gray'}}>
                {I18n.t("Registered mobile number")}
                </Text>
                <Item inlineLabel style={{marginTop: responsiveHeight(3), borderBottomColor: '#673ab7'}}>
                    <Icon active name='md-call' style={{color: 'black', top: 4}}/>
                    <Label style={{paddingRight: 0, color:'black'}}>+91</Label>
                    <Input 
                        ref="mobile"
                        value={this.state.forgotMobile}
                        placeholder={I18n.t("Registered mobile number")}
                        maxLength={10}
                        autoFocus={true}
                        placeholderTextColor={'gray'}
                        keyboardType={'numeric'}
                        returnKeyType={Platform.OS=='ios'? 'done' : 'next'}
                        onChangeText={(text) => {
                            this.setState({forgotMobile: text});
                        }}
                    />
                </Item>
                <Item style={{marginTop: responsiveHeight(3), borderBottomWidth: 0, alignSelf: 'flex-end'}}>
                    <Button small transparent onPress={() => {this.setState({isVisible: false, forgotMobile: ''})}}>
                        <Text style={{ color: '#673ab7', fontWeight: 'bold',fontSize: responsiveHeight(2.5)}}>{I18n.t("Cancel")}</Text>
                    </Button>
                    <Button small transparent disabled={this.state.forgotMobile.length == 10? false: true} style={{backgroundColor: 'transparent'}}>
                        <Text style={{ color: this.state.forgotMobile.length == 10 ?'#673ab7' : 'lightgray', fontWeight: 'bold', fontSize: responsiveHeight(2.5)}}>
                            {I18n.t("Confirm")}
                        </Text>
                    </Button>
                </Item>
            </View>
            </Modal>
        );
    }

    render() {
        return ( 
            <Container style={styles.contentBackground}>
                <StatusBar backgroundColor={"#62429b"} barStyle={Platform.OS == "ios" ? 'dark-content' : 'light-content'}/>
                <Content style={loginStyle.contentPadding}>
                    <Thumbnail large style={loginStyle.image} source={drawerImage}/>
                    <H1 style={loginStyle.textPadding}>
                        {I18n.t('Welcome back!')}
                    </H1>
                    <Text style={loginStyle.textPadding}>{I18n.t("Login to continue with Merchant Console")}</Text>
                    <KeyboardAvoidingView behavior="padding">
                    <Form>
                        <Row style={loginStyle.inputPadding}>
                            <Col size={0.1}>
                                <Icon active name="phone-portrait" style={loginStyle.icon} />                    
                            </Col>
                            
                            <Col size={0.9}>
                                <Item floatingLabel>
                                    <Label style={{
                                            color: this.state.labelColor, 
                                            fontWeight: this.state.labelWeight, 
                                            top: this.state.labelTop,
                                            fontFamily: 'Roboto',
                                            paddingBottom: Platform.OS != 'ios' ? responsiveHeight(0.5) : 0,
                                            fontSize: Platform.OS != 'ios' ? responsiveHeight(2.2) : responsiveHeight(2.2)
                                        }}
                                    >
                                        {I18n.t('10 digit mobile number')}
                                    </Label>
                                    <Input 
                                        ref="mobile"
                                        maxLength={10}
                                        keyboardType={'numeric'}
                                        returnKeyType={Platform.OS=='ios'? 'done' : 'next'}
                                        onSubmitEditing={() => {
                                            let len = this.state.password.join('').length
                                            if(len > 0){
                                                this.refs[ Platform.OS == 'ios' ? len : len-1]._root.focus(); 
                                            }else{
                                                this.refs[0]._root.focus(); 
                                            }
                                        }}
                                        value={this.state.mobile}
                                        onFocus={()=>{this.setState({labelColor: '#673ab7'})}} 
                                        onBlur={()=>this.setState({labelColor: 'gray'})}
                                        onChangeText={(text) => {
                                            if(text.length == 10){
                                                if(this.state.password.join('').length > 0){
                                                    this.refs[this.state.password.join('').length-1]._root.focus(); 
                                                }else{
                                                    this.refs[0]._root.focus(); 
                                                }
                                            } 
                                            this.setState({mobile: text},() => {this.checkLoginData()});
                                            
                                        }}
                                        />
                                </Item>
                            </Col>
                            <Col size={0.1}></Col> 
                        </Row>
                        <Row style={loginStyle.inputPadding}>
                            <Col size={0.1}>
                                <Icon active name='lock' style={loginStyle.iconStacked} />                    
                            </Col>
                            <Col size={0.7}>
                                <Label style={loginStyle.stackLabel}>{I18n.t("Enter 4 digit password")}</Label>
                                <Row>
                                   <Col style={[loginStyle.input, {marginLeft: responsiveWidth(2.5), borderBottomColor: this.state.borderBottomColor[0]}]}>
                                        <Input
                                            ref="0"
                                            maxLength = {1}
                                            editable = {true}
                                            returnKeyType={'next'}
                                            keyboardType={'numeric'}
                                            style={loginStyle.inputText}
                                            value={this.state.password[0]}
                                            secureTextEntry={this.state.secure}
                                            onChangeText={(text) => {if(text){this._focusNextField('1', text, '0')}}}
                                            editable = {this.state.password.join('') == '' ? true: false}
                                            onKeyPress={event => {if (event.nativeEvent.key === 'Backspace') this._focusprevField('0','0')}}
                                            onFocus={() => this.setState(prevState => ({
                                                borderBottomColor: {
                                                    ...prevState.borderBottomColor,
                                                      0: '#673ab7'
                                                }})
                                            )}
                                            onBlur={() => this.setState(prevState => ({
                                                borderBottomColor: {
                                                    ...prevState.borderBottomColor,
                                                      0: '#d9d5dc'
                                                }})
                                            )}
                                        />
                                    </Col>
                                   <Col style={[loginStyle.input, {borderBottomColor: this.state.borderBottomColor[1]}]}>
                                        <Input
                                            ref="1"
                                            maxLength = {1}
                                            returnKeyType={'next'}
                                            keyboardType={'numeric'}
                                            style={loginStyle.inputText}
                                            value={this.state.password[1]}
                                            secureTextEntry={this.state.secure}
                                            editable = {this.state.password[0] != '' && this.state.password[1] == '' ? true: false}
                                            onChangeText={(text) => {
                                                if(text !=''){
                                                    this._focusNextField('2',text,'1');
                                                }else if(Platform.OS !='ios'){
                                                    this._focusprevField('0','1');
                                                }
                                            }}
                                            onKeyPress={event => {if (event.nativeEvent.key === 'Backspace') this._focusprevField('0','1')}}
                                            onFocus={() => this.setState(prevState => ({
                                                borderBottomColor: {
                                                    ...prevState.borderBottomColor,
                                                    1: '#673ab7'
                                                }})
                                            )}
                                            onBlur={() => this.setState(prevState => ({
                                                borderBottomColor: {
                                                    ...prevState.borderBottomColor,
                                                    1: '#d9d5dc'
                                                }})
                                            )}
                                        />
                                    </Col>
                                    <Col style={[loginStyle.input, {borderBottomColor: this.state.borderBottomColor[2]}]}>
                                        <Input
                                            ref="2"
                                            maxLength = {1}
                                            returnKeyType={'next'}
                                            keyboardType={'numeric'}
                                            style={loginStyle.inputText}
                                            value={this.state.password[2]}
                                            secureTextEntry={this.state.secure}
                                            editable = {this.state.password[1] !='' && this.state.password[2] == '' ? true: false}
                                            onKeyPress={event => {if (event.nativeEvent.key === 'Backspace') this._focusprevField('1','2')}}
                                            onChangeText={(text) => {
                                                if(text != ''){
                                                    this._focusNextField('3',text,'2');
                                                }else if(Platform.OS !='ios'){
                                                    this._focusprevField('1','2');
                                                }
                                            }}
                                            onFocus={() => this.setState(prevState => ({
                                                borderBottomColor: {
                                                    ...prevState.borderBottomColor,
                                                      2: '#673ab7'
                                                }})
                                            )}
                                            onBlur={() => this.setState(prevState => ({
                                                borderBottomColor: {
                                                    ...prevState.borderBottomColor,
                                                      2: '#d9d5dc'
                                                }})
                                            )}
                                        />
                                    </Col>
                                    <Col style={[loginStyle.input, {borderBottomColor: this.state.borderBottomColor[3]}]}>
                                        <Input
                                            ref="3"
                                            maxLength = {1}
                                            returnKeyType={'done'}
                                            keyboardType={'numeric'}
                                            style={loginStyle.inputText}
                                            value={this.state.password[3]}
                                            secureTextEntry={this.state.secure}
                                            onSubmitEditing={() => this.login()}
                                            onKeyPress={event => {if (event.nativeEvent.key === 'Backspace') this._focusprevField('2','3')}}
                                            onChangeText={(text) => {
                                                if(text != ''){
                                                    this.setValue(text,3);
                                                }else if(Platform.OS !='ios'){
                                                    this._focusprevField('2','3');
                                                }
                                            }}
                                            editable = {this.state.password[2] !='' ? true: false}
                                            onFocus={() => this.setState(prevState => ({
                                                borderBottomColor: {
                                                    ...prevState.borderBottomColor,
                                                      3: '#673ab7'
                                                }})
                                            )}
                                            onBlur={() => this.setState(prevState => ({
                                                borderBottomColor: {
                                                    ...prevState.borderBottomColor,
                                                      3: '#d9d5dc'
                                                }})
                                            )}                                        
                                        />
                                    </Col>
                                </Row>
                            </Col> 
                            <Col size={0.2}>
                                { this.state.secure && 
                                    <Button
                                        small 
                                        transparent 
                                        disabled={this.state.password.join('') ==''? true: false} 
                                        style={loginStyle.stackLabelPassword} 
                                        onPress={() => this.setState({secure: false})}>
                                            <Text style={[this.state.password.join('') !=''?{color:'blue'}:{color:'gray'},{fontSize: responsiveHeight(1.5), fontFamily: 'Roboto'}]}>{I18n.t("Show")}</Text>                                    
                                    </Button> 
                                }
                                { !this.state.secure && 
                                    <Button 
                                        small 
                                        transparent 
                                        disabled={this.state.password.join('') ==''? true: false} 
                                        style={loginStyle.stackLabelPassword}  
                                        onPress={() => this.setState({secure: true})}>
                                            <Text style={[this.state.password.join('') !=''?{color:'blue'}:{color:'gray'},{fontSize: responsiveHeight(1.5), fontFamily: 'Roboto'}]}>{I18n.t("Hide")}</Text>
                                    </Button>   
                                }
                            </Col> 
                        </Row>
                        <Row>
                            {this.state.passwordError && <Label style={loginStyle.error}>{I18n.t("Invalid Password")}</Label>}
                        </Row>
                        <Row style={loginStyle.inputPadding}>
                            <Col>
                                {this.state.login &&  
                                    <Button full block transparent 
                                        style={{marginTop: responsiveHeight(4),backgroundColor: this.state.loginDisabled ? 'lightgrey' : '#673ab7'}} 
                                        ref="submit" 
                                        disabled={this.state.loginDisabled}
                                        onPress={() => {this.login()}}>
                                        <Text style={loginStyle.button}>{I18n.t('LOGIN')}</Text>
                                    </Button>
                                }
                                {!this.state.login && <Spinner color="#673ab7"/>}
                            </Col>
                        </Row>
                    </Form>
                    </KeyboardAvoidingView>
                    <Item style={{marginTop: responsiveHeight(4), borderBottomWidth: 0.5, borderBottomColor: 'lightgray', justifyContent:'center'}}>
                        <Button transparent onPress={() => {this.setState({isVisible: true, forgotMobile: this.state.mobile})}}>
                            <Text style={{color: '#673ab7', fontSize: responsiveHeight(2), fontFamily: 'Roboto'}}>{I18n.t("Forgot Password?")}</Text>
                        </Button>
                    </Item>
                    <Item style={{marginVertical: responsiveHeight(4), borderBottomWidth: 0, alignItems:'center', flexDirection:'column'}}>
                        <Text style={{color: 'black', fontFamily: 'Roboto'}}>{I18n.t("Don't have PhonePe Merchant account?")}</Text>
                        <Button transparent full >
                            <Text style={{color: '#673ab7', fontWeight:'bold', fontFamily: 'Roboto'}}>{I18n.t("Register").toUpperCase()}</Text>
                        </Button>
                    </Item>     
                </Content>
                {this.state.isVisible && this._renderForgotPassword()}
            </Container>
        );
    } 
}

const loginStyle = StyleSheet.create({
    contentPadding:{
        paddingTop: responsiveHeight(3),
        paddingHorizontal: responsiveWidth(5),
    },

    image:{
        alignSelf: 'center',
        paddingBottom: responsiveHeight(2),
    },

    textPadding:{
        textAlign: 'center',
        paddingTop: responsiveHeight(3),
        fontFamily: 'Roboto'
    },
    inputPadding: {
        paddingTop: responsiveHeight(1.5),
    },
    input: {
        flex: 1, 
        flexDirection: 'row',
        marginLeft: responsiveWidth(7),
        borderBottomWidth:1,
        borderBottomColor:'#D9D5DC',
    },
    inputText:{
        textAlign: 'center',
        fontFamily: 'Roboto'
    },
    stackLabel: {
        top: responsiveHeight(1.4),
        position: null,
		left: responsiveWidth(3),
		right: null,
        paddingTop: 5,
        paddingBottom: responsiveHeight(1),
        alignSelf: 'flex-start',
        color: 'grey',
        fontSize: responsiveHeight(2.3),
        fontFamily: 'Roboto'
    },
    stackLabelPassword:{
        top: responsiveHeight(7),
        position: null,
		left: responsiveWidth(3),
		right: null,
        paddingTop: 5,
        backgroundColor: 'transparent',
        paddingBottom: responsiveHeight(1),
        alignSelf: 'flex-start',
    },
    icon: {
        flexDirection: 'column', 
        alignSelf:'center', 
        top: responsiveHeight(6)
    },
    iconStacked: {
        flexDirection: 'column', 
        alignSelf:'center', 
        top: responsiveHeight(7)
    },
    error:{
        color:'red',
        marginLeft: responsiveWidth(12),
        marginTop: responsiveHeight(1.5), 
        fontSize: responsiveHeight(2),
        fontFamily: 'Roboto'
    },
    button:{
        color: 'white', 
        fontSize: responsiveHeight(3.1), 
        fontWeight: 'bold', 
        paddingTop: responsiveHeight(1),
        fontFamily: 'Roboto'
    }
});

const modalStyle = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        margin: responsiveWidth(3), 
        //top: -responsiveHeight(5)
    },
    modalContent:{
        backgroundColor: "white",
        paddingHorizontal: responsiveWidth(8),
        paddingVertical: responsiveWidth(5),
        justifyContent: "center",
        alignItems: "flex-start",
        borderRadius: 15,
        borderColor: "rgba(0, 0, 0, 0.1)"
    }
});
export default Login;
