import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export default class BaoTextField extends React.Component
{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input}
          onChangeText={this.props.run}
          placeholder={this.props.text}
          secureTextEntry={this.props.secureTextEntry}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '70%',
    height: 60,
    marginTop: 15,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 15,
  },
  input: {
    fontSize: 35,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#fff',
    borderRadius: 10,
  }
});
