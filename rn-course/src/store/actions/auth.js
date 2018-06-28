import {TRY_AUTH} from './actionTypes';
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

            dispatch(uiStopLoading())
            if(parsedRes.error) {
                alert("Authentication failed, please try again!")
            } else {
               startMainTabs();
            }
            
           
        });
        
    };
}



