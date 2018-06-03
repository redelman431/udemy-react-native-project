import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default class App extends React.Component {
  state = {
    placeName: ""
  };

  //Must be arrow function so this refers to class. 
  placeNameChangedHandler = val => {
    //This refers to class.
    this.setState({
      placeName:val
    });

  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput 
          style={{width: 300, borderColor: "black",borderWidth:1}}
          value={this.state.placeName} 
          onChangeText={this.placeNameChangedHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
