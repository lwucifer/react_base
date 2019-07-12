import { combineReducers } from 'redux';
import config from './config';
import users from './users';
import ranking from './ranking';
import chart from './chart';
import customers from './customers';
import authentication from './authentication';
const appReducers = combineReducers({
    config,
    users,
    ranking,
    chart,
    customers,
    authentication
});

export default appReducers;