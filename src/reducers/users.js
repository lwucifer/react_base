import * as Types from './../constants/config';
import {findIndex} from 'lodash';
var initialState = { status: null, users: [], user: [], message: '', is_delete: false, profile: [] };

const users = (state = initialState, action) => {
    switch(action.type){
        case Types.FETCH_USERS:
            state = {
                status: true,
                users: action.res.response.data
            }
            return {...state};
        case Types.DELETE_USERS:
            state = {
                is_delete: true,
            }
            return {...state};    
        case Types.ADD_USERS:
            let profile = state.profile;
            console.log(action);
            state = { 
                status: true,
                is_add: (action.is_add) ? true : false,
                users: action.params,
                profile: profile,
                message: "The_email_has_already_been_taken"
            };
            return state;    
        case Types.UPDATE_USERS:
            let {id} = action.user.user; 
            let index = findIndex(state.users, { id: id });
            if (index !== -1) {
                state.users[index] = action.user.user;
            }
            state = {
                status: action.user.status,
                users: action.user
            }
            return {...state};    
        case Types.FETCH_USER:
            if(action.is_edit){
                state = {
                    status: true, 
                    is_edit: (action.is_edit) ? true : false,
                    users: action.res.response.data,
                }
            } else {
                state = {
                    status: true, 
                    is_edit: (action.is_edit) ? true : false,
                    message: action.res.response.status.message,
                }
            }
            return {...state};    
        case Types.GET_USER: 
            if (action.user){
                state = {
                    userEdit: action.user
                }
            }
            return {...state};    
        case Types.CONFIRM_DELETE_USERS: 
            var arr = [];
            action.params.ids.map((id, key) => {
                let index = findIndex(state.users.list, { id: parseInt(id) });
                arr.push(state.users.list[index])
            })
            if (arr){
                state = {
                    ids: action.params.ids,
                    is_delete: false,
                    user: arr
                }
            }
            return {...state};
        case Types.ACT_DELETE_USERS: 
            if (action.status){
                state = {
                    is_delete: action.status
                }
            }
            return {...state};    
        case Types.GET_EDIT_USER: 
            state = {
                user: action.data
            }
            return {...state};    
        case Types.GET_PROFILE_USER:
            state = { profile: action.response.data, message: '' };
            return {...state};    
        default: 
            return {...state};    
    }
}

export default users;