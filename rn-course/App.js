import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default class App extends React.Component {
  state = {
    placeName: "",
    places: []
  };

  //Must be arrow function so this refers to class. 
  placeNameChangedHandler = val => {
    //This refers to class.
    this.setState({
      placeName: val
    });

  };

  //Activates when button is pressed. 
  placeSubmitHandler = () => {
    if(this.state.placeName.trim() === "") {
      return;
    }
    //Concantentates adds new element and returns new array.
    this.setState(prevState => {
        return {
            places: prevState.places.concat(prevState.placeName)
        };
    })
    

    
  }
  render() {
    //Iterates text jsx element into array for output in view.
    const placesOutput = this.state.places.map((place,i) => (
      <Text key={i}>{place}</Text>

     ));
    return (
      <View style={styles.container}>
       <View style={styles.inputContainer}> 
         <TextInput 
            placeholder="An awesome place"
            value={this.state.placeName} 
            onChangeText={this.placeNameChangedHandler}
            style={styles.placeInput}          
          />
          <Button title="Add" style={styles.placeButton} onPress={this.placeSubmitHandler} />
        </View>
        <View>
          {placesOutput}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:26,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  inputContainer:{
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
