import React from 'react';
import { StyleSheet, View } from 'react-native';
import PlaceInput from './src/components/PlaceInput/PlaceInput';
import PlaceList from './src/components/PlaceList/PlaceList';
import placeImage from './src/assets/beautiful-place.jpg';

export default class App extends React.Component {
  state = {
    places: []
  };

  placeAddedHandler = placeName => {

    this.setState(prevState => {
        return {
            
            /*Image is liscesed to wikimedia creative commons and open source see
            https://commons.wikimedia.org/wiki/File:Columbus-ohio-skyline-panorama.jpg 
            for more details.*/
            places: prevState.places.concat({
                                key: `${Math.random()}`, //Using math.random according to instructor gives warning. Converted to string.
                                name: placeName,
                                image: {
                                  uri: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Columbus-ohio-skyline-panorama.jpg"
                                  
                                }
            })
        };
    });
    
};

placeDeletedHandler = key => {
  this.setState(prevState =>{
    return {
      places: prevState.places.filter(place => {
          return place.key !== key;
      })
    };
  });
}

render() {
  return (
    <View style={styles.container}>
      <PlaceInput onPlaceAdded={this.placeAddedHandler} />
      <PlaceList places ={this.state.places} 
        onItemDeleted={this.placeDeletedHandler} />   
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
  }
});
