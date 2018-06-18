import React, {Component} from 'react';
import {View, Text, Button, TextInput, StyleSheet, ImageBackground} from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import ButtonWithBackGround from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
import backgroundImage from "../../assets/background.jpg"; 

class AuthScreen extends Component {
    loginHandler = () => {
        startMainTabs();
    }
    render() {
        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <MainText> 
                        <HeadingText style={styles.textHeading}>Please Log In</HeadingText>
                    </MainText>
                    <ButtonWithBackGround color="#29aaf4" onPress={() =>alert("Hello")}>Switch to Login</ButtonWithBackGround>
                    <View style={styles.inputContainer}>
                        <DefaultInput placeholder="Your E-mail Address" style={styles.input}  />
                        <DefaultInput placeholder="Password" style={styles.input} />
                        <DefaultInput placeholder="Confirm Password" style={styles.input} />
                    </View>
                    <ButtonWithBackGround color="#29aaf4" onPress={this.loginHandler}>Submit</ButtonWithBackGround>              
                </View> 
            </ImageBackground>
        );
    }
}

const styles= StyleSheet.create({
    container: {
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    backgroundImage: {
        width: "100%",
        flex:1

    },
    inputContainer: {
        width:"80%"
    },
    input: {
        backgroundColor:'#eee',
        borderColor:"#bbb"
    }
});

export default AuthScreen;