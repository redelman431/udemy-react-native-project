import React from 'react';
import { StyleSheet, View } from 'react-native';
import PlaceInput from './src/components/PlaceInput/PlaceInput';
import PlaceList from './src/components/PlaceList/PlaceList';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';
//import placeImage from './src/assets/beautiful-place.jpg';

export default class App extends React.Component {
  state = {
    places: [],
    selectedPlace: null
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

placeDeletedHandler = () => {
  this.setState(prevState =>{
    return {
      places: prevState.places.filter(place => {
          return place.key !== prevState.selectedPlace.key;
      }),
      selectedPlace:null
    };
  });
}

modalClosedHandler = () => {
  this.setState({
    selectedPlace: null
  });
}

placeSelectedHandler = key => {
  this.setState(prevState => {
    return {
      selectedPlace: prevState.places.find(place => {
        return place.key === key;
      })
    };
  });
};


render() {
  return (
    <View style={styles.container}>
      <PlaceDetail selectedPlace={this.state.selectedPlace}
                   onItemDeleted={this.placeDeletedHandler}
                   onModalClosed={this.modalClosedHandler}
      />
      <PlaceInput onPlaceAdded={this.placeAddedHandler} />
      <PlaceList places ={this.state.places} 
        onItemSelected={this.placeSelectedHandler} />   
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
