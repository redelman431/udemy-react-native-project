import React, {Component} from 'react';
import {View, Text, TextInput, Button, StyleSheet, ScrollView, Image} from 'react-native';
import {connect } from 'react-redux';
import {addPlace} from '../../store/actions/index';
import validate from '../../utility/validation';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText'
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation'
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";

class SharePlaceScreen extends Component {
    static navigatorStyle = {
        navBarButtonColor:"orange"
    }

    state = {
        placeName:"",
        controls:{
            placeInput: {
              valid:false,
              value:"",
              validationRules:{
                isNotEmpty: true
              },
            }
        }
    };
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    onNavigatorEvent = event => {
        if(event.type === "NavBarButtonPress"){
            if(event.id === 'sideDrawerToggle') {
                this.props.navigator.toggleDrawer({
                    side:"left"
                });
            }

        }
    }

    placeNameChangedHandler = (key,value) => {
        this.setState({
            placeName: value

        });
        let connectedValue = {};
        this.setState(prevState => {
            return {
                 controls: {
                    ...prevState.controls,
                    [key]:{
                        ...prevState.controls[key],
                        value: value, 
                        valid:validate(value,prevState.controls[key].validationRules,connectedValue)
                        
                    }
                }
            }  
        });
    }

    placeAddedHandler = () =>
    {
        //if(this.state.placeName.trim() !=="") {
            this.props.onAddPlace(this.state.placeName);
        //}
    };
    render() {
        return(
            <ScrollView >
                <View style={styles.container}>
                    <MainText>
                        <HeadingText>Share a Place with us!</HeadingText>
                    </MainText>
                    <PickImage />
                    <PickLocation />
                    <PlaceInput placeName={this.state.placeName} 
                                onChangeText={(val) => this.placeNameChangedHandler('placeInput',val)} />
                    <View style={styles.button}>
                        {/*<Button title="Share the Place!" onPress={this.placeAddedHandler}/>*/}
                        <ButtonWithBackground 
                            color="#29aaf4" 
                            onPress={this.loginHandler}
                            disabled = {!this.state.controls.placeInput.valid }
                        >
                            Share the Place!
                        </ButtonWithBackground>
                    </View>
                </View>
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:"center"
    },
    placeholder: {
        borderWidth: 1,
        borderColor: "black",
        backgroundColor:'#eee',
        width: "80%",
        height: 150
    },
    button:{
        margin: 8
    },
    previewImage:{
        width:'100%',
        height:'100%'
    }
})

const mapDispactchToProps = dispatch => {
    return {
        onAddPlace:(placeName) => dispatch(addPlace(placeName))
    };
};



export default connect(null,mapDispactchToProps)(SharePlaceScreen);