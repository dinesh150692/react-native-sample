import React, {Component} from "react";
import {StyleSheet,Platform,View,Alert,Text,FlatList,Dimensions,ScrollView,TouchableOpacity} from 'react-native';
import { Container, Spinner,Icon, CardItem, Body, Button, Input,Item,Title,Subtitle, Header, Left, Right, Separator} from 'native-base';
import MapView, { Marker, ProviderPropType, PROVIDER_GOOGLE } from 'react-native-maps';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Row, Col } from 'react-native-easy-grid';
import Permissions from 'react-native-permissions';
import SystemSetting from 'react-native-system-setting';
import FontIcons from 'react-native-vector-icons/FontAwesome';
import I18n from './i18n/i18n';
import style from '../Style';
const GEOLOCATION_OPTIONS = { enableHighAccuracy: false, timeout: 2000, maximumAge: 1000 };
let id = 0;
function randomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
class MapMyStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationInput: '',
            locationEnabled: false,   
            searchList: [],
            searching: false       
        }
        this.handleLocationInput = this.handleLocationInput.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
    }

    componentDidMount(){
        if(Platform.OS == 'android'){
            this.getLocationPermissions();
        }else{
            this.getLocationPermissions();
            //this.checkLocation();
        }
    }
    
    checkLocation(){
        SystemSetting.isLocationEnabled().then((enable)=>{
            if(enable){
                this.getLocationData();
            }else{
                this.enableLocation();
            }
        })
    }

    enableLocation() {
        Alert.alert(
            I18n.t('Can we access your location'),
            I18n.t('So you can set your store location'),
            [
                {
                    text: I18n.t('No'),
                    onPress: () => this.props.navigation.goBack(),
                    style: 'cancel',
                },
                { 
                    text: I18n.t('OK'), onPress: () => {
                        SystemSetting.switchLocation(async () => {
                            console.log('In Switch Location');
                           await SystemSetting.isLocationEnabled().then((enable)=>{
                               console.log(enable);
                                if(enable){
                                    console.log('In getting location');
                                    setTimeout(() => {
                                        this.getLocationData();
                                    }, 100);
                                }else{
                                    this.enableLocation();
                                }
                            });
                        })
                    }
                }
            ],
        )
    }
  
    getLocationPermissions() {
        Permissions.check('location').then(response => {
            console.log(response);
            // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
            if(response != 'authorized'){
                Alert.alert(
                    I18n.t('Can we access your location'),
                    I18n.t('So you can set your store location'),
                    [
                        {
                            text: I18n.t('No'),
                            onPress: () => this.props.navigation.goBack(),
                            style: 'cancel',
                        },
                        response == 'undetermined'
                          ? { text: I18n.t('OK'), onPress: () => {this._requestPermission()}}
                          : { text: I18n.t('Open Settings'), onPress: Permissions.openSettings },
                    ],
                )
            }else {
                this.checkLocation();
            }
        });
    }

    getLocationData() {
        let region ={};
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            this.updateRegion(position.coords.latitude, position.coords.longitude);
        },function(error) {
            if(error.message.code == 3){
                this.getLocationData();
            }else if(error.message.code == 2){
                this.enableLocation();  
            } 
        });
    }

    // Request permission to access location
    _requestPermission() {
        console.log('In request permission');
        Permissions.request('location').then(response => {
            if(response == 'authorized'){
                this.getLocationData();
            }
        });
    }

    onRegionChange(region) {
        this.setState({region});
    }

    updateRegion(lat,long){
        let region = {};
        let coordinate = {};
        let distance = 300;
        let circumference = 40075;
        let oneDegreeOfLatitudeInMeters = 111.32 * 1000;
        let angularDistance = distance/circumference;
        let latitudeDelta = distance / oneDegreeOfLatitudeInMeters;
        let longitudeDelta = Math.abs(Math.atan2(
            Math.sin(angularDistance)*Math.cos(lat),
            Math.cos(angularDistance) - Math.sin(lat) * Math.sin(lat)))
        region = {
            latitude: lat,
            longitude: long,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
        };
        this.setState({region: region});
        setTimeout(() => {
            this.setState({locationEnabled: true});
            //this.map.animateToRegion(this.state.region,200);
    }, 100);
    }
    
    handleLocationInput(textInput) {
        this.setState({
          locationInput: textInput
        });
        this.setState({searchList: []}, this.fetchSearchSuggestions());
    }
    
    fetchSearchSuggestions(){
        fetch('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + this.state.locationInput + '&types=geocode&language='+ I18n.locale +'&key=AIzaSyCdZaKaU7bxmUYna_21DHO58l0Bx3QJpY8',{
            method: 'GET'
        })
        .then((response) => {
            return response.json();
        }).then((resJson) => {
            this.setState({searchList: resJson.predictions})
            console.log(resJson);
        })
        .catch(error => console.log("Failjax: ", error));
    }
    
    handleSubmit(textInput) {
        console.log('In Getting Geocode')
        console.log(textInput);
        if(textInput != ''){
            this.setState({searchList:[],locationInput: '', searching: false, locationEnabled: false});
        
            fetch('https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+ this.state.locationInput +'&types=geocode&language='+ I18n.locale +'&key=AIzaSyADuwVA0JlfjvmzBCgJOKasygWU39FfAz8',{
                method: 'GET'
            })
            .then((response) => {
                return response.json();
            }).then((resJson) => {
                if(resJson.results){
                    let info = resJson.results[0].geometry.location 
                    if(info.lat){
                        this.updateRegion(info.lat, info.lng);
                    }
                }else {
                    fetch("https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + textInput + "&key=" + 'AIzaSyADuwVA0JlfjvmzBCgJOKasygWU39FfAz8',{
                        method: 'GET'
                    }).then((response) => {
                        return response.json();
                    }).then((resJson) => {
                        if(resJson.results){
                            let info = resJson.results[0].geometry.location 
                            if(info.lat){
                                this.updateRegion(info.lat, info.lng);
                            }
                        }else {
                        
                        }
                    }).catch(error => console.log("Failjax: ", error));
                }
            })
            .catch(error => console.log("Failjax: ", error));
        }
    }
    
    handleLocationChange(response){
        this.setState({
          locationCoordiante: response
        })
    }

    _renderHeader(){
        return (
            <Header iosBarStyle="light-content" androidStatusBarColor="#62429b" style={style.background}>
                 <Left>
                    <Button transparent onPress={() => {this.props.navigation.goBack();}}>
                        <Icon android='md-arrow-back' ios="ios-arrow-back" style={style.header} />
                    </Button>
                </Left> 
                <Body>
                    <Title style={[style.fontsize,{ alignItems: 'center'}]}>{I18n.t('Map My Store')}</Title>
                </Body>
            </Header>
        );
    }

    render() {
        if(this.state.locationEnabled){
        return (
            <Container>
                {/* {this._renderHeader()} */}
                <View  style={[styles.container, this.state.searchList.length > 0 && {alignItems: 'center', justifyContent: 'flex-start'}]}> 
                    <MapView
                        ref={ref => { this.map = ref; }}
                        provider={PROVIDER_GOOGLE}
                        mapType={'standard'}
                        style={styles.map}
                        zoomEnabled={true}
                        showsCompass={false}
                        zoomControlEnabled={false}
                        showsUserLocation={true}
                        followsUserLocation={true}
                        showsMyLocationButton={true}
                        initialRegion={this.state.region}
                        loadingEnabled={true}
                        loadingIndicatorColor={'#673ab7'}
                        onRegionChange={this.onRegionChange.bind(this)}
                        > 
                        <Marker
                            coordinate={this.state.region}
                            //pinColor={'#673ab7'}
                            title='My Store'
                            description="To Mark this as your store press done"    
                        />
                    </MapView> 
                    <View  style={[styles.inputContainer, this.state.searching && {borderRadius: 0,top: -responsiveHeight(3.3), width: '100%'}]}>
                        <Item>
                            <Input
                                placeholder={I18n.t('Search Location?')}
                                onChangeText={this.handleLocationInput}
                                onFocus={() => {this.setState({searching: true})}}
                                value={this.state.locationInput}
                                onSubmitEditing={() => {this.handleSubmit(this.state.locationInput)}}
                            />
                             <Icon active name='search'  onPress={() => {this.handleSubmit(this.state.locationInput)}}/>
                        </Item>
                    </View>
                    {this.state.searchList.length > 0 &&
                        <View  style={{ backgroundColor: 'white', flexDirection: 'row',elevation: 2, width: '100%',top:-40,justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                            <FlatList
                                automaticallyAdjustContentInsets={true}
                                keyboardShouldPersistTaps='always'
                                data = {this.state.searchList}
                                extraData = {this.state}
                                keyExtractor = {(item) => item.structured_formatting.main_text+item.structured_formatting.secondary_text}
                                renderItem = {({item}) => 
                                    <CardItem avatar noBorder button={true} style={{backgroundColor: 'white', borderBottomWidth: 0}} onPress={() =>{this.handleSubmit(item.description)}}>
                                        <Row>
                                            <Col style={{width: responsiveWidth(10)}}>
                                                <FontIcons rounded name="map-marker" size={responsiveHeight(3.5)} color="#673ab7"/> 
                                            </Col>
                                            <Body>
                                                <Title style={{color:'black',fontSize:responsiveHeight(2.5)}}>{item.structured_formatting.main_text}</Title>
                                                <Title style={{color: 'grey',fontSize:responsiveHeight(1.6)}}>{item.structured_formatting.secondary_text}</Title>
                                            </Body>
                                           </Row>
                                    </CardItem>
                                }  
                            />
                        </View>
                    }
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity                       
                            onPress={() => console.log('Done')}
                            style={[styles.bubble, styles.button]}
                        >
                            <Text style={styles.buttonText}>{I18n.t('Done')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Container>
        );
        }else {
            return (
                <Container>
                    {/* {this._renderHeader()} */}
                    <View style = {style.contentBackground}>
                        <Spinner style={style.spinner} color='#673ab7' />
                    </View>
                </Container>
            );
        }
    }
}



const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        //marginTop: '17%',
        height: '100%',
        backgroundColor: 'white'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    bubble: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        backgroundColor: 'transparent',
    },
    buttonText: {
        color: '#673ab7',
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        backgroundColor: 'white',
        width: '80%',
        top: responsiveHeight(3),
        borderRadius: 30,
        shadowOpacity: 0.75,
        shadowRadius: 1,
        shadowColor: 'gray',
        shadowOffset: { height: 0, width: 0}
    },
    input:{
        alignItems: 'center',
        width: '99%',
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
    }
  });

export default MapMyStore;
