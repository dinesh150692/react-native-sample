import React, { Component } from "react";
import { View, FlatList, StyleSheet, StatusBar, Platform, RefreshControl } from 'react-native';
import I18n from './i18n/i18n';
import { Grid, Row, Col } from 'react-native-easy-grid';
import Modal from "react-native-modal";
import Moment from 'react-moment';
import moment from 'moment';
import {
    Body,Card,Icon,
    Left,Text,Title,Item,
    Right,Button,Header,Input,
    Content,Spinner,CardItem,
    Container, SwipeRow
} from 'native-base';
import {
    responsiveWidth,
    responsiveHeight,
    responsiveFontSize
} from 'react-native-responsive-dimensions';
import styles from '../Style';

class Refund extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment(),
            loading: true,
            loadingMore: false,
            isVisible: false,
            removeIndex: '',
            modalType: '',
            editRefund: true,
            refundAmount: 0,
            fullAmount: 0,
            refreshing: false,
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
    }
    
    componentDidMount() {      
        setTimeout(() => {
            this.setState({loading: false});
        },2000);
    }
    
    _renderCard = ({item, index}) => (
        <Card style={{ paddingTop: responsiveHeight(1)}} >
            <SwipeRow noBorder
                style={{ width: responsiveWidth(98)}}
                leftOpenValue={100}
                rightOpenValue={-100}
                left={
                    <Button warning onPress={() =>{
                        console.log(item,index);
                        this.setState({
                            modalType: 'Partial',
                            fullAmount: item.amount,
                            refundAmount: '',
                            editRefund: true,
                            isVisible: true,
                            removeIndex: index
                        });
                    }}>
                        <Text>Partial Refund</Text>
                    </Button>
                }
                body={
                    <Row style={{paddingHorizontal: responsiveWidth(1)}}>
                        <Col>
                            <Row style={refundStyle.cardRow}>
                                <Text style={refundStyle.cardTextAmount}>₹ {item.amount}</Text>   
                            </Row>
                            <Row style={refundStyle.cardRow}>
                                <Moment element={Text} style={refundStyle.cardTextDate} format="DD/MMM/YYYY">{item.date}</Moment> 
                            </Row>    
                        </Col>
                        <Col>
                            <Row style={refundStyle.cardRowEnd}>
                                <Text style={refundStyle.cardText}>{item.mobileNumber.substring(0,2)}xxxxxx{item.mobileNumber.substring(8,10)}</Text>   
                            </Row> 
                            <Row style={refundStyle.cardRowEnd}>
                                <Text style={refundStyle.cardText}>{item.terminal}</Text>   
                            </Row>
                        </Col>
                    </Row>                    
                }
                right={
                    <Button danger style={{alignSelf: 'center'}}
                        onPress={() => {
                            console.log(item,index);
                            this.setState({
                                modalType: 'Full',
                                fullAmount: item.amount,
                                refundAmount: item.amount,
                                editRefund: false,
                                isVisible: true,
                                removeIndex: index
                        });
                    }}>
                        <Text>Full Refund</Text>
                    </Button>
                }
            />
        </Card>    
    );
    
    _renderRefundModal(){
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
                <Text style={{fontSize: responsiveHeight(3)}}>{this.state.modalType} {I18n.t("Refund")}</Text>
                <Item inlineLabel style={{marginTop: responsiveHeight(3), borderBottomColor: '#673ab7'}}>
                    <Input 
                        value={`${this.state.refundAmount}`}
                        placeholder={I18n.t("Amount")}
                        autoFocus={true}
                        editable={this.state.editRefund}
                        placeholderTextColor={'gray'}
                        keyboardType={'numeric'}
                        returnKeyType={Platform.OS=='ios'? 'done' : 'next'}
                        onChangeText={(text) => {
                            if(text > 0 && text < this.state.fullAmount){
                                this.setState({refundAmount: text});
                            }else if(text >= this.state.fullAmount){
                                this.setState({refundAmount: this.state.fullAmount});
                            }
                        }}
                    />
                </Item>
                <Item style={{marginTop: responsiveHeight(3), borderBottomWidth: 0, alignSelf: 'flex-end'}}>
                    <Button small transparent onPress={() => {this.setState({isVisible: false, refundAmount: '', fullAmount: '', editRefund: true})}}>
                        <Text style={{ color: '#673ab7', fontWeight: 'bold',fontSize: responsiveHeight(2.5)}}>{I18n.t("Cancel")}</Text>
                    </Button>
                    <Button small transparent disabled={this.state.refundAmount <= this.state.fullAmount ? false: true} style={{backgroundColor: 'transparent'}}>
                        <Text style={{ color: this.state.refundAmount <= this.state.fullAmount ?'#673ab7' : 'lightgray', fontWeight: 'bold', fontSize: responsiveHeight(2.5)}}>
                            {I18n.t("Confirm")}
                        </Text>
                    </Button>
                </Item>
            </View>
            </Modal>
        );
    }

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
               <View style={styles.contentBackground} scrollEnabled={false}>           
                    <FlatList
                        automaticallyAdjustContentInsets={false}
                        data = {this.state.transactionsList}
                        extraData = {this.state}
                        keyExtractor = {(item) => item.date}
                        renderItem = {this._renderCard}
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
                        onEndReachedThreshold={1}
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
                    <Title style={[styles.fontsize,{ alignItems: 'center'}]}>{I18n.t('Refund')}</Title>
                </Body>
            </Header>
        );
    }
    
    render() {
        return ( 
            <Container style={styles.contentBackground}>
               {/* {this._renderHeader()} */}
                {this._renderPage()}
                {this._renderRefundModal()}
            </Container>        
        );
    } 
}

const refundStyle = StyleSheet.create({
    row: { 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems:'center',
        alignSelf: 'center'
    },
    rowText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: responsiveFontSize(2)
    },
    dateText: {
        paddingTop: responsiveHeight(4),
        fontSize: responsiveFontSize(1.3),
        color: 'white',
        fontWeight: 'bold'
    },
    cardRow: { 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems:'flex-start',
        alignSelf: 'flex-start'
    },
    cardRowEnd: { 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems:'flex-start',
        alignSelf: 'flex-end'
    },
    cardText:{
        color:'black',
        fontSize: responsiveFontSize(1.5),
        paddingTop: responsiveWidth(0.3),
        paddingBottom: responsiveWidth(0.3)
    },
    cardTextDate:{
        color:'rgba(0,0,0, 0.8)',
        fontSize: responsiveFontSize(1.3),
        paddingTop: responsiveWidth(0.4)
    },
    cardTextAmount:{
        color:'black',
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        paddingBottom: responsiveWidth(0.5)
    }
});

const modalStyle = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        margin: responsiveWidth(3), 
        top: -responsiveHeight(5)
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

export default Refund;