import React, {
    Component
} from "react";
import { Alert, ScrollView, View, FlatList, StyleSheet, Dimensions } from 'react-native';
import {
    Body,
    Icon, 
    Left,
    List,
    Text,
    Right,
    Title,
    Button,
    Header,
    Content,
    Spinner,
    ListItem,
    Container, 
} from 'native-base';
import {
    responsiveWidth,
    responsiveHeight,
    responsiveFontSize
} from 'react-native-responsive-dimensions';
import { Grid, Row, Col } from 'react-native-easy-grid';
import styles from '../Style';
import Chart from './chart';
import I18n from './i18n/i18n';

class ReportCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            activeLabel: '',
            activeIndex: 0,
            offset: 4,
            moreStoresData: true,
        }
        this.updateActiveLabel = this.updateActiveLabel.bind(this);
    }
    
    componentDidMount(){
        if(this.props.list){
            this.setActiveLabel();
            this.setState({loading: false});
        }
    }

    componentWillReceiveProps(nextProps) {
		if( nextProps.list.labels !== this.props.list.labels
            || nextProps.list.data !== this.props.list.data 
            || nextProps.list.stores !== this.props.list.stores
            || nextProps.list.instruments !== this.props.list.instruments){
            this.setState({
                activeIndex: 0,
                offset: 4
            });
		}
    }

    updateActiveLabel = (value) => {
        var index = parseInt(value);
        if(value >= 0 && value <= this.props.list.stores.length){
            this.setState({
                activeLabel: '( ' + this.props.list.labels[index] + ' )',
                activeIndex: index+1,
            },this._hideData());
        }
    }

    setActiveLabel(){
        if(this.props.list.labels.length > 1){
            var len = this.props.list.labels.length;
           this.setState({
               activeLabel : '(' + this.props.list.labels[0] + '-' + this.props.list.labels[len-1] + ')'
           })
        }else if(this.props.list.labels.length == 1) {
           this.setState({
               activeLabel : '(' + this.props.list.labels[0] + ')'
           })
        }else {
           this.setState({
               activeLabel : ''
           })
        }
        this.setState({offset: 4});
    }
    
    refreshChart(){
        this.setActiveLabel();
        this.setState({
           activeIndex: 0,
           offset: 4
        });   
    }

    _loadMore(){
        var counter = this.state.offset;
        var len = this.props.list.stores[this.state.activeIndex].length;
           if((counter+4) < len){
            this.setState({
                offset : (counter+4),
                moreStoresData: true
            });
        } else {
            this.setState({
                offset : len,
                moreStoresData: false
            });
        }
    }
    
    _hideData(){
        var counter = this.state.offset;
        this.setState({
            offset : 4,
            moreStoresData: true
        });
    }

    _renderChart(){ 
        if(this.props.list.labels && this.props.list.data && this.props.list.labels.length > 0 && this.props.list.data.length > 0){
            const chartConfiguration = {
                type: 'bar',
                data: {
                  labels: this.props.list.labels,
                  datasets: [{
                    label: '# of Votes',
                    data: this.props.list.data,
                    backgroundColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                    ],
                    borderColor: [
                      'rgba(255,99,132,1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                  }]
                },
                options: {
                    responsive: true,
                    events: false,
                    tooltips: {
                        enabled: false
                    },
                    hover: {
                        animationDuration: 0
                    },
                    scales: {
                        xAxes : [{
                            position: 'top',
                            display: true,
                            gridLines: {
                                lineWidth: 0,
                                display: false,
                            },
                            ticks: {
                                beginAtZero: true
                            }  
                        }],
                        yAxes: [{
                            // stacked:true,
                            display:true,
                            gridLines: {
                                lineWidth: 0,
                                display: false,
                            },
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    },
                    legend: {                    
                        display: false,
                        labels :{
                            boxWidth: 0,
                        }
                    }
                }
            };
            return (
                <View style={{flex:1}} scrollEnabled={true}>
                    <Row size={0.2} style={reportStyle.row}>
                        <Button transparent>
                            <Icon name="md-refresh" onPress= {this.refreshChart.bind(this)} style={styles.buttonColor} />
                        </Button>   
                    </Row>
                    <View style={{flex:1, paddingBottom: 3}}>
                        <Chart updateActiveLabel ={this.updateActiveLabel} chartConfiguration = {chartConfiguration} />
                    </View>
                    <Row size={0.2} style={reportStyle.row}>
                        <Text style={[reportStyle.row, reportStyle.chartText]}>* Click on bar for individual reports</Text> 
                    </Row>
                </View>
            );
        }else {
            return ;
        }
        
    }

    _renderStores(){
        if(this.props.list.stores[this.state.activeIndex] && this.props.list.stores[this.state.activeIndex].length > 0){
            var store  = [];
            if(this.state.moreStoresData){
                store = this.props.list.stores[this.state.activeIndex].slice(0, this.state.offset);
            }else {
                store = this.props.list.stores[this.state.activeIndex].slice(0);    
            }
            if(store.length > 0 && store[store.length - 1].name !='' && store[store.length - 1].value !=''){
                store.push({name:'', value:''});
            }
            
            return (
                <View style={{flex: 1}}>
                    <List
                        last = {{padding: 0, fontSize: 0, margin: 0}}
                        scrollEnabled={false}
                        automaticallyAdjustContentInsets={false}
                        dataArray = {store}
                        extraData = {this.state.offset}
                        keyExtractor = {(item) => item.name}
                        contentInset={{bottom:1}}
                        renderRow = {(item) => (
                            <ListItem noBorder style={{height: responsiveWidth(3)}}>
                               <Row>
                                    <Col><Text style={reportStyle.listText}>{item.name}</Text></Col>
                                    <Col><Text style={reportStyle.listText}>{this.props.name == 'Amount' && item.value && '₹ '}{item.value}</Text></Col>
                                </Row>
                            </ListItem>
                        )}
                    />
                        { store.length >= 5 && this.state.moreStoresData && <Button style={reportStyle.noPadding} info small transparent active={true} onPress={this._loadMore.bind(this)}><Text style={reportStyle.loadMore}> More </Text></Button> }
                        { store.length >= 5 && !this.state.moreStoresData && <Button style={reportStyle.noPadding} info small transparent active={true} onPress={this._hideData.bind(this)}><Text style={reportStyle.loadMore}> Hide </Text></Button> }
                    
                </View>
            );
        }else {
            return (
                <View>
                    <Text style={reportStyle.listTextNoData}>No Data Available</Text>
                </View>
            );
        }
    }

    _renderInstruments(){
        if(this.props.list.instruments[this.state.activeIndex] && this.props.list.instruments[this.state.activeIndex].length > 0){
           return (
                <View style={reportStyle.vwList}>
                    <List
                        dataArray = {this.props.list.instruments[this.state.activeIndex]}
                        extraData = {this.state.activeIndex}
                        keyExtractor = {(item) => item.name}
                        renderRow = {( item ) => (
                            <ListItem noBorder style={{height: 10}}>
                                <Row>
                                    <Col><Text style={reportStyle.listText}>{item.name}</Text></Col>
                                    <Col><Text style={reportStyle.listText}>{this.props.name == 'Amount' && item.value && '₹ '}{item.value}</Text></Col>
                                </Row>
                            </ListItem>
                        )}
                    />
                </View>
           );
        }else {
            return (
                <View>
                    <Text style={reportStyle.listTextNoData}>No Data Available</Text>
                </View>
            );
        }
    }

    render() {
       if(this.state.loading){
            return (
                <Container>
                    <Content style = {styles.contentBackground}>
                        <Spinner style={styles.spinner} color='#673ab7' />
                    </Content>
                </Container>
            );
       }else {
            return ( 
                <Container style={{flex:1}}>
                    <Content>
                        <View style={{flex:1}}>
                            {this._renderChart()}
                        </View>    
                        <Text style={reportStyle.heading}>{I18n.t('Stores')} {this.state.activeLabel}</Text>
                        {this._renderStores()}
                        <Text style={reportStyle.heading}>{I18n.t('Instruments')} {this.state.activeLabel}</Text>
                        {this._renderInstruments()}
                    </Content>
                </Container>
                );
       }
    }
}

let { height } = Dimensions.get("window");
const reportStyle = StyleSheet.create({
    row: { 
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        alignItems:'flex-end' 
    },
    chartText: {
        color: 'red', 
        fontSize: responsiveFontSize(1.5),
        paddingRight: responsiveWidth(3)
    } ,
    heading: {
        paddingLeft: responsiveWidth(4),
        fontSize: responsiveFontSize(2.5),
        fontWeight: 'bold',
        color: 'rgba(96, 97, 99, 1)',
        marginBottom: responsiveWidth(1)
    },
    listText: {
        alignSelf: 'flex-start',
        paddingLeft: responsiveWidth(4),
        fontSize: responsiveFontSize(1.8),
        color: '#673ab7',
        top: -5
    },
    listTextNoData: {
        alignSelf: 'flex-start',
        paddingLeft:responsiveWidth(1),
        paddingRight: responsiveWidth(1), 
        marginLeft: responsiveWidth(12),
        marginBottom: responsiveHeight(1.8),
        fontSize: responsiveFontSize(2),
        color: '#673ab7'
    },
    vwList: {
        height: height - responsiveHeight(82) //adjust
    },
    noPadding:{
        padding: 0,
        top: -20,
        height: responsiveHeight(2),
        paddingLeft: responsiveWidth(60)
    },
    loadMore:{
        fontSize: responsiveFontSize(1.7),
        textDecorationLine: 'underline'
    }
});

export default ReportCard;