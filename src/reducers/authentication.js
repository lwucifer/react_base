import * as Types from '../constants/config';
var initialState = { loggedIn: false, message: '' };
if(localStorage.getItem('access_token')){
    initialState = { loggedIn: true };
}

const users = (state = initialState, action) => {
    switch(action.type){
        case Types.LOGIN:
                if( action.response.status.message === 'success' ){ // if login is successfully
                    localStorage.setItem('access_token', action.response.data.token);
                    localStorage.setItem('i18nextLng', localStorage.getItem('i18nextLng') ? localStorage.getItem('i18nextLng') : 'jp');
                    state = { loggedIn: true };
                } else {
                    state = { loggedIn: false };
                }
            return {...state};
        case Types.LOGIN_FAILED: 
            state = { loggedIn: false, message: action.response.status.message };
            return {...state};
        case Types.LOGOUT:
            localStorage.removeItem('access_token');
            state = { loggedIn: false };
            return state;
        default: 
            return state;
    }
}

export default users;