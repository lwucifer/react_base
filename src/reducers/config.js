import * as Types from '../constants/config';
var initialState = { title: 'ユーザ一覧' };

const users = (state = initialState, action) => {
    switch(action.type){
        case Types.TITLE_PAGE:
                state = {
                    title: action.title
                }
            return {...state};
        default: 
            return state;
    }
}

export default users;