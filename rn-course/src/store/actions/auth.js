import {AsyncStorage} from 'react-native';
import {TRY_AUTH, AUTH_SET_TOKEN} from './actionTypes';
import {uiStartLoading,uiStopLoading} from './index'
import startMainTabs from "../../screens/MainTabs/startMainTabs";
import Secrets from '../../../secrets';

export const tryAuth = (authData,authMode) => {
   
    return dispatch => {
        dispatch(uiStartLoading());
        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key="+Secrets.FIREBASE_API_KEY;
        if(authMode === "signup") {
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key="+Secrets.FIREBASE_API_KEY;
        }
        fetch(url, {
            method: "POST",
            body:JSON.stringify({
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }),
            headers: {
               "Content-type": "application/json"
            }
        })
        .catch(err => {
            console.log(err);
            alert("Authentication failed, please try again!");
            dispatch(uiStopLoading())
        })
        .then(res => res.json())
        .then(parsedRes => {

            dispatch(uiStopLoading());
            console.log(parsedRes);
            if(!parsedRes.idToken) {
                alert("Authentication failed, please try again!")
            } else {
                dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn));
               startMainTabs();
            }
            
           
        });
        
    };
}

export const authSetToken = token => {
    return {
        type: AUTH_SET_TOKEN,
        token: token
    };
}

export const authStoreToken = (token,expiresIn) => {
    return dispatch => {
        dispatch(authSetToken(token));
        const now = new Date();
        const expiryDate = now.getTime() + expiresIn * 1000;
        
        AsyncStorage.setItem("ap:auth:token",token);
        AsyncStorage.setItem("ap:auth:expiryDate",expiryDate.toString());
    }
}

export const authGetToken = () => {
    return (dispatch,getState) => {
        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.token;
            if(!token) {
                let fetchedToken;
                AsyncStorage.getItem("ap:auth:token")
                 .catch(err => reject() )
                 .then(tokenFromStorage => {
                     fetchedToken = tokenFromStorage;
                     if(!tokenFromStorage) {
                         reject();
                         return;
                     }
                     return AsyncStorage.getItem("ap:auth:expiryDate")
                     
                 })
                 .then(expiryDate => {
                    const parsedExpiryDate = new Date(parseInt(expiryDate));
                    const now = new Date();
                    if( parsedExpiryDate > now) {
                        dispatch(authSetToken(fetchedToken));
                        resolve(fetchedToken);
                    }
                    else {
                        reject();
                    }
                    
                 })
                 .catch(err => reject())
            } else {

                resolve(token);
            }
        })
        return promise;
       
    };
}

export const authAutoSignIn = () => {
 
    return dispatch => {
        dispatch(authGetToken())
            .then(token => {
               
                startMainTabs();
            })
            .catch(err => console.log("Failed to fetch token!") )

    }
}


