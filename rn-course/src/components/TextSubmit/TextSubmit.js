import React from 'react';
import {App,View, TextInput, Button, StyleSheet } from 'react-native';

class TextSubmit extends React.Component {
  state = {
    placeName: "",
    
  };

  placeSubmitHandler = () => {
    var places = this.props.onPlaceSubmitHandler;
    if(this.state.placeName.trim() === "") {
      return;
    }
    this.props.changePlaces(this.state.placeName);
    
  };
  

  placeNameChangedHandler = val =>  {
    
    this.setState({
      placeName: val
    });
  };

  render() {
    return(
      <View style={styles.textSubmit}> 
          <TextInput 
            placeholder="An awesome place"
            value={this.state.placeName} 
            onChangeText={this.placeNameChangedHandler}
            style={styles.placeInput}          
          />
          <Button title="Add" style={styles.placeButton} 
            onPress={this.placeSubmitHandler} 
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  textSubmit:{
    width:"100%",
    flexDirection: "row",
    justifyContent:"space-between",
    alignItems:"center"
  },
  placeInput: {
    width:"70%"
  },
  placeButton: {
    width:"30%"
  }
});

export default TextSubmit;
