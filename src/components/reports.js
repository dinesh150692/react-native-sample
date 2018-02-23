import React, { Component } from "react";
import { View, StatusBar, Platform } from 'react-native';
import {
    Tab,
    Body,
    Icon,  
    Left,
    Tabs,
    Text,
    Right,
    Title,
    Button,
    Header,
    Content,
    Spinner,
    Container    
} from 'native-base';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import I18n from './i18n/i18n';
import ReportCard from './report-card';
import styles from '../Style';
class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            transaction : {
                labels : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                data :[6, 9, 8, 1, 6, 5, 4],
                stores : [
                    [ 
                        {name:'Koramangala', value:100},
                        {name:'JP Nagar', value:100},
                        {name:'Jaya Nagar', value:100},
                        {name:'Electronic City', value:100},
                        {name:'Hebbal', value:100},
                        {name:'Old Airport Road', value:100},
                        {name:'Bannerghatta Road', value:100},
                        {name:'BTM', value:100},
                        {name:'Koramanga', value:100},
                        {name:'JP Nag', value:100},
                        {name:'Jaya gar', value:100},
                        {name:'Eleronic City', value:100},
                    ],
                    [
                        {name:'Koramangala', value:10},
                        {name:'JP Nagar', value:10},
                        {name:'Jaya Nagar', value:10},
                        
                    ],
                    [
                        {name:'Koramangala', value:20},
                        {name:'JP Nagar', value:20},
                        {name:'Jaya Nagar', value:20},
                        {name:'Electronic City', value:20},
                        {name:'Hebbal', value:20},
                        {name:'Old Airport Road', value:20},
                        {name:'Bannerghatta Road', value:20},
                        {name:'BTM', value:20}
                    ],
                    [
                        {name:'Koramangala', value:20},
                        {name:'JP Nagar', value:20},
                        {name:'Jaya Nagar', value:20},
                        {name:'Electronic City', value:20},
                        {name:'Hebbal', value:20},
                        {name:'Old Airport Road', value:20},
                        {name:'Bannerghatta Road', value:20},
                        {name:'BTM', value:20}
                    ],
                    [
                        {name:'Koramangala', value:10},
                        {name:'JP Nagar', value:10},
                        {name:'Jaya Nagar', value:10},
                        {name:'Electronic City', value:10},
                        {name:'Hebbal', value:10},
                        {name:'Old Airport Road', value:10},
                        {name:'Bannerghatta Road', value:10},
                        {name:'BTM', value:10}
                    ],
                    [
                        {name:'Koramangala', value:20},
                        {name:'JP Nagar', value:20},
                        {name:'Jaya Nagar', value:20},
                        {name:'Electronic City', value:20},
                        {name:'Hebbal', value:20},
                        {name:'Old Airport Road', value:20},
                        {name:'Bannerghatta Road', value:20},
                        {name:'BTM', value:20}
                    ],
                    [
                        {name:'Koramangala', value:20},
                        {name:'JP Nagar', value:20},
                        {name:'Jaya Nagar', value:20},
                        {name:'Electronic City', value:20},
                        {name:'Hebbal', value:20},
                        {name:'Old Airport Road', value:20},
                        {name:'Bannerghatta Road', value:20},
                        {name:'BTM', value:20}
                    ],
                    [
                        {name:'Koramangala', value:10},
                        {name:'JP Nagar', value:10},
                        {name:'Jaya Nagar', value:10},
                        {name:'Electronic City', value:10},
                        {name:'Hebbal', value:10},
                        {name:'Old Airport Road', value:10},
                        {name:'Bannerghatta Road', value:10},
                        {name:'BTM', value:10}
                    ],
                ],
                instruments : [
                    [
                        {name:'CC', value:100},
                        {name:'DC', value:100},
                        {name:'POS', value:100},
                        {name:'Cash', value:100}
                    ],
                    [
                    ],
                    [
                        {name:'CC', value:10},
                        {name:'DC', value:10},
                        {name:'POS', value:10},
                        {name:'Cash', value:10}
                    ],
                    [
                        {name:'CC', value:20},
                        {name:'DC', value:20},
                        {name:'POS', value:20},
                        {name:'Cash', value:20}
                    ],
                    [
                        {name:'CC', value:10},
                        {name:'DC', value:10},
                        {name:'POS', value:10},
                        {name:'Cash', value:10}
                    ],
                    [
                        {name:'CC', value:10},
                        {name:'DC', value:10},
                        {name:'POS', value:10},
                        {name:'Cash', value:10}
                    ],
                    [
                        {name:'CC', value:20},
                        {name:'DC', value:20},
                        {name:'POS', value:20},
                        {name:'Cash', value:20}
                    ],
                    [
                        {name:'CC', value:10},
                        {name:'DC', value:10},
                        {name:'POS', value:10},
                        {name:'Cash', value:10}
                    ]
                ]
            },
            amount : {
                labels : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                data : [65, 59, 80, 81, 56, 55, 40],
                stores : [
                    [ 
                        {name:'Koramangala', value:100},
                        {name:'JP Nagar', value:100},
                        {name:'Jaya Nagar', value:100},
                        {name:'Electronic City', value:100},
                        {name:'Hebbal', value:100},
                        {name:'Old Airport Road', value:100},
                        {name:'Bannerghatta Road', value:100},
                        {name:'BTM', value:100},
                        {name:'Koramanga', value:100},
                        {name:'JP Nag', value:100},
                        {name:'Jaya gar', value:100},
                        {name:'Eleronic City', value:100},
                    ],
                    [
                        {name:'Koramangala', value:10},
                        {name:'JP Nagar', value:10},
                        {name:'Jaya Nagar', value:10},
                        {name:'Electronic City', value:10},
                        {name:'Hebbal', value:10},
                        {name:'Old Airport Road', value:10},
                        {name:'Bannerghatta Road', value:10},
                        {name:'BTM', value:10},
                    ],
                    [
                        {name:'Koramangala', value:20},
                        {name:'JP Nagar', value:20},
                        {name:'Jaya Nagar', value:20},
                        {name:'Electronic City', value:20},
                        {name:'Hebbal', value:20},
                        {name:'Old Airport Road', value:20},
                        {name:'Bannerghatta Road', value:20},
                        {name:'BTM', value:20}
                    ],
                    [
                        {name:'Koramangala', value:20},
                        {name:'JP Nagar', value:20},
                        {name:'Jaya Nagar', value:20},
                        {name:'Electronic City', value:20},
                        {name:'Hebbal', value:20},
                        {name:'Old Airport Road', value:20},
                        {name:'Bannerghatta Road', value:20},
                        {name:'BTM', value:20}
                    ],
                    [
                        {name:'Koramangala', value:10},
                        {name:'JP Nagar', value:10},
                        {name:'Jaya Nagar', value:10},
                        {name:'Electronic City', value:10},
                        {name:'Hebbal', value:10},
                        {name:'Old Airport Road', value:10},
                        {name:'Bannerghatta Road', value:10},
                        {name:'BTM', value:10}
                    ],
                    [
                        {name:'Koramangala', value:20},
                        {name:'JP Nagar', value:20},
                        {name:'Jaya Nagar', value:20},
                        {name:'Electronic City', value:20},
                        {name:'Hebbal', value:20},
                        {name:'Old Airport Road', value:20},
                        {name:'Bannerghatta Road', value:20},
                        {name:'BTM', value:20}
                    ],
                    [
                        {name:'Koramangala', value:20},
                        {name:'JP Nagar', value:20},
                        {name:'Jaya Nagar', value:20},
                        {name:'Electronic City', value:20},
                        {name:'Hebbal', value:20},
                        {name:'Old Airport Road', value:20},
                        {name:'Bannerghatta Road', value:20},
                        {name:'BTM', value:20}
                    ],
                    [
                        {name:'Koramangala', value:10},
                        {name:'JP Nagar', value:10},
                        {name:'Jaya Nagar', value:10},
                        {name:'Electronic City', value:10},
                        {name:'Hebbal', value:10},
                        {name:'Old Airport Road', value:10},
                        {name:'Bannerghatta Road', value:10},
                        {name:'BTM', value:10}
                    ],
                ],
                instruments : [
                    [
                        {name:'CC', value:100},
                        {name:'DC', value:100},
                        {name:'POS', value:100},
                        {name:'Cash', value:100}
                    ],
                    [
                    ],
                    [
                        {name:'CC', value:10},
                        {name:'DC', value:10},
                        {name:'POS', value:10},
                        {name:'Cash', value:10}
                    ],
                    [
                        {name:'CC', value:20},
                        {name:'DC', value:20},
                        {name:'POS', value:20},
                        {name:'Cash', value:20}
                    ],
                    [
                        {name:'CC', value:10},
                        {name:'DC', value:10},
                        {name:'POS', value:10},
                        {name:'Cash', value:10}
                    ],
                    [
                        {name:'CC', value:10},
                        {name:'DC', value:10},
                        {name:'POS', value:10},
                        {name:'Cash', value:10}
                    ],
                    [
                        {name:'CC', value:20},
                        {name:'DC', value:20},
                        {name:'POS', value:20},
                        {name:'Cash', value:20}
                    ],
                    [
                        {name:'CC', value:10},
                        {name:'DC', value:10},
                        {name:'POS', value:10},
                        {name:'Cash', value:10}
                    ]
                ]
            } 
        }
    }
    
    componentDidCatch(error, info){
        console.log(error);
        console.log(info);
    }
    
    componentWillMount() {
        if(this.state.transaction.stores.length > 0){
            this.setState({loading: true});
            setTimeout(() => {
                this.setState({loading: false});
            }, 5000);
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
                    <Title style={[styles.fontsize,{ alignItems: 'center'}]}>{I18n.t('Reports')}</Title>
                </Body>
            </Header>
        );
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
    
    _content(){
        return ( 
            <Container>
                {/* {this._renderHeader()} */}
                <Tabs initialPage={0} tabBarUnderlineStyle={{opacity:0}}>
                    <Tab heading={I18n.t('Transactions')} tabStyle={styles.tabStyle} activeTabStyle={styles.activeTabStyle} textStyle={styles.tabTextStyle} activeTextStyle={styles.activeTabTextStyle}>
                        <ReportCard name="Transaction" list={this.state.transaction}/>
                    </Tab>
                    <Tab heading={I18n.t('Amount')} tabStyle={styles.tabStyle} activeTabStyle={styles.activeTabStyle} textStyle={styles.tabTextStyle} activeTextStyle={styles.activeTabTextStyle}>
                        <ReportCard name="Amount" list={this.state.amount}/>
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
  
export default Reports;
