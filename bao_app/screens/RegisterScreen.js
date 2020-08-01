import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import BaoTextField from '../components/gui/BoaTextField';
import BaoTextButton from '../components/gui/BoaTextButton';

export default class RegisterScreen extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      password: "",
      password_repeat: ""
    };
    this.getUser = this.getUser.bind(this);
    this.getPassword = this.getPassword.bind(this);
    this.getPasswordRepeat = this.getPasswordRepeat.bind(this);
    this.sendCreds = this.sendCreds.bind(this);
  }

  getUser(text) {
    this.setState({user: text});
  }

  getPassword(text) {
    this.setState({password: text});
  }

  getPasswordRepeat(text) {
    this.setState({password_repeat: text});
  }

  sendCreds(event) {
    fetch(`${global.api}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.user,
        password: this.state.password,
        password_repeat: this.state.password_repeat
      })
    }).then((resp) => resp.json()).then((respJson) => {
      global.api_token = respJson;
      alert(respJson.msg);
    }).catch((err) => console.error(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <BaoTextField run={this.getUser} text="Username" secureTextEntry={false} />
        <BaoTextField run={this.getPassword} text="Password" secureTextEntry={true} />
        <BaoTextField run={this.getPasswordRepeat} text="Repeat Password" secureTextEntry={true} />
        <BaoTextButton run={this.sendCreds} text="Register" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#228bcd',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
