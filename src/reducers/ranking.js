import * as Types from '../constants/config';
var initialState = { status: null, receptions: [], transmissions: [], number_receptions: [], number_transmissions: [], is_delete: false };

const rankings = (state = initialState, action) => {
  
    switch(action.type){
        case Types.FETCH_RANKING:
                state = {
                    status: true, 
                    rankings: action.res.response.data
                }
            return {...state};
        case Types.RECEPTION_AMOUNT: 
            state = {
                receptions: (action.res.response && action.res.response.data) ? action.res.response.data : []
            }
            return {...state}   
        case Types.TRANSMISSION_AMOUNT: 
            state = {
                transmissions: action.res.response.data
            }
            return {...state}  
        case Types.NUMBER_RECEPTION: 
            state = {
                number_receptions: action.res.response.data
            }
            return {...state}  
        case Types.NUMBER_TRANSMISSION: 
            state = {
                number_transmissions: action.res.response.data
            }
            return {...state}     
        default: 
            return state;
    }
}

export default rankings;