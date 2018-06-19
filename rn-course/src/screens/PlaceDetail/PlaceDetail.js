import React, {Component} from 'react';
import { View, Image, Text, Button, StyleSheet,TouchableOpacity, Platform, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {deletePlace} from '../../store/actions/index';

class PlaceDetail extends Component {
    state = {
        viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape"
    }

    constructor(props) {
        super(props);
        Dimensions.addEventListener("change", this.updateStyles);
    }
    
      //Make sure eventListener detach if it does not exist to prevent memory leaks. 
    componentWillUnmount() {
        Dimensions.removeEventListener("change",this.updateStyles);
    }
    
    updateStyles = (dims) => {
        this.setState({
          viewMode: dims.window.height > 500 ? "portrait" : "landscape"
        });
    }
    placeDeletedHandler = () => {
        this.props.onDeletePlace(this.props.selectedPlace.key);
        this.props.navigator.pop(); //Deletes page. 
    }

    render() {
        return(
            <View style={styles.container}>
                <View>
                    <Image source={this.props.selectedPlace.image}
                           style={this.state.viewMode ==="portrait" 
                                ? styles.portraitPlaceImage 
                                : styles.landscapePlaceImage
                            }
                    /> 
                    <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
                </View> 
                <View>
                    <TouchableOpacity onPress={this.placeDeletedHandler}>
                        <View style={styles.deleteButton}>
                             <Icon size={30} 
                                   name={Platform.OS === 'android' ? 'md-trash':"ios-trash"} 
                                   color="red" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )    
    }
}
    
const styles = StyleSheet.create({
    container:{
        margin: 22
    },
    portraitPlaceImage: {
        width:"100%",
        height:200 
    },
    landscapePlaceImage: {
        width:"100%",
        height:130
    },
    placeName: {
        fontWeight: "bold",
        textAlign:"center",
        fontSize:28
    },
    deleteButton: {
        alignItems:"center"
    }

});

const mapDispatchToProps = dispatch => {
    return {
        onDeletePlace: key => dispatch(deletePlace(key))

    };
};

export default connect(null,mapDispatchToProps)(PlaceDetail);

