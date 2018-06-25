import {ADD_PLACE,DELETE_PLACE} from '../actions/actionTypes';
const initialState = {
    places: []
}

//Executes on every action cases are actionTypes.
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_PLACE: 
            return {
                ...state, //Copies old state.
                /*Image is liscesed to wikimedia creative commons and open source see
                https://commons.wikimedia.org/wiki/File:Columbus-ohio-skyline-panorama.jpg 
                for more details.
                Author: Tytso*/
                places: state.places.concat({
                    key: `${Math.random()}`, //Using math.random according to instructor gives warning. Converted to string.
                    name: action.placeName,
                    image: {
                        uri: action.image.uri
                  
                    },
                    location: action.location
                })

            };
        case DELETE_PLACE:
            
            return {
                ...state,
                places: state.places.filter(place => {

                    return place.key !== action.placeKey;
                })
            }
        default: 
            return state;
    }

};

export default reducer; 