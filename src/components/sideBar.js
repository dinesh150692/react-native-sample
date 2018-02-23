import React, {
    Component
} from "react";
import {
    Alert,
    Image,
    NetInfo,
    FlatList,
    BackHandler,
    Platform,
    StyleSheet,
} from 'react-native';
import {
  Body,
  Icon,  
  Left,
  Text,
  Right,
  Title,
  Toast,
  Button,
  Header,
  Footer,
  Content,
  ListItem,
  Subtitle,
  Container    
} from 'native-base';
import styles from '../Style';
import { NavigationActions } from 'react-navigation';
const drawerImage = require('../assets/phonepe_icon.png');
class SideBar extends Component {

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.children.props.navigation.dispatch(navigateAction);
  }
    constructor(props) {
      console.log(props);
        super(props);
        this.state = {
          datas : [
            {
              name: 'Transactions',
              route: 'Transactions',
              sidebarName: 'Transactions',
              icon: 'swap',
              active: false
            },
            {
              name: 'Reports',
              route: 'Reports',
              sidebarName: 'Reports',
              icon: 'document',
              active: false
            },
            {
              name: 'Terminal',
              route: 'Terminal',
              sidebarName: 'QR/POS',
              icon: 'barcode',
              active: false
            },
          ],
        };
        this.activeRoute = this.activeRoute.bind(this);
    }
    activeRoute(){
      let name = this.props.children.props.activeItemKey;
      console.log(name);
      let temp = this.state.datas;
      this.setState({ datas: []});
      let index = temp.findIndex(el => {return el.active === true;});
      if(index >= 0){
        temp[index].active = false;
      }
      index = temp.findIndex(el => {return el.name == name});
      if(index >= 0){
        temp[index].active = true;
        this.setState({ datas: temp});
        this.forceUpdate();
      }
    }

    render() {
        return ( 
            <Container>
              <Header style = {styles.menuBackground}>
                <Body style= {styles.menuAlign}>
                  <Title style = {styles.menuFont}>Sample</Title>
                  <Subtitle style = {styles.menuFont}>sample@sample.com</Subtitle>
                </Body>
                <Right>
                  <Image
                    square
                    style={styles.drawerImage}
                    source={drawerImage}
                  />
                </Right>
              </Header>
              {this.props.children}
              {/* <FlatList
                  data = {this.state.datas}
                  extraData = {this.state}
                  keyExtractor = {(item) => item.name}
                  renderItem = {({ item }) => (
                    <ListItem
                      style = {[ styles.sideBar, item.active && styles.activeSideBar ]}
                      button 
                      noBorder 
                      onPress = {() => { 
                        console.log(item.route);
                        this.navigateToScreen('Reports');
                        this.activeRoute();
                      }} 
                    >
                      <Left>
                        <Icon active name = {item.icon} style = {[styles.sideBarIcon, item.active && styles.activeSideBarIcon]} />
                        <Text style = {[ styles.sideBarText,  item.active && styles.activeSideBarText ]}>{item.sidebarName}</Text>
                      </Left>
                    </ListItem>
                  )}
                />
              </Content>
              <Footer style = {styles.menuBackground}>
                <Body>
                  <ListItem
                      style = {styles.sideBar}
                      button 
                      noBorder 
                      onPress = {() => { 
                        this.navigateToScreen('Login');
                      }} 
                    >
                      <Left>
                        <Icon active name ="log-out" style = {styles.sideBarIcon} />
                        <Text style = {styles.sideBarText}>Logout</Text>
                      </Left>
                    </ListItem>
                </Body>
              </Footer> */}
            </Container>
        );
    }
}


export default SideBar;
