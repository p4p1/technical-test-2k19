import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import BaoTextButton from './components/gui/BoaTextButton';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import BoaScreen from './screens/BoaScreen';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true,
      refresh: false
    };

    this.switchMode = this.switchMode.bind(this);
    this.refresher = this.refresher.bind(this);
    // set the api url to a global variable
    global.api = "http://192.168.0.6:8080";
  }

  refresher() {
    // refresh function for when logged in
    this.setState({refresh: this.state.refresh});
  }

  switchMode() {
    this.setState({login: !this.state.login});
  }

  render () {
    var page = <LoginScreen refresh={this.refresher} />;
    var text = "Register";

    if (global.api_token) {
      return (<BoaScreen />);
    }
    if (! this.state.login) { // not in login mode
      page = <RegisterScreen />;
      text = "Login";
    }
    return (
      <View style={styles.container}>
        {page}
        <BaoTextButton run={this.switchMode} text={text} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#228bcd',
  },
});
