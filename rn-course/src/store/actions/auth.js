import {TRY_AUTH} from './actionTypes';
import Secrets from '../../../secrets';

export const tryAuth = (authData) => {
    /*return {
        type: TRY_AUTH,
        authData: authData
    }*/
    return dispatch => {
        dispatch(authSignup(authData));
    };
}

export const authSignup = (authData) => {
    return dispatch => {
        fetch("https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key="+Secrets.FIREBASE_API_KEY, {
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
        })
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes);
        });
    }
}