import React, {Component} from "react";
import { QRScannerView } from './qrscanner';
import { Row, Col} from 'react-native-easy-grid';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { View, FlatList, StyleSheet, StatusBar, Platform } from 'react-native'
import {
    Tab,Body,Icon,
    Item,Left,Tabs,Card,
    Text,Label,Right,Toast,
    Title,Button,Header,Picker,
    Content,Spinner,CardItem,CheckBox,
    ListItem,Subtitle,Container    
} from 'native-base';
import I18n from './i18n/i18n';
import styles from '../Style';
import Modal from "react-native-modal";

class Terminal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            scan: true,
            isVisible: false,
            filterSelected: 'Today',
            filterList: ['Today', 'Yesterday','Week', 'Month', 'All'],
            fetchingQRData: false,
            allQRList : [
                { 'amount': 100,'terminal': 'q123444', 'transaction': 2, 'terminalName': 'Terminal 1', 'storeName': 'Koramangala'},
                { 'amount': 100,  'terminal': 'q123445', 'transaction': 3, 'terminalName': 'Terminal 2', 'storeName': 'BTM'},
                { 'amount': 23500,  'terminal': 'q123446', 'transaction': 4, 'terminalName': 'Terminal 3', 'storeName': 'Indiranagar'},
                { 'amount': 100,'terminal': 'q123447', 'transaction': 2, 'terminalName': 'Terminal 4', 'storeName': 'Electronic City'},
                { 'amount': 100,  'terminal': 'q123448', 'transaction': 3, 'terminalName': 'Terminal 5', 'storeName': 'Sony Signal'},
                { 'amount': 23500,  'terminal': 'q123449', 'transaction': 4, 'terminalName': 'Terminal 6', 'storeName': 'Hebbal'},
                { 'amount': 23500,  'terminal': 'q123450', 'transaction': 4, 'terminalName': 'Terminal 3', 'storeName': 'Indiranagar'},
            ],
            qrDataList : [
                {'name': 'Today', 'amount': 100, 'transaction': 2},
                {'name': 'Yesterday', 'amount': 300, 'transaction': 2},
                {'name': 'Week', 'amount': 1000, 'transaction': 5},
                {'name': 'Month', 'amount': 4000, 'transaction': 20},
                {'name': 'All', 'amount': 8000, 'transaction': 50},
            ],
            qrData : {'terminal': 'q123444', 'terminalName': 'Terminal 1', 'storeName': 'Koramangala'}
        
        }
    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({loading: false});
        },2000);
    }
    
    _loader(){
        return (
            <Container>
                {/* {this._renderHeader()} */}
                <View style = {styles.contentBackground}>
                    <Spinner style={styles.spinner} color='#673ab7' />
                </View>
          </Container>
        );
    }
 
    barcodeReceived(e) {
        Toast.show('Type: ' + e.type + '\nData: ' + e.data);
    }

    _renderTitleBar(){
        // return(
        //     <Text
        //         style={{color:'white',textAlignVertical:'center', textAlign:'center',font:20,padding:12}}
        //     >Here is title bar</Text>
        // );
        return ;
    }

    _renderMenu() {
        return (
            <View style={{ flex: 1, justifyContent:'center', alignItems:'center', backgroundColor: 'black', padding: responsiveWidth(2) }}>
                <Button
                    small 
                    onPress={()=> this.fetchData()}
                    style={{ justifyContent: 'flex-end',alignSelf: 'center', backgroundColor:'white',padding:10,marginTop:20}}
                >
                    <Text  style={{ color:'black',textAlign:'center',fontSize:15}}>[ {I18n.t("Done")} ]</Text>
                </Button>
            </View>
        );
    
    }

    barcodeReceived(e) {
        Toast.show('Type: ' + e.type + '\nData: ' + e.data);
    }
    
    fetchData(){
        this.setState({
            scan: false,
            fetchingQRData: true
        });
        setTimeout(() => {
            this.setState({fetchingQRData: false});
        }, 2500);
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
                    <Title style={[styles.fontsize,{ alignItems: 'center'}]}>{I18n.t('QR/POS')}</Title>
                </Body>
            </Header>
        );
    }

    _renderScanner(){
        return (
            <View style={terminalStyle.container}>
                <Row size={0.9}>
                    <QRScannerView
                        hintText={''}
                        rectWidth={responsiveWidth(80)}
                        rectHeight={responsiveHeight(50)}
                        scanBarColor={'#673ab7'}
                        maskColor={"black"}
                        cornerColor={'#673ab7'}
                        onScanResultReceived={this.barcodeReceived.bind(this)}
                        renderTopBarView={() => this._renderTitleBar()}
                        renderBottomMenuView={() => {return ;}}
                    />
                </Row>
                <Row size={0.1}>
                    {this._renderMenu()}
                </Row>
            </View>
        );
    }
    
    _renderScanQRCard = ({item}) => (
        <Card style={terminalStyle.card}>
            <Text style={terminalStyle.cardText}>{item.name}</Text>
            <CardItem>
                <Col>
                    <Row style={terminalStyle.cardRow}>
                        <Text style={terminalStyle.cardTextAmount}>{I18n.t("Transactions")}</Text>   
                    </Row>
                    <Row style={terminalStyle.cardRow}>
                        <Text style={terminalStyle.cardTextAmount}>{item.transaction}</Text>   
                    </Row>
                </Col>
                <Col>
                    <Row style={terminalStyle.cardRowEnd}>
                        <Text style={terminalStyle.cardTextAmount}>{I18n.t("Collection")}</Text>   
                    </Row>
                    <Row style={terminalStyle.cardRowEnd}>
                        <Text style={terminalStyle.cardTextAmount}>₹ {item.amount}</Text>   
                    </Row> 
                </Col>
            </CardItem>
        </Card>
    );

    _renderAllQRCard = ({item}) => (
        <Card style={terminalStyle.card}>
            <Label style={[terminalStyle.cardText,{paddingLeft: responsiveWidth(3),alignSelf: 'flex-start'}]}>{item.terminal.toUpperCase()}
                <Label style={[terminalStyle.cardText,{paddingLeft: responsiveWidth(2),fontSize: responsiveFontSize(1.4),alignSelf: 'flex-start'}]}>
                    -{item.terminalName},{item.storeName}
                </Label>
            </Label>
            <CardItem>
                <Col>
                    <Row style={terminalStyle.cardRow}>
                        <Text style={terminalStyle.cardTextAmount}>Transactions</Text>   
                    </Row>
                    <Row style={terminalStyle.cardRow}>
                        <Text style={terminalStyle.cardTextAmount}>{item.transaction}</Text>   
                    </Row>
                </Col>
                <Col>
                    <Row style={terminalStyle.cardRowEnd}>
                        <Text style={terminalStyle.cardTextAmount}>Collection</Text>   
                    </Row>
                    <Row style={terminalStyle.cardRowEnd}>
                        <Text style={terminalStyle.cardTextAmount}>₹ {item.amount}</Text>   
                    </Row> 
                </Col>
            </CardItem>
        </Card>
    );

    _renderQRData(){
        if(this.state.qrDataList.length > 0){
            return (
                <Content scrollEnabled={true}>
                    { this.state.qrData.terminal && this.state.qrData.storeName &&
                        <View>
                        <Row style={terminalStyle.headerRow}>
                            <Title style={[terminalStyle.cardText,{paddingLeft: responsiveWidth(3)}]}>{this.state.qrData.terminal.toUpperCase()}
                                <Subtitle style={[terminalStyle.cardText,{fontSize: responsiveFontSize(1.4)}]}>
                                    -{this.state.qrData.terminalName},{this.state.qrData.storeName}
                                </Subtitle>
                            </Title>
                            
                            <Col size={1}>
                            </Col>
                            <Col size={0.6}>
                                <Text
                                    onPress= {() => this.setState({scan: true})} 
                                    style={terminalStyle.scanColor}>
                                    Scan Again
                                </Text>
                            </Col>
                        </Row>
                    </View>
                    }
                    <FlatList
                    automaticallyAdjustContentInsets={false}
                    data = {this.state.qrDataList}
                    extraData = {this.state}
                    keyExtractor = {(item) => item.name}
                    contentInset={{bottom:49}}
                    renderItem = {this._renderScanQRCard}
                />
                </Content>
            );
        }else {
            return;
        }
    }

    _renderPicker(){
        return (
            <Modal
                isVisible={true}
                animationType={'slide'}
                backdropColor="grey"
                backdropOpacity={0.01}
                style={{justifyContent: "flex-end",margin: 0}}
            >
            <View style={modalStyle.modalContent}>
                <Text onPress={() => {this.setState({isVisible: false})}}>x</Text>
                <Text style={{alignSelf: 'center', fontSize: responsiveHeight(3), fontWeight: 'bold'}}>Select a filter</Text>
                        {/* <ListItem >
                            <Left><Text>Week</Text></Left>
                            <Right>
                                <CheckBox 
                                    checked={this.state.filterSelected == 'Week'}
                                />
                            </Right>
                        </ListItem> */}
                        <FlatList
                        automaticallyAdjustContentInsets={true}
                        data = {this.state.filterList}
                        extraData = {this.state.filterSelected}
                        keyExtractor = {(item) => item}
                        renderItem = {({item}) => 
                            <ListItem noBorder>
                                <CheckBox 
                                        checked={this.state.filterSelected == item ? true : false}
                                        onPress = {()=> this.setState({filterSelected: item})}
                                />
                                <Text style={{paddingLeft: responsiveWidth(4)}}>{item}</Text>
                            </ListItem>
                        }
                        
                    />
            </View>
            </Modal>
        );
    }

    _renderAllQRPOS(){
        if(this.state.allQRList.length > 0){
            return (
                <Content scrollEnabled={true}>
                    <View style={{flexDirection: 'row', justifyContent:'flex-end', paddingVertical: responsiveHeight(1)}}>
                        <Right>
                            <Button style={terminalStyle.noPadding} small rounded light onPress={()=> {this.setState({ isVisible: true})}}>
                                <Text style={terminalStyle.noPadding}>{this.state.filterSelected}</Text>
                                <Icon name="ios-arrow-down" />
                            </Button>
                        </Right> 
                    </View>
                    <View style={{flex:1}}>
                    <FlatList
                        automaticallyAdjustContentInsets={false}
                        data = {this.state.allQRList}
                        extraData = {this.state}
                        keyExtractor = {(item) => item.terminal}
                        contentInset={{bottom:49}}
                        renderItem = {this._renderAllQRCard}
                    />
                    </View>
                    {this.state.isVisible && this._renderPicker()}
                 </Content>
            );
        }else {
            return (
                <Content scrollEnabled={true}>
                    <View style={{flexDirection: 'row', justifyContent:'flex-end', paddingVertical: responsiveHeight(1)}}>
                        <Right>
                            <Button style={terminalStyle.noPadding} small rounded light onPress={()=> {this._renderPicker()}}>
                                <Text style={terminalStyle.noPadding}>{this.state.filterSelected}</Text>
                                <Icon name="ios-arrow-down" />
                            </Button>
                        </Right>
                    </View>
                    <CardItem>
                        <Title>No Data Available</Title>
                    </CardItem>
                    {this.state.isVisible && this._renderPicker()}
                </Content>
            )
        }
        
    }

    _content(){
        return ( 
            <Container style={styles.contentBackground}>
                {/* {this._renderHeader()} */}
                <Tabs initialPage={0} tabBarUnderlineStyle={{opacity:0}}>
                    <Tab  heading="All QR/POS" tabStyle={styles.tabStyle} activeTabStyle={styles.activeTabStyle} textStyle={styles.tabTextStyle} activeTextStyle={styles.activeTabTextStyle}>
                    <Container>
                            <View style={{flex:1}}>
                                {this._renderAllQRPOS()}
                            </View>
                        </Container>
                    </Tab>
                    <Tab  heading="SCAN QR" tabStyle={styles.tabStyle} activeTabStyle={styles.activeTabStyle} textStyle={styles.tabTextStyle} activeTextStyle={styles.activeTabTextStyle}>
                        <Container>
                            <View style={{flex:1}}>
                                {this.state.scan && this._renderScanner()}                            
                                {this.state.fetchingQRData  &&
                                    <View style = {styles.contentBackground}>
                                        <Spinner style={styles.spinner} color='#673ab7' />
                                    </View>
                                }
                                {!this.state.scan && !this.state.fetchingQRData && this._renderQRData()}
                            </View>
                        </Container>
                    </Tab>
                </Tabs>
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

  
const terminalStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: responsiveHeight(80)
    },
    card : {
        borderRadius: 1, 
        borderColor: 'white', 
        shadowColor:'black', 
        shadowRadius: 5, 
        shadowOffset:{width: responsiveWidth(1), height:responsiveHeight(0.8)}
    },
    cardRow: { 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems:'center',
        alignSelf: 'center'
    },
    cardRowEnd: { 
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        alignItems:'center',
        alignSelf: 'center'
    },
    cardText:{
        color:'black',
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        alignSelf:'center',
    },
    headerRow:{
       marginVertical: responsiveHeight(2),
       padding: responsiveWidth(1)
    },
    cardTextAmount:{
        color:'black',
        fontSize: responsiveFontSize(1.9),
    },
    scanColor: {
        color: '#673ab7',
        fontSize: responsiveHeight(1.3),
        fontWeight: 'bold',
        padding: responsiveWidth(1)
    },
    noPadding:{
        margin: 0,
        paddingLeft: responsiveWidth(0.5),
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0
    },
    qrImageContainerViewPort: {
        flex: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0)'
    },
    qrViewPort: {
        width: responsiveWidth(50),
        height: responsiveWidth(50),
        backgroundColor: 'rgba(0,0,0,0)',
        opacity: 1,
        borderColor: '#000',
        borderRightWidth: 2,
        borderLeftWidth: 2,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderRadius: 5
      },
});

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
export default Terminal;
