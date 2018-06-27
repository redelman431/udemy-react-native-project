import {  SET_PLACES } from './actionTypes';
import Secrets from '../../../secrets';
import {uiStartLoading,uiStopLoading} from './index';


export const addPlace = (placeName, location, image) => {
    return dispatch => {
        dispatch(uiStartLoading());
        fetch("https://us-central1-"+Secrets.FIREBASE_ID+".cloudfunctions.net/storeImage", {
              method:"POST",
              body:JSON.stringify({
                  image: image.base64
              })
        })
        .catch(err => {
            console.log(err);
            alert("Something went wrong, please try again!");
            dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(parsedRes => {
    
            const placeData = {
                name:placeName,
                location: location,
                image: parsedRes.imageUrl
            };
            return fetch("https://"+Secrets.FIREBASE_ID+".firebaseio.com/places.json",{
                method:"POST",
                body: JSON.stringify(placeData)
            })
        })
        .catch(err => {
            console.log(err);
            alert("Something went wrong, please try again!");
            dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes);
            dispatch(uiStopLoading());
            
        });
         
     
    };
   
};

export const setPlaces = places => {
    return {
        type: SET_PLACES,
        places: places
    };
}

export const getPlaces = () => {
    return dispatch => {
        fetch("https://"+Secrets.FIREBASE_ID+".firebaseio.com/places.json")
        .catch(err => {
            alert("Something went wrong, sorry:/");
            console.log(err);
        })
        .then(res => res.json() )
        .then(parsedRes => {
            const places = [];
            for (let key in parsedRes) {
                places.push({
                    ...parsedRes[key],
                    image: {
                        uri:parsedRes[key].image
                    },
                    key: key
                });
            }
            dispatch(setPlaces(places));
        });

    }
}; 

export const deletePlace = (key) => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    };
};
