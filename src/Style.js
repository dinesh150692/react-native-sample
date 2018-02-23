import { StyleSheet } from 'react-native';
import {
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';

module.exports = StyleSheet.create({
    header: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30
    },
    fontsize: {
        fontSize: 20,
        color: 'white'
    },
    menuAlign:{
        alignSelf: 'flex-start',
        alignItems: 'flex-start'
    },
    menuFont: {
        color: '#673ab7'
    },
    contentBackground:{
        flex: 1,
        backgroundColor: 'white'
    },
    background: {
        backgroundColor: '#673ab7'
    },
    menuBackground: {
        backgroundColor: '#dbcdf4',
        paddingBottom: 10,
        paddingTop: 10
    },
    sideBar: {
        width: '100%', 
        marginLeft: 0, 
        paddingLeft: 10, 
        paddingRight: 0, 
        marginRight: 0
    },
    sideBarIcon: {
        color: 'black', 
        fontSize: 26, 
        fontWeight: 'bold',
        width: 30 
    },
    sideBarText: {
        fontSize: 20
    },
    activeSideBarIcon: {
        color: 'white',
    },
    activeSideBarText: {
        color: 'white'
    },
    activeSideBar:{
        backgroundColor: '#673ab7'
    },
    drawerImage: {
        paddingTop: 20,
        paddingRight: 10,
        width: 50,
        height: 50,
        resizeMode: 'cover',
    },
    tabColor: {
        borderColor: '#673ab7',
        borderBottomWidth: 3
    },
    activeTabTextStyle: {
        color: '#673ab7',
        fontWeight: 'bold'
    },
    tabTextStyle: {
        color: 'rgba(108, 58, 183, 0.7)',
    },
    tabStyle: {
        backgroundColor: 'white'
    },
    activeTabStyle: {
        borderColor: '#673ab7',
        backgroundColor: 'white',
        borderBottomWidth: 3
    },
    spinner: {
        paddingTop: responsiveHeight(40),
    },
    buttonColor: {
        color: '#673ab7',
        fontSize: responsiveHeight(2),
        paddingTop: 0
    }
});