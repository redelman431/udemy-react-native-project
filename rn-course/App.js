import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import ListItem from './src/components/ListItem/ListItem';
import TextSubmit from './src/components/TextSubmit/TextSubmit';

export default class App extends React.Component {
  state = {
    places: []
  };
  
  //Allows state change of places from another component. 
  changePlaces = (newPlace) => {
    
    this.setState(prevState => {
      return {
       places:prevState.places.concat(newPlace)
      };
     
    })
  };

  render() {
    //Iterates text jsx element into array for output in view.
    const placesOutput = this.state.places.map((place,i) => (
      <ListItem key={i} placeName={place} /> 
      
    ));
    return (
      <View style={styles.container}>
        <TextSubmit
          onPlaceSubmitHandler={this.state.places}
          changePlaces={this.changePlaces.bind(this)}
        
        />
        <View style={styles.listContainer}>
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
  listContainer: {
    width:"100%"
  }
});
