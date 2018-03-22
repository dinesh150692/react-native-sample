import React, { Component } from "react";
import { Text, Container, Content, Card, Header, Left, Right, Body, Title} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import FontIcons from 'react-native-vector-icons/FontAwesome';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { View, StatusBar,StyleSheet,BackHandler, Platform, AsyncStorage } from 'react-native';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import I18n from './i18n/i18n';
import styles from '../Style';

class Home extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount(){
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

    _renderHeader(){
        return (
            <Header iosBarStyle="light-content" androidStatusBarColor="#62429b"  style={styles.background}>     
                <Body style={{flex: 3}}>
                    <Title style={[styles.fontsize,{paddingLeft: responsiveWidth(4), alignItems: 'center'}]}>{I18n.t('PhonePe Merchant Console')}</Title>
                </Body>
            </Header>
        );
    }


    render() {
        return ( 
            <Container style={styles.contentBackground}>
                {this._renderHeader()}
                <Content padder style={styles.contentBackground}>
                    <Card style={{marginVertical: responsiveHeight(1), paddingTop: responsiveHeight(3.5),marginHorizontal: responsiveWidth(1), alignSelf: 'center', alignItems:'center', elevation: 5}}>
                        <Row style={{marginHorizontal: responsiveWidth(1),height: responsiveHeight(12)}}>
                            <Col  style={{ alignItems: 'center', width: responsiveWidth(30)}} onPress={()=>{this.props.navigation.navigate('Transactions')}}>
                                <Icon rounded small name="ios-stats" size={responsiveHeight(4)} color="#673ab7" />
                                <Text style={homeStyle.text}>{I18n.t('Transactions')}</Text>
                            </Col>
                            <Col style={{ alignItems: 'center', width: responsiveWidth(30)}} onPress={()=>{this.props.navigation.navigate('Reports')}}>
                                <Icon rounded name="ios-document" size={responsiveHeight(4)} color="#673ab7"/>
                                <Text style={homeStyle.text}>{I18n.t('Reports')}</Text>
                            </Col>
                            <Col style={{ alignItems: 'center', width: responsiveWidth(30)}} onPress={()=>{this.props.navigation.navigate('Refund')}}>
                                <Icon rounded small name="ios-refresh" size={responsiveHeight(4)} color="#673ab7" />
                                <Text style={homeStyle.text}>{I18n.t("Refund")}</Text>
                            </Col>
                        </Row>
                        <Row style={{marginHorizontal: responsiveWidth(1), height: responsiveHeight(12)}}>
                            <Col  style={{ alignItems: 'center', width: responsiveWidth(30)}} onPress={()=>{this.props.navigation.navigate('Terminal')}}>
                                <Icon rounded small name="ios-barcode" size={responsiveHeight(4)} color="#673ab7" />
                                <Text style={homeStyle.text}>{I18n.t('QR/POS')}</Text>
                            </Col>
                            <Col style={{ alignItems: 'center', width: responsiveWidth(30)}} onPress={()=>{this.props.navigation.navigate('MapMyStore')}}>
                                <FontIcons rounded name="map-marker" size={responsiveHeight(4)} color="#673ab7"/>
                                <Text style={homeStyle.text}>{I18n.t('Map My Store')}</Text>
                            </Col>
                        </Row>
                    </Card>
                </Content>
            </Container>        
        );
    } 
}
const homeStyle = StyleSheet.create({
    text: { 
        fontFamily: 'Roboto',
        fontSize: responsiveHeight(2.5),
        textAlign: 'center'
    }
});


const mapState = ({locale}) => ({locale});

export default connect(mapState)(Home);