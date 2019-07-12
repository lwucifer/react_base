import * as Types from '../constants/config';
import {findIndex} from 'lodash';
var initialState = { status: null, customers: [], customer: [], is_delete: false };

const customers = (state = initialState, action) => {
    switch(action.type){
        case Types.FETCH_CUSTOMERS:
                state = {
                    status: true, 
                    customers: action.res
                }
            return {...state};
        case Types.CONFIRM_DELETE_CUSTOMERS: 
            
            state = { 
                customer: action.params,
            };
            return state;
        case Types.DELETE_CUSTOMERS:
            if (action.res.status){
                state = {
                    is_delete: true
                }
            }
            return {...state};
        case Types.ADD_CUSTOMERS: 
            if (action.res.status){
                state = {
                    status: true, 
                    is_add: (action.is_add) ? true : false
                }
            }
            return {...state};
        case Types.UPDATE_CUSTOMERS:
           
            let {id} = action.user.user; 
            index = findIndex(state.customers, { id: id });
            if (index !== -1) {
                state.customers[index] = action.user.user;
            }
            state = {
                status: action.user.status,
                customers: action.user
            }
            return state;
        case Types.FETCH_CUSTOMER: 
            if (action.res.status){
                state = {
                    status: true, 
                    is_edit: (action.is_edit) ? true : false,
                    customer: action.res.data
                }
            }
            return {...state};
        default: 
            return state;
    }
}

export default customers;