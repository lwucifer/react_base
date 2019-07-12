import {AUTHENTICATION_401} from '../../constants/config'

const loggingMiddleware = (store) => (next) => (action) => {
    if(action.res === AUTHENTICATION_401){
        store.dispatch({
            type: 'LOGOUT'
        });
    }
    next(action);
}

export default loggingMiddleware;

export const test = () => {
    return 'test';
}

