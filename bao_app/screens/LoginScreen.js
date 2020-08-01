import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import BaoTextField from '../components/gui/BoaTextField';
import BaoTextButton from '../components/gui/BoaTextButton';

export default class LoginScreen extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      password: ""
    };
    this.getUser = this.getUser.bind(this);
    this.getPassword = this.getPassword.bind(this);
    this.sendCreds = this.sendCreds.bind(this);
  }

  getUser(text) {
    this.setState({user: text});
  }

  getPassword(text) {
    this.setState({password: text});
  }

  sendCreds(event) {
    fetch(`${global.api}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.user,
        password: this.state.password
      })
    }).then((resp) => resp.json()).then((respJson) => {
      global.api_token = respJson.token;
      alert(respJson.msg);
      this.props.refresh(); // refresh the App page
    }).catch((err) => console.error(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <BaoTextField run={this.getUser} text="Username" secureTextEntry={false} />
        <BaoTextField run={this.getPassword} text="Password" secureTextEntry={true} />
        <BaoTextButton run={this.sendCreds} text="Login" />
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
