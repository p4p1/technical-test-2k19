import React from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';

import BaoTextField from '../components/gui/BoaTextField';
import BaoTextButton from '../components/gui/BoaTextButton';
import BaoFlag from '../components/game/BaoFlag';

export default class BoaScreen extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      turns: 0,
      text: "",
      score: 0,
      result: '',
      country: []
    };
    this.getTurns = this.getTurns.bind(this);
    this.getText = this.getText.bind(this);
    this.callApi = this.callApi.bind(this);
  }

  getTurns(text) {
    this.setState({turns: text});
  }

  getText(text) {
    this.setState({text: text});
  }

  callApi(event) {
    fetch(`${global.api}/boa`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${global.api_token}`
      },
      body: JSON.stringify({
        turns: Number(this.state.turns),
        text: this.state.text
      })
    }).then((resp) => resp.json()).then((respJson) => {
      if (respJson.data !== undefined) {
        alert(respJson.data);
      }
      this.setState({score: respJson.result});
      this.setState({result: respJson.text});
      this.setState({country: respJson.turns});
    }).catch((err) => console.error(err));
  }

  render() {
    var res = <View></View>;

    if (this.state.country.length > 0) {
      res = <ScrollView style={styles.resultat}>
              <Text style={styles.resultText}>{this.state.result}</Text>
              <Text style={styles.resultText}>{this.state.score}/100</Text>
              <BaoFlag flags={this.state.country} />
            </ScrollView>;
    }
    return (
      <View style={styles.container}>
        <BaoTextField run={this.getTurns} text="Turn number" secureTextEntry={false} />
        <BaoTextField run={this.getText} text="Text" secureTextEntry={false} />
        <BaoTextButton run={this.callApi} text="BAO" />
        {/* The display of the results */}
        {res}
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
  resultat: {
    marginTop: 15,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 15,
  },
  resultText: {
    fontSize: 30,
    color: '#fff',
  }
});
