import React, { Component } from 'react';
import { View, FlatList, StyleSheet,StatusBar, Platform, NetInfo, BackHandler, RefreshControl } from 'react-native';
import {
    Body,
    Card,
    Icon,
    Left,
    Text,
    Title,
    Right,
    Button,
    Header,
    Content,
    Spinner,
    CardItem,
    Container
} from 'native-base';
import {
    responsiveWidth,
    responsiveHeight,
    responsiveFontSize
} from 'react-native-responsive-dimensions';
import I18n from './i18n/i18n';
import { Grid, Row, Col } from 'react-native-easy-grid';
import Moment from 'react-moment';
import moment from 'moment';
import styles from '../Style';

class Transactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalAmount: 23400,
            totalTransaction: 23,
            date: moment(),
            loading: true,
            loadingMore: false,
            refreshing: false,
            connectionInfo: '',
            onEndReachedCalledDuringMomentum: true,
            transactionsList : [
                { 'mobileNumber':'9999999999','amount': 100, 'date': '2017-12-12T23:30:52.123Z', 'terminal': 'q123444'},
                { 'mobileNumber':'9999999999','amount': 100, 'date': '2016-12-10T23:30:52.123Z', 'terminal': 'q123444'},
                { 'mobileNumber':'9999999999','amount': 2350, 'date': '2015-11-13T23:30:52.123Z', 'terminal': 'q123444'},
                { 'mobileNumber':'9999999999','amount': 500, 'date': '2014-10-13T23:30:52.123Z', 'terminal': 'q123444'},
                { 'mobileNumber':'9999999999','amount': 100, 'date': '2013-09-13T23:30:52.123Z', 'terminal': 'q12343'},
                { 'mobileNumber':'9999999999','amount': 100, 'date': '2012-09-13T23:30:52.123Z', 'terminal': 'q123444'},
                { 'mobileNumber':'9999999999','amount': 100, 'date': '2011-09-13T23:30:52.123Z', 'terminal': 'q12343'},
                { 'mobileNumber':'9999999999','amount': 100, 'date': '2010-09-13T23:30:52.123Z', 'terminal': 'q123444'},
                { 'mobileNumber':'9999999999','amount': 100, 'date': '2009-09-13T23:30:52.123Z', 'terminal': 'q12343'},
                { 'mobileNumber':'9999999999','amount': 100, 'date': '2008-09-13T23:30:52.123Z', 'terminal': 'q123444'}
            ]
        }
        this._handleConnectionInfoChange = this._handleConnectionInfoChange.bind(this);
    }
    componentDidCatch(error, info){
        console.log(error);
        console.log(info);
    }
    
    componentDidMount() {      
        setTimeout(() => {
            this.setState({loading: false});
        },2000);
        NetInfo.addEventListener(
            'connectionChange',
            this._handleConnectionInfoChange
        );
        // this._navListener = this.props.navigation.addListener('didFocus', () => {
        //     console.log('In Focus');
        //     StatusBar.setBarStyle('light-content', true);
        //     if(Platform.OS == 'android'){
        //         StatusBar.setBackgroundColor('#62429b',true);
        //     } 
        // });
    }
    
    componentWillUnmount(){
        //this._navListener.remove();
        NetInfo.removeEventListener(
            'connectionChange',
            this._handleConnectionInfoChange
        );
        
    }
      
    _handleConnectionInfoChange(connectionInfo) {
        this.setState({
            connectionInfo,
            },  
            this.state.connectionInfo.type == "none"?
            this.setState({isConnectionAvailable:false}):
            this.setState({isConnectionAvailable:true})
        );
    }
   
    _renderCard = ({item}) => (
        <Card style={{borderRadius: 10, borderColor: 'white', shadowColor:'#673ab7', shadowRadius: 55, shadowOffset:{width: responsiveWidth(1.2), height:responsiveHeight(1.5)}}}>
                <CardItem >
                    <Col>
                        <Row style={transactionStyle.cardRow}>
                            <Text style={transactionStyle.cardTextAmount}>₹ {item.amount}</Text>   
                        </Row>
                        <Row style={transactionStyle.cardRow}>
                            <Text style={transactionStyle.cardText}>{item.terminal}</Text>   
                        </Row>
                        <Row style={transactionStyle.cardRow}>
                            <Moment element={Text} style={transactionStyle.cardTextDate} format="DD/MMM/YYYY">{item.date}</Moment> 
                        </Row>    
                    </Col>
                    <Col>
                        <Row style={transactionStyle.cardRowEnd}>
                            <Text style={transactionStyle.cardText}>{item.mobileNumber.substring(0,2)}xxxxxx{item.mobileNumber.substring(8,10)}</Text>   
                        </Row> 
                    </Col>
                </CardItem>
        </Card>    
    );
    
    loadMore(){
        if (!this.state.onEndReachedCalledDuringMomentum && !this.state.refreshing) {
            this.setState({loadingMore: true});
            this.setState({onEndReachedCalledDuringMomentum : true});
            setTimeout(() => {
                this.setState({
                    loadingMore: false,
                    transactionsList : [
                        { 'mobileNumber':'9999999999','amount': 100, 'date': '2011-12-12T23:30:52.123Z', 'terminal': 'q123444'},
                        { 'mobileNumber':'9999999999','amount': 100, 'date': '2012-12-10T23:30:52.123Z', 'terminal': 'q123444'},
                        { 'mobileNumber':'9999999999','amount': 100, 'date': '2013-09-13T23:30:52.123Z', 'terminal': 'q123444'}
                    ]
                });
            }, 5000);
            
        }
    }
    
    refresh(){
        if(!this.state.loadingMore){
            this.setState({
                refreshing: true,
            });
            setTimeout(() => {
                this.setState({
                    refreshing: false,
                    onEndReachedCalledDuringMomentum : true ,
                    transactionsList : [
                        { 'mobileNumber':'9999999999','amount': 100, 'date': '2011-12-12T23:30:52.123Z', 'terminal': 'q123444'},
                        { 'mobileNumber':'9999999999','amount': 100, 'date': '2012-12-10T23:30:52.123Z', 'terminal': 'q123444'},
                        { 'mobileNumber':'9999999999','amount': 100, 'date': '2013-09-13T23:30:52.123Z', 'terminal': 'q123444'}
                    ]
                });
        
            }, 5000);
        }
    }
    
    _renderPage(){
        if(this.state.loading){
            return (
                <View style = {styles.contentBackground}>
                    <Spinner style={styles.spinner} color='#673ab7' />
                </View>
            );
        }else {
            return(
               <View style={styles.contentBackground}>
                    <Header  iosBarStyle="light-content" androidStatusBarColor="#62429b"  style={styles.background}>
                        <Col>
                            <Row style={transactionStyle.row}><Text style={transactionStyle.rowText}>{I18n.t('Total Amount')}</Text></Row>
                            <Row style={transactionStyle.row}>
                                { this.state.totalAmount > 0 && <Text style={transactionStyle.rowText}>₹ {this.state.totalAmount}</Text>}
                                { this.state.totalAmount <= 0 && <Text style={transactionStyle.rowText}>--</Text> }
                            </Row>    
                        </Col>
                        <Col>
                            <Body>
                                <Row>
                                    <Moment element={Text} style={transactionStyle.dateText} format="DD/MMM/YYYY">{this.state.date}</Moment>
                                </Row>
                            </Body>
                        </Col>
                        <Col>
                            <Row style={transactionStyle.row}><Text style={transactionStyle.rowText}>{I18n.t('Transactions')}</Text></Row>
                            <Row style={transactionStyle.row}>
                                { this.state.totalTransaction > 0 && <Text style={transactionStyle.rowText}>{this.state.totalTransaction}</Text>}
                                { this.state.totalTransaction <= 0 && <Text style={transactionStyle.rowText}>--</Text> }
                            </Row> 
                        </Col>
                    </Header>           
                    <FlatList
                        automaticallyAdjustContentInsets={false}
                        data = {this.state.transactionsList}
                        extraData = {this.state}
                        keyExtractor = {(item) => item.date}
                        contentInset={{bottom:49}}
                        renderItem = {this._renderCard}
                        //refreshing={this.state.refreshing}
                        //onRefresh={() => {this.refresh()}}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this.refresh.bind(this)}
                                title="Pull to refresh"
                                tintColor="#673ab7"
                                titleColor="#673ab7"
                                progressBackgroundColor="#673ab7"
                                colors={['white']}
                            />
                          }
                       
                        onEndReached={() => {this.loadMore()}}
                        onEndReachedThreshold={0.3}
                        onMomentumScrollBegin={() => { this.setState({onEndReachedCalledDuringMomentum : false });}}
                    />
                    {this.state.loadingMore && <View style={{position: 'absolute',left: 0,right: 0,bottom: 0,height: 60,}}><Spinner color='#673ab7'/></View>}
                </View>
            );
        }
    }

    _renderHeader(){
        return (
            <Header iosBarStyle="light-content" androidStatusBarColor="#62429b" style={styles.background}>
                <Left>
                    <Button transparent onPress={() => {this.props.navigation.goBack();}}>
                        <Icon android='md-arrow-back' ios="ios-arrow-back" style={styles.header} />
                    </Button>
                </Left> 
                <Body>
                    <Title style={[styles.fontsize,{ alignItems: 'center'}]}>{I18n.t('Transactions')}</Title>
                </Body>
            </Header>
        );
    }
    
    render() {
        return ( 
            <Container style={styles.contentBackground}>
               {/* {this._renderHeader()} */}
                {this._renderPage()}
            </Container>        
        );
    } 
}

const transactionStyle = StyleSheet.create({
    row: { 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems:'center',
        alignSelf: 'center'
    },
    rowText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: responsiveFontSize(2),
        fontFamily: 'Roboto'
    },
    dateText: {
        paddingTop: responsiveHeight(4),
        fontSize: responsiveFontSize(1.3),
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Roboto'
    },
    cardRow: { 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems:'flex-start',
        alignSelf: 'flex-start'
    },
    cardRowEnd: { 
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        alignItems:'flex-start',
        alignSelf: 'flex-end'
    },
    cardText:{
        color:'#673ab7',
        fontSize: responsiveFontSize(1.5),
        paddingTop: responsiveWidth(0.3),
        paddingBottom: responsiveWidth(0.3),
        fontFamily: 'Roboto'
    },
    cardTextDate:{
        color:'rgba(108, 58, 183, 0.8)',
        fontSize: responsiveFontSize(1.3),
        paddingTop: responsiveWidth(0.4),
        fontFamily: 'Roboto'
    },
    cardTextAmount:{
        color:'#673ab7',
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        paddingBottom: responsiveWidth(0.5),
        fontFamily: 'Roboto'
    }
});
export default Transactions;