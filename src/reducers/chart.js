import * as Types from '../constants/config';
var initialState = { status: null, charts: [], diagrams: [], search: [], is_delete: false };

const charts = (state = initialState, action) => {
  
    switch(action.type){
        case Types.FETCH_DIAGRAM:
                state = {
                    diagrams: action.data
                }
            return {...state};
        case Types.FETCH_CHARTS: 
            if(action.status.message !== 'success'){
                alert(action.status.message)
            }    
            state = {
                charts: action.data
            }    
            return state
        case Types.SEARCH_USER:
            state = {
                search: action.res.response.data
            }
        return {...state};
        default: 
            return state;
    }
}

export default charts;